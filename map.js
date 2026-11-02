(function () {
  var H = window.HIBUS;
  var nodes = H.nodes;

  var labelAt = {
    home: { dx: 16, dy: 6, anchor: "start" },
    suanthong: { dx: 0, dy: -16, anchor: "middle" },
    "market-h2": { dx: 0, dy: -16, anchor: "middle" },
    park: { dx: 0, dy: -16, anchor: "middle" },
    uni: { dx: 0, dy: -16, anchor: "middle" },
    school: { dx: 14, dy: 4, anchor: "start" },
    "market-h1": { dx: -14, dy: 4, anchor: "end" },
    hospital: { dx: -14, dy: 4, anchor: "end" },
    "station-h1": { dx: -14, dy: 18, anchor: "end" },
    mall: { dx: -14, dy: -8, anchor: "end" },
    gallery: { dx: 0, dy: -16, anchor: "middle" },
    stadium: { dx: -8, dy: -16, anchor: "end" },
  };

  function el(name, attrs) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", name);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        node.setAttribute(key, attrs[key]);
      });
    }
    return node;
  }

  function routePath(line) {
    return H.stopsOf(line)
      .map(function (id, index) {
        var point = nodes[id];
        return (index === 0 ? "M" : "L") + point.x + " " + point.y;
      })
      .join(" ");
  }

  function drawStatic(layer) {
    var guides = [
      ["home", "suanthong"],
      ["market-h2", "market-h1"],
      ["station-h1", "station-h3"],
    ];
    guides.forEach(function (pair) {
      layer.appendChild(
        el("line", {
          x1: nodes[pair[0]].x,
          y1: nodes[pair[0]].y,
          x2: nodes[pair[1]].x,
          y2: nodes[pair[1]].y,
          class: "guide",
        })
      );
    });

    H.lines.forEach(function (line) {
      var group = el("g", { "data-line": line.id });
      var path = routePath(line);
      group.appendChild(
        el("path", {
          d: path,
          class: "route-bed",
          stroke: "var(--route-" + line.id.toLowerCase() + ")",
        })
      );
      group.appendChild(el("path", { d: path, class: "route-slot" }));
      layer.appendChild(group);
    });

    H.lines.forEach(function (line) {
      H.stopsOf(line).forEach(function (id) {
        if (id === "station-h3") return;
        var point = nodes[id];
        layer.appendChild(
          el("rect", {
            x: point.x - 5,
            y: point.y - 5,
            width: 10,
            height: 10,
            class: "stop",
            stroke: "var(--route-" + line.id.toLowerCase() + ")",
          })
        );
        var place = labelAt[id];
        if (!place) return;
        var lines = point.labelLines || [point.name];
        lines.forEach(function (lineText, index) {
          var text = el("text", {
            x: point.x + place.dx,
            y: point.y + place.dy + index * 15,
            "text-anchor": place.anchor,
            class: "stop-name",
          });
          if (place.size) text.setAttribute("font-size", place.size);
          text.textContent = lineText;
          layer.appendChild(text);
        });
        var code = el("text", {
          x: point.x + place.dx,
          y: point.y + place.dy + lines.length * 15,
          "text-anchor": place.anchor,
          class: "stop-code",
          fill: "var(--route-" + line.id.toLowerCase() + "-ink)",
        });
        code.textContent = point.platform || "";
        layer.appendChild(code);
      });
    });

    var station = el("text", {
      x: (nodes["station-h1"].x + nodes["station-h3"].x) / 2,
      y: nodes["station-h1"].y + 28,
      "text-anchor": "middle",
      class: "stop-name",
    });
    station.textContent = "สถานีกลาง";
    layer.appendChild(station);
  }

  function createMap(svg) {
    svg.setAttribute("viewBox", "0 16 1040 702");
    svg.setAttribute("role", "img");
    var title = el("title");
    title.textContent = "แผนผังสายไฮบัสในเมืองสาธิต";
    svg.appendChild(title);
    var staticLayer = el("g");
    var dynamicLayer = el("g");
    svg.appendChild(staticLayer);
    svg.appendChild(dynamicLayer);
    drawStatic(staticLayer);

    return {
      update: function (state) {
        var plan = state.plan;
        var used = {};
        if (plan) {
          plan.legs.forEach(function (leg) {
            if (leg.type === "ride") used[leg.line] = true;
          });
        }
        staticLayer.querySelectorAll("[data-line]").forEach(function (group) {
          var active = !plan || used[group.getAttribute("data-line")];
          group.setAttribute("opacity", active ? "1" : "0.28");
        });
        dynamicLayer.textContent = "";
        drawActors(dynamicLayer, state);
      },
    };
  }

  function drawActors(layer, state) {
    var time = state.time;
    var plan = state.plan;
    var leg = plan ? H.activeLeg(plan, time) : null;
    var riding = leg && leg.type === "ride" && time < plan.arrival;
    var buses = H.busesAt(time);
    buses.forEach(function (bus) {
      var marked = riding && leg.runId === bus.id;
      var circle = el("circle", {
        cx: bus.x,
        cy: bus.y,
        r: marked ? 16 : 12,
        fill: "var(--route-" + bus.line.toLowerCase() + ")",
        stroke: marked ? "var(--you)" : "var(--color-bg-primary)",
        "stroke-width": marked ? 4 : 2,
      });
      layer.appendChild(circle);
      var text = el("text", {
        x: bus.x,
        y: bus.y + 4,
        "text-anchor": "middle",
        class: "bus-code",
      });
      text.textContent = bus.line;
      layer.appendChild(text);
    });

    var user = plan ? H.userPoint(plan, Math.min(time, plan.arrival)) : { x: nodes.home.x, y: nodes.home.y };
    if (!(riding && time < plan.arrival)) {
      layer.appendChild(
        el("circle", {
          cx: user.x,
          cy: user.y,
          r: 11,
          fill: "var(--you)",
          stroke: "var(--color-text-primary)",
          "stroke-width": 2,
        })
      );
      var you = el("text", {
        x: user.x,
        y: user.y - 16,
        "text-anchor": "middle",
        class: "you-label",
      });
      you.textContent = time >= (plan ? plan.arrival : Infinity) ? "ถึงแล้ว" : "คุณ";
      layer.appendChild(you);
    }

    if (plan) {
      plan.legs.forEach(function (leg) {
        if (leg.type !== "walk") return;
        layer.appendChild(
          el("line", {
            x1: nodes[leg.from].x,
            y1: nodes[leg.from].y,
            x2: nodes[leg.to].x,
            y2: nodes[leg.to].y,
            class: "plan-walk",
          })
        );
      });
      var door = nodes[plan.place.door];
      layer.appendChild(
        el("rect", {
          x: door.x - 6,
          y: door.y - 6,
          width: 12,
          height: 12,
          class: "door",
        })
      );
      var doorLabel = el("text", {
        x: door.x + 12,
        y: door.y + 4,
        class: "stop-name",
      });
      doorLabel.textContent = "ทางเข้า";
      layer.appendChild(doorLabel);
    }
  }

  window.HIBUSMap = { createMap: createMap };
})();
