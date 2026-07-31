(function () {
  var root = document.documentElement;
  var stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
        var next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      });
    }

    var filterCheckboxes = document.querySelectorAll(".job-filter-item input");
    var postCards = document.querySelectorAll(".post-grid .post-card");
    if (filterCheckboxes.length && postCards.length) {
      var applyFilter = function () {
        var checked = Array.prototype.filter
          .call(filterCheckboxes, function (cb) { return cb.checked; })
          .map(function (cb) { return cb.value; });
        postCards.forEach(function (card) {
          var visible = checked.length === 0 || checked.indexOf(card.getAttribute("data-category")) !== -1;
          card.style.display = visible ? "" : "none";
        });
      };
      filterCheckboxes.forEach(function (cb) { cb.addEventListener("change", applyFilter); });
    }
  });
})();
