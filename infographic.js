(function () {
  var H = window.HIBUS;
  var map = window.HIBUSMap.createMap(document.getElementById("net"));
  map.update({ time: H.DEMO_TIME, plan: null });

  var caseTitles = {
    uni: "เส้นทางตรง / ต่อเดียว",
    mall: "เชื่อมต่อ 1 ครั้ง",
    stadium: "เชื่อมต่อ 2 ครั้ง",
  };
  var caseRoutes = {
    uni: "นั่งรถโดยสารสาย H2 สายเดียวถึงจุดหมาย",
    mall: "นั่งสาย H2 แล้วเปลี่ยนเป็นสาย H1 ณ จุดเชื่อมต่อแยกตลาด",
    stadium: "นั่งสาย H2 ต่อสาย H1 ณ แยกตลาด และต่อสาย H3 ณ สถานีกลาง",
  };
  var list = document.getElementById("scenario-list");
  list.className = "scene-list";
  list.innerHTML = H.places
    .map(function (place, index) {
      var plan = H.planTrip(place.id, H.DEMO_TIME);
      return (
        '<article class="scene">' +
        "<h3>กรณีศึกษาที่ " +
        (index + 1) +
        ": " +
        place.name +
        " (" +
        (caseTitles[place.id] || place.hint) +
        ")</h3>" +
        '<p class="scene-route"><strong>รูปแบบการเดินทาง</strong> ' +
        (caseRoutes[place.id] || plan.pathLabel) +
        "</p>" +
        '<p class="scene-result"><strong>ผลการคำนวณ</strong> ถึงเวลา ' +
        H.formatTime(plan.arrival) +
        " น. (ใช้เวลาเดินทาง " +
        plan.minutes +
        " นาที) | อัตราค่าโดยสาร " +
        plan.fare.total +
        " บาท</p>" +
        '<div class="nums">' +
        "<p><strong>" +
        H.formatTime(plan.arrival) +
        "</strong><span>ถึง</span></p>" +
        "<p><strong>" +
        plan.minutes +
        "</strong><span>นาที</span></p>" +
        "<p><strong>" +
        plan.fare.total +
        "</strong><span>บาท</span></p>" +
        "</div>" +
        '<p class="scene-detail"><strong>รายละเอียดการประมวลผล</strong></p>' +
        "<ol>" +
        plan.reasons
          .map(function (reason) {
            return "<li>" + reason + "</li>";
          })
          .join("") +
        "</ol></article>"
      );
    })
    .join("");

  var button = document.getElementById("copy-prompt");
  var prompt = document.getElementById("vibe-prompt");
  var status = document.getElementById("copy-status");
  if (!button || !prompt || !status) return;
  function selectPrompt() {
    var range = document.createRange();
    range.selectNodeContents(prompt);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
  function copyWithSelection(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }
  button.addEventListener("click", function () {
    var text = prompt.textContent;
    function done() {
      status.textContent = "คัดลอกข้อความแล้ว นำไปวางในห้องใหม่ได้";
    }
    function failed() {
      selectPrompt();
      status.textContent = "เลือกข้อความให้แล้ว กดคัดลอกจากเมนูหรือกด Ctrl+C ได้เลย";
    }
    var viaClipboard = navigator.clipboard && window.isSecureContext && navigator.clipboard.writeText;
    if (viaClipboard) {
      navigator.clipboard.writeText(text).then(done, function () {
        if (copyWithSelection(text)) done();
        else failed();
      });
      return;
    }
    if (copyWithSelection(text)) done();
    else failed();
  });
})();
