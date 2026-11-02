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
            "</span><span>" +
            legText(leg) +
            "</span></li>"
          );
        })
        .join("") +
      "</ol>"
    );
  }

  function legText(leg) {
    if (leg.type === "walk") return esc(leg.label) + " · " + H.formatDistance(leg.meters);
    if (leg.type === "wait") {
      var missed = leg.missed != null ? "รอบ " + H.formatTime(leg.missed) + " ออกไปแล้ว · " : "";
      return missed + "รอสาย " + leg.line + " ถึง " + H.formatTime(leg.end);
    }
    var via = leg.passed.length ? " ผ่าน" + leg.passed.join(" ") : "";
    return "นั่งสาย " + leg.line + " " + H.formatKm(leg.meters) + via + " ลง " + H.formatTime(leg.end);
  }

  function metrics(plan) {
    return (
      '<div class="metrics">' +
      metric(H.formatTime(plan.arrival), "ถึง") +
      metric(plan.minutes + " นาที", "รวม") +
      metric(plan.fare.total + " บาท", "ค่าโดยสาร") +
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
      "<p class=\"fine\">นั่งรถ " +
      H.formatKm(plan.rideMeters) +
      " × 4 บาท = " +
      raw +
      " ปัดเป็น " +
      plan.fare.distanceFee +
      " บาท · บวกค่าแรกเข้า " +
      plan.fare.base +
      " บาท · เดิน " +
      H.formatDistance(plan.walkMeters) +
      " ไม่คิดเงิน · แท็กซี่อ้างอิงระยะถนน " +
      H.formatKm(plan.taxi.meters) +
      " ประมาณ " +
      plan.taxi.total +
      " บาท</p>"
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
    panel.innerHTML =
      '<p class="kicker">จาก' +
      esc(H.nodes.home.name) +
      " · " +
      esc(plan.label) +
      "</p>" +
      "<h2>ไป" +
      esc(plan.place.name) +
      "</h2>" +
      lateNote(plan) +
      metrics(plan) +
      '<div class="narration" aria-live="polite">' +
      '<p class="kicker" id="live-kicker">' +
      (arrived ? "ถึงปลายทาง" : "แผนที่เลือก") +
      "</p>" +
      '<p class="narration-title" id="live-title">' +
      esc(arrived ? "ถึง" + plan.place.name + "แล้ว" : plan.speech) +
      "</p>" +
      '<p id="live-detail">' +
      esc(plan.pathLabel) +
      "</p>" +
      '<p class="rule-line" id="live-rule">ระบบเลือกแผนที่ถึงก่อน แล้วค่อยดูค่าโดยสาร</p></div>' +
      timeline(plan) +
      reasons(plan) +
      fareNote(plan) +
      '<div class="actions">' +
      (state.mode === "result"
        ? '<button type="button" class="btn btn-solid" id="start">เริ่มนำทาง</button>' +
          '<button type="button" class="btn" id="late">' +
          (state.departAt === H.DEMO_TIME ? "ลองออก 08:18" : "กลับไป 08:12") +
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
        "<p>กดเริ่มนำทาง เพื่อให้จุดผู้ใช้เดินตามแผน หรือกดลองออก 08:18 ถ้าอยากเห็นระบบจับรอบรถใหม่</p>";
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
