(function () {
  var H = window.HIBUS;
  var map = window.HIBUSMap.createMap(document.getElementById("map"));
  var panel = document.getElementById("panel");
  var controls = document.getElementById("controls");
  var clockEl = document.getElementById("clock");
  var state = {
    mode: "idle",
    query: "",
    placeId: null,
    departAt: H.DEMO_TIME,
    plan: null,
    error: "",
    legIndex: 0,
    pausedFraction: 0,
    playing: false,
    rafStart: 0,
    speed: "demo",
    clock: H.DEMO_TIME,
  };
  var planTimer = 0;

  function esc(value) {
    return String(value).replace(/[&<>"]/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char];
    });
  }

  function legMilliseconds(leg) {
    var minutes = Math.max(0.25, leg.end - leg.start);
    if (state.speed === "fast") return Math.max(700, minutes * 150);
    return Math.max(2000, minutes * 380);
  }

  function fractionNow() {
    var plan = state.plan;
    if (!plan || state.mode !== "nav") return 0;
    var leg = plan.legs[state.legIndex];
    if (!leg) return 1;
    if (!state.playing) return state.pausedFraction;
    var grown = (performance.now() - state.rafStart) / legMilliseconds(leg);
    return Math.min(1, state.pausedFraction + grown);
  }

  function syncClock() {
    var plan = state.plan;
    if (!plan || (state.mode !== "nav" && state.mode !== "arrived")) {
      state.clock = state.departAt;
      return;
    }
    if (state.mode === "arrived") {
      state.clock = plan.arrival;
      return;
    }
    var leg = plan.legs[state.legIndex];
    var fraction = fractionNow();
    state.clock = leg.start + (leg.end - leg.start) * fraction;
    if (fraction >= 1) {
      if (state.legIndex < plan.legs.length - 1) {
        state.legIndex += 1;
        state.pausedFraction = 0;
        state.rafStart = performance.now();
      } else {
        state.playing = false;
        state.mode = "arrived";
        state.clock = plan.arrival;
        renderPanel();
        renderControls();
      }
    }
  }

  function frame() {
    syncClock();
    if (state.mode === "nav" || state.mode === "arrived") paintLive();
    else paintMap();
    window.requestAnimationFrame(frame);
  }

  function paintMap() {
    map.update({ time: state.clock, plan: state.plan });
    clockEl.textContent = H.formatTime(state.clock, state.mode === "nav" || state.mode === "arrived");
  }

  function paintLive() {
    paintMap();
    var plan = state.plan;
    if (!plan) return;
    var spoken = H.narration(plan, state.clock);
    setText("live-kicker", spoken.kicker);
    setText("live-title", spoken.title);
    setText("live-detail", spoken.detail);
    setText("live-rule", spoken.rule);
    document.querySelectorAll("#timeline li").forEach(function (item, index) {
      item.classList.toggle("is-done", index < state.legIndex || state.mode === "arrived");
      item.classList.toggle("is-now", state.mode === "nav" && index === state.legIndex);
    });
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node && node.textContent !== value) node.textContent = value;
  }

  function chips() {
    return H.places
      .map(function (place) {
        return (
          '<button type="button" class="chip" data-place="' +
          place.id +
          '"><span>' +
          esc(place.name) +
          '</span><small>' +
          esc(place.hint) +
          "</small></button>"
        );
      })
      .join("");
  }

  function kmText(meters) {
    return (meters / 1000).toFixed(1).replace(/\.0$/, "") + " กิโลเมตร";
  }

  function travelForm(plan) {
    if (plan.transfers <= 0) return "สายเดียว";
    return "ต่อรถ " + plan.transfers + " ครั้ง";
  }

  function formalRoute(plan) {
    var rides = plan.legs.filter(function (leg) {
      return leg.type === "ride";
    });
    if (!rides.length) return plan.pathLabel;
    if (rides.length === 1) {
      return "โดยสารรถประจำทางสาย " + rides[0].line + " สายเดียวถึงจุดหมาย";
    }
    var text = "โดยสารรถประจำทางสาย " + rides[0].line;
    for (var i = 1; i < rides.length; i += 1) {
      text +=
        " และทำการเปลี่ยนสายเป็นสาย " +
        rides[i].line +
        " ณ จุดเชื่อมต่อ" +
        H.nodes[rides[i - 1].to].name;
    }
    return text;
  }

  function timeline(plan) {
    return (
      '<ol id="timeline" class="timeline">' +
      plan.legs
        .map(function (leg, index) {
          return (
            '<li data-index="' +
            index +
            '" class="' +
            leg.type +
            '"' +
            (leg.line ? ' data-line="' + leg.line + '"' : "") +
            '><span class="when num">' +
            H.formatTime(leg.start) +
            " น.</span><span>" +
            formalLegText(leg, plan, index) +
            "</span></li>"
          );
        })
        .join("") +
      "</ol>"
    );
  }

  function formalLegText(leg, plan, index) {
    var legs = plan.legs;
    var next = legs[index + 1];
    var waitCount = 0;
    for (var i = 0; i < index; i += 1) {
      if (legs[i].type === "wait") waitCount += 1;
    }
    if (leg.type === "walk") {
      if (index === 0) {
        return (
          "เริ่มต้นออกเดินทางจากจุดเริ่มต้น เดินเท้าไปยังป้ายรถโดยสารประจำทาง" +
          esc(H.nodes[leg.to].name) +
          " (ระยะทาง " +
          leg.meters +
          " เมตร)"
        );
      }
      if (next && (next.type === "wait" || next.type === "ride")) {
        var line = next.line;
        return (
          "ลงจากรถและเดินเท้าเปลี่ยนชานชาลาไปยังจุดจอดรถประจำทางสาย " +
          line +
          " (ระยะทาง " +
          leg.meters +
          " เมตร เนื่องจากชานชาลาต่างสายกัน)"
        );
      }
      return (
        "ลงจากรถและเดินเท้าเข้าสู่" +
        esc(plan.place.name) +
        " (ระยะทาง " +
        leg.meters +
        " เมตร) ถึงจุดหมายเวลา " +
        H.formatTime(plan.arrival) +
        " น."
      );
    }
    if (leg.type === "wait") {
      if (waitCount === 0 && leg.missed != null) {
        return (
          "เนื่องจากรอบรถเวลา " +
          H.formatTime(leg.missed) +
          " น. ของสาย " +
          leg.line +
          " ได้ออกเดินทางไปก่อนที่ผู้ใช้จะเดินเท้ามาถึงป้าย ระบบจึงทำการปรับเปลี่ยนไปเลือกใช้รอบรถเวลา " +
          H.formatTime(leg.end) +
          " น."
        );
      }
      if (leg.missed != null) {
        return (
          "รอรถโดยสารประจำทางสาย " +
          leg.line +
          " (รอบรถเวลา " +
          H.formatTime(leg.missed) +
          " น. ออกเดินทางไปแล้ว ระบบจึงจัดสรรรอบรถถัดไปที่มาถึงเวลา " +
          H.formatTime(leg.end) +
          " น.)"
        );
      }
      return (
        "รอรถโดยสารประจำทางสาย " +
        leg.line +
        " จนถึงเวลา " +
        H.formatTime(leg.end) +
        " น."
      );
    }
    var via = leg.passed.length ? " (ผ่าน" + leg.passed.join(" และ ") + ")" : "";
    var hasLaterRide = legs.slice(index + 1).some(function (item) {
      return item.type === "ride";
    });
    if (hasLaterRide) {
      return (
        "ขึ้นรถโดยสารประจำทางสาย " +
        leg.line +
        " เดินทางเป็นระยะทาง " +
        kmText(leg.meters) +
        " และลงรถ ณ จุดเชื่อมต่อ"
      );
    }
    return (
      "ขึ้นรถโดยสารประจำทางสาย " +
      leg.line +
      " เดินทางเป็นระยะทาง " +
      kmText(leg.meters) +
      via +
      " จนถึงจุดหมายปลายทางเวลา " +
      H.formatTime(leg.end) +
      " น."
    );
  }

  function metrics(plan) {
    return (
      '<div class="metrics">' +
      metric(H.formatTime(plan.arrival) + " น.", "เวลาถึงจุดหมาย") +
      metric(plan.minutes + " นาที", "ระยะเวลาเดินทางรวม") +
      metric(plan.fare.total + " บาท", "อัตราค่าโดยสารรวม") +
      "</div>"
    );
  }

  function metric(value, label) {
    return "<p><strong class=\"num\">" + esc(value) + "</strong><span>" + esc(label) + "</span></p>";
  }

  function reasons(plan) {
    return (
      '<ul class="reasons">' +
      plan.reasons
        .map(function (reason) {
          return "<li>" + esc(reason) + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function fareNote(plan) {
    var raw = ((plan.rideMeters / 1000) * 4).toFixed(1);
    return (
      '<div class="fare-block">' +
      "<p><strong>รายละเอียดการคำนวณ</strong> ระยะทางนั่งรถรวม " +
      kmText(plan.rideMeters) +
      " × อัตราค่าโดยสาร 4 บาทต่อกิโลเมตร = " +
      raw +
      " บาท (ปัดเศษเป็น " +
      plan.fare.distanceFee +
      " บาท) รวมกับค่าแรกเข้า " +
      plan.fare.base +
      " บาท ได้อัตราค่าโดยสารรวม " +
      plan.fare.total +
      " บาท (ระยะเดินเท้า " +
      plan.walkMeters +
      " เมตร ไม่คิดค่าบริการ)</p>" +
      "<p><strong>ข้อมูลเปรียบเทียบ</strong> หากใช้บริการรถแท็กซี่ตามระยะทางถนนจริงประมาณ " +
      kmText(plan.taxi.meters) +
      " จะมีค่าโดยสารโดยประมาณ " +
      plan.taxi.total +
      " บาท</p></div>"
    );
  }

  function lateNote(plan) {
    if (state.departAt === H.DEMO_TIME) return "";
    var base = H.planTrip(plan.place.id, H.DEMO_TIME);
    var delta = plan.arrival - base.arrival;
    return (
      '<p class="banner">ออกจากบ้าน ' +
      H.formatTime(state.departAt) +
      " แทน 08:12 · ถึง" +
      (delta > 0 ? "ช้ากว่าแผนเดิม " + delta + " นาที" : "เวลาเดิม") +
      " เพราะระบบจับรอบที่ยังทันใหม่</p>"
    );
  }

  function renderPanel() {
    if (state.mode === "idle" || state.mode === "error") renderSearch();
    else if (state.mode === "planning") {
      panel.innerHTML = '<p class="kicker">กำลังวางแผน</p><h2>เทียบป้ายที่เดินถึง กับรอบรถที่ยังไม่ออก</h2>';
    } else renderAnswer();
  }

  function renderSearch() {
    var here = H.nearby();
    var message = "";
    if (state.error === "empty") message = "พิมพ์ชื่อปลายทาง แล้วกด Enter";
    if (state.error === "none") message = "“" + esc(state.query) + "” อยู่นอกพื้นที่ให้บริการของชุดจำลอง ลองสามปุ่มด้านล่าง";
    if (state.error === "many") message = "พบหลายแห่ง เลือกจากปุ่มด้านล่าง";
    panel.innerHTML =
      '<p class="kicker">ตำแหน่งปัจจุบัน · ตรวจพบแล้ว</p>' +
      "<h2>" +
      esc(here.fix.name) +
      "</h2>" +
      '<p class="lede">' +
      esc(here.fix.detail) +
      " · ความแม่น ±" +
      here.fix.accuracyM +
      " เมตร · เวลาอ้างอิง " +
      H.formatTime(here.fix.time) +
      " น.</p>" +
      '<form id="search" role="search">' +
      '<label for="dest">ปลายทาง</label>' +
      '<div class="search-row">' +
      '<input id="dest" name="dest" type="text" enterkeyhint="search" autocomplete="off" placeholder="เช่น มหาวิทยาลัย" value="' +
      esc(state.query) +
      '">' +
      '<button class="btn btn-solid" type="submit">วางแผน</button>' +
      "</div></form>" +
      (message ? '<p class="banner" role="alert">' + message + "</p>" : "") +
      '<div class="chips">' +
      chips() +
      "</div>" +
      '<div class="nearby"><h3>ป้ายที่เดินไปได้จากจุดนี้</h3><ul>' +
      here.walks
        .map(function (walk) {
          return (
            "<li><strong>" +
            esc(walk.name) +
            " · สาย " +
            esc(walk.platform) +
            "</strong><span>" +
            H.formatDistance(walk.meters) +
            " · " +
            walk.minutes +
            " นาที</span></li>"
          );
        })
        .join("") +
      "</ul>" +
      (here.nextBus
        ? "<p>สาย H2 รอบถัดไปที่" + esc(H.nodes.suanthong.name) + " " +
          H.formatTime(here.nextBus.depart) +
          " น. · รอบ " +
          H.formatTime(here.nextBus.missed) +
          " ออกไปแล้ว ถ้าเดินตอนนี้จะทันรอบ " +
          H.formatTime(here.nextBus.depart) +
          "</p>"
        : "") +
      "</div>";
    document.getElementById("search").addEventListener("submit", onSubmit);
    panel.querySelectorAll(".chip").forEach(function (button) {
      button.addEventListener("click", function () {
        choose(button.getAttribute("data-place"));
      });
    });
  }

  function renderAnswer() {
    var plan = state.plan;
    var arrived = state.mode === "arrived";
    var routeText = formalRoute(plan);
    panel.innerHTML =
      '<p class="kicker">ผลการจำลองเส้นทาง</p>' +
      "<h2>จาก" +
      esc(H.nodes.home.name) +
      " สู่" +
      esc(plan.place.name) +
      "</h2>" +
      lateNote(plan) +
      '<section class="report-block">' +
      "<h3>1. ข้อมูลสรุปการเดินทาง</h3>" +
      '<ul class="summary-list">' +
      "<li><strong>จุดเริ่มต้น</strong> " +
      esc(H.nodes.home.name) +
      " (รูปแบบการเดินทาง: " +
      esc(travelForm(plan)) +
      ")</li>" +
      "<li><strong>จุดหมายปลายทาง</strong> " +
      esc(plan.place.name) +
      "</li>" +
      "<li><strong>เวลาถึงจุดหมาย</strong> " +
      H.formatTime(plan.arrival) +
      " น.</li>" +
      "<li><strong>ระยะเวลาเดินทางรวม</strong> " +
      plan.minutes +
      " นาที</li>" +
      "<li><strong>อัตราค่าโดยสารรวม</strong> " +
      plan.fare.total +
      " บาท</li>" +
      "</ul>" +
      metrics(plan) +
      "</section>" +
      '<section class="report-block">' +
      "<h3>2. แผนการเดินทางและอัลกอริทึมการเลือกเส้นทาง</h3>" +
      '<div class="narration" aria-live="polite">' +
      '<p class="kicker" id="live-kicker">' +
      (arrived ? "ถึงปลายทาง" : "รูปแบบเส้นทางหลัก") +
      "</p>" +
      '<p class="narration-title" id="live-title">' +
      esc(arrived ? "ถึง" + plan.place.name + "แล้ว" : routeText) +
      "</p>" +
      '<p id="live-detail">' +
      esc(
        arrived
          ? "ใช้เวลา " + plan.minutes + " นาที · ค่าโดยสาร " + plan.fare.total + " บาท"
          : "เงื่อนไขการตัดสินใจของระบบ"
      ) +
      "</p>" +
      '<p class="rule-line" id="live-rule">ระบบจะคัดเลือกแผนเส้นทางที่ใช้เวลาเดินทางถึงจุดหมายรวดเร็วที่สุดเป็นอันดับแรก ก่อนที่จะนำมาพิจารณาเปรียบเทียบอัตราค่าโดยสาร</p></div></section>' +
      '<section class="report-block">' +
      "<h3>3. ลำดับขั้นตอนการเดินทางตามตารางเวลา (Timeline)</h3>" +
      timeline(plan) +
      "</section>" +
      '<section class="report-block">' +
      "<h3>4. รายละเอียดเชิงวิเคราะห์และเงื่อนไขเพิ่มเติม</h3>" +
      reasons(plan) +
      fareNote(plan) +
      "</section>" +
      '<div class="actions">' +
      (state.mode === "result"
        ? '<button type="button" class="btn btn-solid" id="start">เริ่มนำทาง</button>' +
          '<button type="button" class="btn" id="late">' +
          (state.departAt === H.DEMO_TIME ? "จำลองเวลาออกเดินทาง 08:18 น." : "กลับไปเวลา 08:12 น.") +
          "</button>"
        : "") +
      '<button type="button" class="btn" id="reset">เปลี่ยนปลายทาง</button></div>';
    var start = document.getElementById("start");
    if (start) start.addEventListener("click", startNav);
    var late = document.getElementById("late");
    if (late) late.addEventListener("click", toggleLate);
    document.getElementById("reset").addEventListener("click", resetSearch);
    if (state.mode === "nav" || state.mode === "arrived") paintLive();
  }

  function renderControls() {
    if (state.mode === "result") {
      controls.innerHTML =
        "<p>กดเริ่มนำทาง เพื่อให้จุดผู้ใช้เดินตามแผน หรือกดจำลองเวลาออกเดินทาง 08:18 น. หากต้องการให้ระบบคำนวณรอบรถใหม่</p>";
      return;
    }
    if (state.mode !== "nav" && state.mode !== "arrived") {
      controls.innerHTML =
        "<p>เลือกปลายทาง แล้วกดนำทาง ตำแหน่งบนแผนผังและเวลาจะขยับตามช่วงเดิน รอรถ และนั่งรถ</p>";
      return;
    }
    controls.innerHTML =
      '<button type="button" class="btn btn-solid" id="play">' +
      (state.playing ? "หยุด" : "เล่นต่อ") +
      "</button>" +
      '<button type="button" class="btn" id="step">ขั้นถัดไป</button>' +
      '<button type="button" class="btn" id="restart">เริ่มช่วงใหม่</button>' +
      '<button type="button" class="btn" id="speed">' +
      (state.speed === "fast" ? "ความเร็ว: เร็ว" : "ความเร็ว: อ่านทัน") +
      "</button>";
    document.getElementById("play").addEventListener("click", togglePlay);
    document.getElementById("step").addEventListener("click", step);
    document.getElementById("restart").addEventListener("click", function () {
      startNav();
    });
    document.getElementById("speed").addEventListener("click", function () {
      state.speed = state.speed === "fast" ? "demo" : "fast";
      if (state.playing) {
        state.pausedFraction = fractionNow();
        state.rafStart = performance.now();
      }
      renderControls();
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    state.query = document.getElementById("dest").value;
    var found = H.matchPlace(state.query);
    if (found.place) choose(found.place.id);
    else {
      state.mode = "error";
      state.error = found.error;
      state.plan = null;
      renderPanel();
      renderControls();
    }
  }

  function choose(placeId) {
    var place = H.places.find(function (item) {
      return item.id === placeId;
    });
    state.placeId = placeId;
    state.query = place.name;
    state.error = "";
    state.mode = "planning";
    state.playing = false;
    state.plan = null;
    window.clearTimeout(planTimer);
    renderPanel();
    renderControls();
    var delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700;
    planTimer = window.setTimeout(function () {
      state.plan = H.planTrip(placeId, state.departAt);
      state.clock = state.departAt;
      state.mode = "result";
      renderPanel();
      renderControls();
    }, delay);
  }

  function toggleLate() {
    if (state.mode === "nav") return;
    state.departAt = state.departAt === H.DEMO_TIME ? H.LATE_TIME : H.DEMO_TIME;
    if (state.placeId) {
      state.plan = H.planTrip(state.placeId, state.departAt);
      state.clock = state.departAt;
      state.mode = "result";
      state.playing = false;
      renderPanel();
      renderControls();
    }
  }

  function startNav() {
    state.mode = "nav";
    state.legIndex = 0;
    state.pausedFraction = 0;
    state.playing = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    state.rafStart = performance.now();
    state.clock = state.plan.departAt;
    renderPanel();
    renderControls();
    paintLive();
  }

  function togglePlay() {
    if (state.mode === "arrived") {
      startNav();
      return;
    }
    if (state.playing) {
      state.pausedFraction = fractionNow();
      state.playing = false;
    } else {
      state.playing = true;
      state.rafStart = performance.now();
    }
    renderControls();
  }

  function step() {
    var plan = state.plan;
    if (!plan) return;
    if (state.mode === "arrived" || state.legIndex >= plan.legs.length - 1) {
      state.mode = "arrived";
      state.playing = false;
      state.clock = plan.arrival;
      renderPanel();
      renderControls();
      return;
    }
    state.playing = false;
    state.legIndex += 1;
    state.pausedFraction = 0;
    state.clock = plan.legs[state.legIndex].start;
    if (state.mode !== "nav") state.mode = "nav";
    renderPanel();
    renderControls();
    paintLive();
  }

  function resetSearch() {
    state.mode = "idle";
    state.plan = null;
    state.playing = false;
    state.error = "";
    state.query = "";
    state.clock = H.DEMO_TIME;
    renderPanel();
    renderControls();
  }

  document.addEventListener("keydown", function (event) {
    var typing = event.target && event.target.id === "dest";
    if (typing) return;
    if (event.key === "1") choose("uni");
    if (event.key === "2") choose("mall");
    if (event.key === "3") choose("stadium");
    if (event.key === " " && event.target === document.body && (state.mode === "nav" || state.mode === "arrived")) {
      event.preventDefault();
      togglePlay();
    }
  });

  renderPanel();
  renderControls();
  paintMap();
  window.requestAnimationFrame(frame);
})();
