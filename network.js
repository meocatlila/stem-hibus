(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.HIBUS = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const T = (h, m) => h * 60 + m;
  const DEMO_TIME = T(8, 12);
  const LATE_TIME = T(8, 18);

  const PRODUCT = {
    th: "ไฮบัส",
    en: "HIBUS",
    line: "รถโดยสารยกสูงประจำทาง",
  };

  const nodes = {
    home: { x: 132, y: 338, name: "หมู่บ้านสวนทอง", detail: "หน้าซอย 4" },
    suanthong: {
      x: 132,
      y: 198,
      name: "โรงเรียนเซนต์ฟรังค์ซิสซาเวียร์คอนแวนต์",
      labelLines: ["โรงเรียนเซนต์ฟรังค์", "ซิสซาเวียร์คอนแวนต์"],
      platform: "H2",
    },
    "market-h2": { x: 352, y: 198, name: "แยกตลาด", platform: "H2" },
    park: { x: 640, y: 198, name: "สวนสาธารณะ", platform: "H2" },
    uni: { x: 900, y: 198, name: "มหาวิทยาลัย", platform: "H2" },
    "uni-door": { x: 900, y: 308, name: "ประตูมหาวิทยาลัย" },
    school: { x: 448, y: 64, name: "โรงเรียนวิทยาศาสตร์", platform: "H1" },
    "market-h1": { x: 448, y: 312, name: "แยกตลาด", platform: "H1" },
    hospital: { x: 448, y: 424, name: "โรงพยาบาลเมือง", platform: "H1" },
    "station-h1": { x: 448, y: 536, name: "สถานีกลาง", platform: "H1" },
    "station-h3": { x: 536, y: 536, name: "สถานีกลาง", platform: "H3" },
    mall: { x: 448, y: 648, name: "ศูนย์การค้าไฮพลาซ่า", platform: "H1" },
    "mall-door": { x: 590, y: 648, name: "ทางเข้าศูนย์การค้า" },
    gallery: { x: 712, y: 536, name: "หอศิลป์", platform: "H3" },
    stadium: { x: 920, y: 536, name: "สนามกีฬาเมือง", platform: "H3" },
    "stadium-door": { x: 920, y: 646, name: "ประตูสนามกีฬา" },
  };

  const lines = [
    {
      id: "H1",
      name: "สายหลัก",
      headway: 8,
      first: T(7, 52),
      last: T(9, 24),
      segments: [
        { from: "school", to: "market-h1", minutes: 4, dwell: 1, meters: 1100 },
        { from: "market-h1", to: "hospital", minutes: 4, dwell: 1, meters: 1300 },
        { from: "hospital", to: "station-h1", minutes: 5, dwell: 1, meters: 1500 },
        { from: "station-h1", to: "mall", minutes: 4, dwell: 0, meters: 1200 },
      ],
    },
    {
      id: "H2",
      name: "สายเชื่อม",
      headway: 10,
      first: T(8, 0),
      last: T(9, 20),
      segments: [
        { from: "suanthong", to: "market-h2", minutes: 4, dwell: 1, meters: 1200 },
        { from: "market-h2", to: "park", minutes: 5, dwell: 1, meters: 1600 },
        { from: "park", to: "uni", minutes: 4, dwell: 0, meters: 1400 },
      ],
    },
    {
      id: "H3",
      name: "สายสนามกีฬา",
      headway: 12,
      first: T(8, 0),
      last: T(9, 24),
      segments: [
        { from: "station-h3", to: "gallery", minutes: 3, dwell: 1, meters: 900 },
        { from: "gallery", to: "stadium", minutes: 4, dwell: 0, meters: 1300 },
      ],
    },
  ];

  const walks = [
    { from: "home", to: "suanthong", minutes: 4, meters: 280, label: "เดินไปป้ายโรงเรียนเซนต์ฟรังค์ซิสซาเวียร์คอนแวนต์" },
    { from: "home", to: "market-h1", minutes: 20, meters: 1400, label: "เดินไปป้ายแยกตลาด สาย H1" },
    { from: "market-h2", to: "market-h1", minutes: 2, meters: 120, label: "เดินเปลี่ยนไปชานชาลาสาย H1" },
    { from: "station-h1", to: "station-h3", minutes: 3, meters: 180, label: "เดินเปลี่ยนไปชานชาลาสาย H3" },
    { from: "uni", to: "uni-door", minutes: 2, meters: 90, label: "เดินเข้าประตูมหาวิทยาลัย" },
    { from: "mall", to: "mall-door", minutes: 1, meters: 70, label: "เดินเข้าศูนย์การค้า" },
    { from: "stadium", to: "stadium-door", minutes: 1, meters: 80, label: "เดินเข้าสนามกีฬา" },
  ];

  const places = [
    {
      id: "uni",
      name: "มหาวิทยาลัย",
      door: "uni-door",
      hint: "ต่อเดียว · เกือบถึง",
      taxiMeters: 5000,
      aliases: ["มหาวิทยาลัย", "มหาลัย", "university"],
    },
    {
      id: "mall",
      name: "ศูนย์การค้าไฮพลาซ่า",
      door: "mall-door",
      hint: "หนึ่งต่อ",
      taxiMeters: 6500,
      aliases: ["ศูนย์การค้า", "ไฮพลาซ่า", "ห้าง", "พลาซ่า", "mall"],
    },
    {
      id: "stadium",
      name: "สนามกีฬาเมือง",
      door: "stadium-door",
      hint: "สองต่อ",
      taxiMeters: 7500,
      aliases: ["สนามกีฬา", "กีฬา", "stadium"],
    },
  ];

  const lineById = Object.fromEntries(lines.map((line) => [line.id, line]));

  function stopsOf(line) {
    return [line.segments[0].from, ...line.segments.map((segment) => segment.to)];
  }

  function buildRun(line, originDepart) {
    const events = [];
    let cursor = originDepart;
    events.push({ stop: line.segments[0].from, arrive: cursor, depart: cursor });
    line.segments.forEach((segment, index) => {
      const arrive = cursor + segment.minutes;
      const isLast = index === line.segments.length - 1;
      const depart = arrive + (isLast ? 0 : segment.dwell);
      events.push({ stop: segment.to, arrive, depart });
      cursor = depart;
    });
    return {
      id: line.id + "@" + originDepart,
      lineId: line.id,
      originDepart,
      events,
    };
  }

  const runsByLine = Object.fromEntries(
    lines.map((line) => {
      const runs = [];
      for (let depart = line.first; depart <= line.last; depart += line.headway) {
        runs.push(buildRun(line, depart));
      }
      return [line.id, runs];
    })
  );

  function eventAt(run, stopId) {
    return run.events.find((event) => event.stop === stopId);
  }

  function nextBoarding(line, stopId, ready) {
    let best = null;
    runsByLine[line.id].forEach((run) => {
      const event = eventAt(run, stopId);
      if (!event || event.depart < ready) return;
      if (!best || event.depart < best.event.depart) best = { run, event };
    });
    return best;
  }

  function previousDeparture(line, stopId, ready) {
    let previous = null;
    runsByLine[line.id].forEach((run) => {
      const event = eventAt(run, stopId);
      if (!event || event.depart >= ready) return;
      if (previous === null || event.depart > previous) previous = event.depart;
    });
    return previous;
  }

  function metersBetween(line, from, to) {
    const stops = stopsOf(line);
    const start = stops.indexOf(from);
    const end = stops.indexOf(to);
    let meters = 0;
    for (let index = start; index < end; index += 1) meters += line.segments[index].meters;
    return meters;
  }

  function timelineOf(run, from, to) {
    const start = run.events.findIndex((event) => event.stop === from);
    const end = run.events.findIndex((event) => event.stop === to);
    return run.events.slice(start, end + 1).map((event) => ({
      stop: event.stop,
      name: nodes[event.stop].name,
      platform: nodes[event.stop].platform || "",
      x: nodes[event.stop].x,
      y: nodes[event.stop].y,
      arrive: event.arrive,
      depart: event.depart,
    }));
  }

  function linesThrough(stopId) {
    return lines.filter((line) => stopsOf(line).includes(stopId));
  }

  function walksFrom(stopId) {
    return walks.filter((walk) => walk.from === stopId);
  }

  function search(target, startTime) {
    const found = [];
    function dfs(node, time, boardings, raw, seen, lastLine) {
      if (time > startTime + 180) return;
      if (node === target) {
        found.push(raw.slice());
        return;
      }
      walksFrom(node).forEach((walk) => {
        if (seen.has(walk.to)) return;
        seen.add(walk.to);
        raw.push({
          type: "walk",
          from: node,
          to: walk.to,
          start: time,
          end: time + walk.minutes,
          meters: walk.meters,
          label: walk.label,
        });
        dfs(walk.to, time + walk.minutes, boardings, raw, seen, null);
        raw.pop();
        seen.delete(walk.to);
      });
      if (boardings >= 3) return;
      linesThrough(node).forEach((line) => {
        if (line.id === lastLine) return;
        const stops = stopsOf(line);
        const index = stops.indexOf(node);
        for (let next = index + 1; next < stops.length; next += 1) {
          const to = stops[next];
          if (seen.has(to)) continue;
          const boarding = nextBoarding(line, node, time);
          if (!boarding) continue;
          const destination = eventAt(boarding.run, to);
          seen.add(to);
          raw.push({
            type: "ride",
            line: line.id,
            lineName: line.name,
            from: node,
            to,
            ready: time,
            start: boarding.event.depart,
            end: destination.arrive,
            meters: metersBetween(line, node, to),
            runId: boarding.run.id,
            timeline: timelineOf(boarding.run, node, to),
          });
          dfs(to, destination.arrive, boardings + 1, raw, seen, line.id);
          raw.pop();
          seen.delete(to);
        }
      });
    }
    dfs("home", startTime, 0, [], new Set(["home"]), null);
    return found;
  }

  function fareFor(meters) {
    const distanceFee = Math.round((meters / 1000) * 4);
    return {
      base: meters > 0 ? 12 : 0,
      distanceFee,
      total: meters > 0 ? 12 + distanceFee : 0,
      meters,
    };
  }

  function taxiFare(meters) {
    return 35 + Math.round((meters / 1000) * 12);
  }

  function signature(raw) {
    return raw
      .filter((leg) => leg.type === "ride")
      .map((leg) => leg.line + ":" + leg.from + ">" + leg.to)
      .join("|");
  }

  function expand(raw) {
    const legs = [];
    raw.forEach((leg) => {
      if (leg.type === "walk") {
        legs.push(leg);
        return;
      }
      if (leg.start > leg.ready) {
        const line = lineById[leg.line];
        const missed = previousDeparture(line, leg.from, leg.ready);
        const board = leg.timeline[0];
        legs.push({
          type: "wait",
          stop: leg.from,
          line: leg.line,
          lineName: leg.lineName,
          start: leg.ready,
          end: leg.start,
          busArrives: board.arrive,
          departs: leg.start,
          missed,
        });
      }
      legs.push({
        type: "ride",
        line: leg.line,
        lineName: leg.lineName,
        from: leg.from,
        to: leg.to,
        start: leg.start,
        end: leg.end,
        meters: leg.meters,
        runId: leg.runId,
        timeline: leg.timeline,
        passed: leg.timeline.slice(1, -1).map((stop) => stop.name),
      });
    });
    const rides = legs.filter((leg) => leg.type === "ride");
    const walkMeters = legs
      .filter((leg) => leg.type === "walk")
      .reduce((sum, leg) => sum + leg.meters, 0);
    const rideMeters = rides.reduce((sum, leg) => sum + leg.meters, 0);
    const arrival = legs.length ? legs[legs.length - 1].end : DEMO_TIME;
    const start = legs.length ? legs[0].start : DEMO_TIME;
    return {
      legs,
      rides: rides.length,
      transfers: Math.max(0, rides.length - 1),
      walkMeters,
      rideMeters,
      arrival,
      start,
      minutes: arrival - start,
      fare: fareFor(rideMeters),
      signature: signature(raw),
    };
  }

  function describePath(plan) {
    const rides = plan.legs.filter((leg) => leg.type === "ride");
    const first = plan.legs[0];
    if (first && first.type === "walk" && first.to === "market-h1") {
      return "เดิน " + formatDistance(first.meters) + " ไปขึ้นสาย " + rides.map((ride) => ride.line).join(" ต่อ ");
    }
    if (rides.length === 1) return "นั่งสาย " + rides[0].line + " สายเดียว";
    const at = rides
      .slice(0, -1)
      .map((ride) => nodes[ride.to].name)
      .join(" และ");
    return "สาย " + rides.map((ride) => ride.line).join(" ต่อ ") + " ที่" + at;
  }

  function transferLabel(plan) {
    const finalWalk = plan.legs.filter((leg) => leg.type === "walk").slice(-1)[0];
    if (plan.transfers <= 0) {
      return finalWalk && finalWalk.meters > 0 ? "ต่อเดียว · เกือบถึง" : "ต่อเดียวถึง";
    }
    if (plan.transfers === 1) return "หนึ่งต่อ";
    if (plan.transfers === 2) return "สองต่อ";
    return plan.transfers + " ต่อ";
  }

  function reasonsFor(best, alternatives) {
    const reasons = [];
    const firstWait = best.legs.find((leg) => leg.type === "wait");
    const firstRide = best.legs.find((leg) => leg.type === "ride");
    if (firstWait && firstWait.missed != null && firstRide) {
      reasons.push(
        "รอบ " +
          formatTime(firstWait.missed) +
          " ของสาย " +
          firstRide.line +
          " ออกไปก่อนเดินถึงป้าย ระบบจึงจับรอบ " +
          formatTime(firstRide.start)
      );
    }
    if (alternatives.length) {
      const alt = alternatives[0];
      const later = alt.arrival - best.arrival;
      let sentence = "อีกแผนหนึ่ง: " + describePath(alt) + " ถึง " + formatTime(alt.arrival);
      if (later > 0) {
        sentence += " ช้ากว่า " + later + " นาที";
        if (alt.fare.total < best.fare.total) {
          sentence += " แม้ถูกกว่า " + (best.fare.total - alt.fare.total) + " บาท";
        }
        sentence += " ระบบเลือกแผนที่ถึงก่อน";
      } else if (alt.walkMeters > best.walkMeters) {
        sentence +=
          " เวลาเท่ากัน แต่เดินมากกว่า (" +
          formatDistance(alt.walkMeters) +
          ") ระบบเลือกแผนที่เดินน้อยกว่า";
      }
      reasons.push(sentence);
    } else if (firstRide) {
      reasons.push("จากตำแหน่งนี้ มีสายเดียวที่ไปถึงปลายทาง คือสาย " + firstRide.line);
    }
    reasons.push(
      best.transfers > 0
        ? "ค่าแรกเข้า 12 บาทคิดครั้งเดียวทั้งทริป การต่อสายไม่เก็บซ้ำ ระยะเดินไม่คิดเงิน"
        : "ค่าโดยสารคือค่าแรกเข้า 12 บาท บวกระยะที่นั่งรถกิโลเมตรละ 4 บาท ระยะเดินไม่คิดเงิน"
    );
    return reasons;
  }

  function speechFor(plan) {
    const rides = plan.legs.filter((leg) => leg.type === "ride");
    if (!rides.length) return "";
    if (rides.length === 1) {
      return (
        "เดินไปป้าย" +
        nodes[rides[0].from].name +
        " ขึ้นสาย " +
        rides[0].line +
        " รอบ " +
        formatTime(rides[0].start) +
        " ลงที่" +
        nodes[rides[0].to].name +
        " แล้วเดินต่อช่วงสุดท้าย รวม " +
        plan.minutes +
        " นาที " +
        plan.fare.total +
        " บาท"
      );
    }
    const where = rides
      .slice(0, -1)
      .map((ride) => nodes[ride.to].name)
      .join(" และ");
    return (
      "ขึ้น " +
      rides.map((ride) => ride.line).join(" แล้วต่อ ") +
      " ที่" +
      where +
      " ถึง " +
      formatTime(plan.arrival) +
      " รวม " +
      plan.minutes +
      " นาที " +
      plan.fare.total +
      " บาท"
    );
  }

  function planTrip(placeId, startTime) {
    const place = places.find((item) => item.id === placeId);
    if (!place) return null;
    const departAt = startTime == null ? DEMO_TIME : startTime;
    const paths = search(place.door, departAt);
    const bySignature = new Map();
    paths.forEach((raw) => {
      const expanded = expand(raw);
      const previous = bySignature.get(expanded.signature);
      if (
        !previous ||
        expanded.arrival < previous.arrival ||
        (expanded.arrival === previous.arrival && expanded.walkMeters < previous.walkMeters)
      ) {
        bySignature.set(expanded.signature, expanded);
      }
    });
    const unique = Array.from(bySignature.values());
    unique.sort(
      (a, b) => a.arrival - b.arrival || a.walkMeters - b.walkMeters || a.rides - b.rides || a.fare.total - b.fare.total
    );
    if (!unique.length) return null;
    const best = unique[0];
    const alternatives = unique
      .slice(1)
      .filter((item) => item.arrival > best.arrival || item.walkMeters > best.walkMeters + 100)
      .slice(0, 1);
    return Object.assign({}, best, {
      place,
      departAt,
      label: transferLabel(best),
      pathLabel: describePath(best),
      reasons: reasonsFor(best, alternatives),
      speech: speechFor(best),
      alternatives: alternatives.map((item) =>
        Object.assign({}, item, { pathLabel: describePath(item), label: transferLabel(item) })
      ),
      taxi: { meters: place.taxiMeters, total: taxiFare(place.taxiMeters) },
    });
  }

  function matchPlace(query) {
    const text = String(query || "").trim().toLowerCase();
    if (!text) return { error: "empty" };
    const hits = places.filter((place) => {
      const name = place.name.toLowerCase();
      if (name === text || name.includes(text)) return true;
      return place.aliases.some((alias) => {
        const key = alias.toLowerCase();
        return key === text || (text.length >= 2 && (key.includes(text) || name.includes(text)));
      });
    });
    if (hits.length === 1) return { place: hits[0] };
    if (hits.length > 1) return { error: "many", hits };
    return { error: "none" };
  }

  function formatTime(minute, withSeconds) {
    const total = Math.max(0, Math.round(minute * 60));
    const hours = Math.floor(total / 3600) % 24;
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    if (!withSeconds) return hh + ":" + mm;
    return hh + ":" + mm + ":" + String(seconds).padStart(2, "0");
  }

  function formatDistance(meters) {
    const value = Math.max(0, Math.round(meters));
    if (value >= 1000) {
      const km = value / 1000;
      const text = km >= 10 ? km.toFixed(0) : km.toFixed(1);
      return text.replace(/\.0$/, "") + " กม.";
    }
    return value + " ม.";
  }

  function formatKm(meters) {
    return (meters / 1000).toFixed(1).replace(/\.0$/, "") + " กม.";
  }

  function formatRemain(minute) {
    if (minute <= 0.02) return "ถึงแล้ว";
    const whole = Math.ceil(minute - 1e-6);
    return whole + " นาที";
  }

  function nearby() {
    const stopWalks = walks
      .filter((walk) => walk.from === "home")
      .map((walk) => ({
        to: walk.to,
        name: nodes[walk.to].name,
        platform: nodes[walk.to].platform,
        minutes: walk.minutes,
        meters: walk.meters,
        label: walk.label,
      }));
    const h2 = lineById.H2;
    const next = nextBoarding(h2, "suanthong", DEMO_TIME + 4);
    const missed = previousDeparture(h2, "suanthong", DEMO_TIME + 4);
    return {
      fix: {
        name: nodes.home.name,
        detail: nodes.home.detail,
        accuracyM: 8,
        time: DEMO_TIME,
      },
      walks: stopWalks,
      nextBus: next
        ? {
            line: "H2",
            depart: next.event.depart,
            missed,
          }
        : null,
    };
  }

  function pointBetween(a, b, fraction) {
    const clamped = Math.max(0, Math.min(1, fraction));
    return {
      x: a.x + (b.x - a.x) * clamped,
      y: a.y + (b.y - a.y) * clamped,
    };
  }

  function pointOnTimeline(timeline, time) {
    if (!timeline.length) return { x: 0, y: 0 };
    if (time <= timeline[0].depart) return { x: timeline[0].x, y: timeline[0].y };
    for (let index = 0; index < timeline.length - 1; index += 1) {
      const from = timeline[index];
      const to = timeline[index + 1];
      if (time < from.depart) return { x: from.x, y: from.y };
      if (time <= to.arrive) {
        const span = to.arrive - from.depart;
        const fraction = span === 0 ? 1 : (time - from.depart) / span;
        return pointBetween(from, to, fraction);
      }
      if (time <= to.depart) return { x: to.x, y: to.y };
    }
    const last = timeline[timeline.length - 1];
    return { x: last.x, y: last.y };
  }

  function busesAt(time) {
    const buses = [];
    lines.forEach((line) => {
      runsByLine[line.id].forEach((run) => {
        const opened = run.events[0].depart;
        const closed = run.events[run.events.length - 1].arrive;
        if (time < opened || time > closed) return;
        const timeline = run.events.map((event) => ({
          x: nodes[event.stop].x,
          y: nodes[event.stop].y,
          arrive: event.arrive,
          depart: event.depart,
        }));
        const point = pointOnTimeline(timeline, time);
        buses.push({
          id: run.id,
          line: line.id,
          x: point.x,
          y: point.y,
        });
      });
    });
    return buses;
  }

  function userPoint(plan, time) {
    if (!plan) return { x: nodes.home.x, y: nodes.home.y, node: "home" };
    const clock = Math.min(Math.max(time, plan.departAt), plan.arrival);
    const leg =
      plan.legs.find((item) => clock >= item.start && clock < item.end) ||
      plan.legs[plan.legs.length - 1];
    if (!leg) return { x: nodes.home.x, y: nodes.home.y, node: "home" };
    if (leg.type === "walk") {
      const span = leg.end - leg.start;
      const fraction = span === 0 ? 1 : (clock - leg.start) / span;
      const point = pointBetween(nodes[leg.from], nodes[leg.to], fraction);
      return Object.assign(point, { node: fraction < 1 ? leg.from : leg.to });
    }
    if (leg.type === "wait") {
      return { x: nodes[leg.stop].x, y: nodes[leg.stop].y, node: leg.stop };
    }
    const point = pointOnTimeline(leg.timeline, clock);
    return Object.assign(point, { node: leg.to });
  }

  function activeLeg(plan, time) {
    if (!plan) return null;
    const found = plan.legs.find((leg) => time >= leg.start && time < leg.end);
    return found || plan.legs[plan.legs.length - 1];
  }

  function narration(plan, time) {
    const leg = activeLeg(plan, time);
    if (!leg || time >= plan.arrival) {
      return {
        kicker: "ถึงปลายทาง",
        title: "ถึง" + plan.place.name + "แล้ว",
        detail:
          "ใช้เวลา " +
          plan.minutes +
          " นาที · ค่าโดยสาร " +
          plan.fare.total +
          " บาท",
        rule: "สรุปเวลาและค่าใช้จ่ายทั้งทริป",
        leg,
      };
    }
    if (leg.type === "walk") {
      const span = leg.end - leg.start || 1;
      const left = Math.max(0, leg.meters * ((leg.end - time) / span));
      const boarding = /เปลี่ยน/.test(leg.label);
      return {
        kicker: boarding ? "เปลี่ยนสาย" : "เดินไปขึ้นรถ",
        title: leg.label,
        detail: "อีก " + formatDistance(left) + " · " + formatRemain(leg.end - time),
        rule: boarding
          ? "ต่อรถคือเดินเปลี่ยนชานชาลา รถไม่เลี้ยวออกจากเส้น"
          : "จับเวลาเดินคู่กับรอบรถที่ยังทัน",
        leg,
      };
    }
    if (leg.type === "wait") {
      const missed =
        leg.missed != null ? "รอบ " + formatTime(leg.missed) + " ออกไปแล้ว · " : "";
      const arrivalText =
        leg.busArrives === leg.departs
          ? "ออกรถ " + formatTime(leg.departs)
          : "รถเข้าป้าย " + formatTime(leg.busArrives) + " · ออกรถ " + formatTime(leg.departs);
      return {
        kicker: "รอที่ป้าย" + nodes[leg.stop].name,
        title: "รอสาย " + leg.line,
        detail: missed + arrivalText + " · อีก " + formatRemain(leg.end - time),
        rule: "ไม่ส่งผู้ใช้ไปขึ้นรอบที่ออกไปก่อนเดินถึง",
        leg,
      };
    }
    const upcoming = leg.timeline.find((stop) => stop.arrive > time + 0.05);
    const alightSoon = leg.end - time <= 1;
    const remainingStops = leg.timeline.filter((stop) => stop.arrive > time + 0.05).length;
    return {
      kicker: "บนสาย " + leg.line + " " + leg.lineName,
      title: alightSoon ? "เตรียมลงที่" + nodes[leg.to].name : "ป้ายถัดไป " + (upcoming ? upcoming.name : nodes[leg.to].name),
      detail: alightSoon
        ? "อีก " + formatRemain(leg.end - time) + " จะถึงจุดลง"
        : "อีก " + remainingStops + " ป้ายจะถึงจุดลง · ลงเวลา " + formatTime(leg.end),
      rule: "เตือนจุดลงตามตำแหน่งรถบนเส้น ไม่เปลี่ยนสายกลางทาง",
      leg,
    };
  }

  return {
    PRODUCT,
    DEMO_TIME,
    LATE_TIME,
    nodes,
    lines,
    walks,
    places,
    lineById,
    stopsOf,
    planTrip,
    matchPlace,
    nearby,
    busesAt,
    userPoint,
    activeLeg,
    narration,
    formatTime,
    formatDistance,
    formatKm,
    formatRemain,
    fareFor,
    describePath,
  };
});
