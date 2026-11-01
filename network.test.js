const H = require("./network.js");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const uni = H.planTrip("uni");
assert(H.formatTime(uni.arrival) === "08:37", "uni arrival " + H.formatTime(uni.arrival));
assert(uni.minutes === 25, "uni minutes");
assert(uni.fare.total === 29, "uni fare");
assert(uni.transfers === 0, "uni transfers");
assert(uni.reasons[0].indexOf("08:10") !== -1, "uni missed bus");

const mall = H.planTrip("mall");
assert(H.formatTime(mall.arrival) === "08:45", "mall arrival");
assert(mall.minutes === 33 && mall.fare.total === 33, "mall totals");
assert(mall.transfers === 1, "mall transfer");
assert(mall.alternatives[0].fare.total === 28, "mall alt fare");
assert(mall.alternatives[0].arrival - mall.arrival === 8, "mall alt delay");

const stadium = H.planTrip("stadium");
assert(H.formatTime(stadium.arrival) === "08:57", "stadium arrival");
assert(stadium.minutes === 45 && stadium.fare.total === 37, "stadium totals");
assert(stadium.transfers === 2, "stadium transfers");

const late = H.planTrip("uni", H.LATE_TIME);
assert(H.formatTime(late.arrival) === "08:47", "late uni");
assert(late.reasons[0].indexOf("08:30") !== -1, "late catches 08:30");

const unknown = H.matchPlace("สนามบิน");
assert(unknown.error === "none", "unknown place");

const stop = H.nodes.suanthong;
assert(
  stop.name === "โรงเรียนเซนต์ฟรังค์ซิสซาเวียร์คอนแวนต์",
  "nearest stop name"
);
assert(stop.labelLines.join("") === stop.name, "map label is the full stop name");
assert(stop.name.indexOf("สวนทอง") === -1, "stop is not สวนทอง");
assert(H.nodes.home.name === "หมู่บ้านสวนทอง", "origin stays the village");

console.log("network.test.js ok");
