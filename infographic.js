(function () {
  var H = window.HIBUS;
  var map = window.HIBUSMap.createMap(document.getElementById("net"));
  map.update({ time: H.DEMO_TIME, plan: null });

  var list = document.getElementById("scenario-list");
  list.className = "scene-list";
  list.innerHTML = H.places
    .map(function (place) {
      var plan = H.planTrip(place.id, H.DEMO_TIME);
      return (
        '<article class="scene">' +
        "<h3>" +
        place.name +
        "</h3>" +
        "<p>" +
        plan.label +
        " · " +
        plan.pathLabel +
        "</p>" +
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
})();
