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
    var postCards = Array.prototype.slice.call(document.querySelectorAll(".post-grid .post-card"));
    var paginationEl = document.querySelector(".pagination");
    var searchInput = document.getElementById("site-search");
    var heroEl = document.querySelector(".hero");
    var featuredEl = document.getElementById("featured");
    var PAGE_SIZE = 6;
    var currentPage = 1;
    var activeQuery = "";

    var updateSearchModeSections = function () {
      var searching = activeQuery.length > 0;
      if (heroEl) heroEl.style.display = searching ? "none" : "";
      if (featuredEl) featuredEl.style.display = searching ? "none" : "";
    };

    if (postCards.length) {
      var getFilteredCards = function () {
        var checked = Array.prototype.filter
          .call(filterCheckboxes, function (cb) { return cb.checked; })
          .map(function (cb) { return cb.value; });
        var query = activeQuery.toLowerCase();
        return postCards.filter(function (card) {
          var matchesCategory = !checked.length || checked.indexOf(card.getAttribute("data-category")) !== -1;
          var matchesSearch = !query || card.textContent.toLowerCase().indexOf(query) !== -1;
          return matchesCategory && matchesSearch;
        });
      };

      var renderPagination = function (totalPages) {
        if (!paginationEl) return;
        paginationEl.innerHTML = "";
        for (var i = 1; i <= totalPages; i++) {
          var pageBtn = document.createElement("button");
          pageBtn.type = "button";
          pageBtn.className = "page-btn" + (i === currentPage ? " active" : "");
          pageBtn.textContent = String(i);
          pageBtn.addEventListener("click", (function (page) {
            return function () {
              currentPage = page;
              update();
            };
          })(i));
          paginationEl.appendChild(pageBtn);
        }
      };

      var update = function () {
        var filtered = getFilteredCards();
        var totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
        if (currentPage > totalPages) currentPage = totalPages;
        postCards.forEach(function (card) { card.style.display = "none"; });
        var start = (currentPage - 1) * PAGE_SIZE;
        filtered.slice(start, start + PAGE_SIZE).forEach(function (card) { card.style.display = ""; });
        renderPagination(totalPages);
      };

      filterCheckboxes.forEach(function (cb) {
        cb.addEventListener("change", function () {
          currentPage = 1;
          update();
        });
      });

      if (searchInput) {
        searchInput.addEventListener("keydown", function (e) {
          if (e.key !== "Enter") return;
          e.preventDefault();
          activeQuery = searchInput.value.trim();
          currentPage = 1;
          updateSearchModeSections();
          update();
        });
      }

      update();
    }
  });
})();
