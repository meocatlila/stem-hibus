(function () {
  var root = document.documentElement;
  var button = document.getElementById("theme");
  try {
    var saved = localStorage.getItem("hibus-theme");
    if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  } catch (error) {
    /* Presentation still works if storage is blocked. */
  }
  function label() {
    if (!button) return;
    var dark = root.getAttribute("data-theme") === "dark";
    button.textContent = dark ? "ธีมสว่าง" : "ธีมเข้ม";
    button.setAttribute("aria-pressed", dark ? "true" : "false");
  }
  if (button) {
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("hibus-theme", next);
      } catch (error) {
        /* Ignore. */
      }
      label();
    });
  }
  label();
})();
