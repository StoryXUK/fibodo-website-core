/* ===== DARK MODE TOGGLE ===== */
(function () {
  var checkbox = document.getElementById("themeToggleInput");
  if (!checkbox) return;

  var stored = localStorage.getItem("theme");
  if (stored === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    checkbox.checked = true;
  }

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  });
})();

/* ===== NAV TOGGLE ===== */
(function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  var overlay = document.getElementById("navOverlay");
  if (!toggle || !nav || !overlay) return;

  toggle.addEventListener("click", function () {
    toggle.classList.toggle("open");
    nav.classList.toggle("open");
    overlay.classList.toggle("visible");
  });

  overlay.addEventListener("click", function () {
    toggle.classList.remove("open");
    nav.classList.remove("open");
    overlay.classList.remove("visible");
  });
})();

/* ===== MEAL PLAN CLEAR ===== */
(function () {
  var btn = document.getElementById("clearPlanBtn");
  if (!btn) return;

  // Textarea version (meal-plan.html)
  var textareas = document.querySelectorAll(".mealplan-wrap textarea");
  if (textareas.length) {
    btn.addEventListener("click", function () {
      textareas.forEach(function (t) { t.value = ""; });
    });
    return;
  }

  // Contenteditable version (mealplan-output.html)
  btn.addEventListener("click", function () {
    document.querySelectorAll(".wo-section-body, .wo-note-body").forEach(function (el) {
      el.innerHTML = "";
    });
  });
})();

/* ===== WORKOUT CLEAR ===== */
(function () {
  var btn = document.getElementById("clearWorkoutBtn");
  if (!btn) return;

  // Textarea version (workout.html)
  var textareas = document.querySelectorAll(".workout-wrap textarea");
  if (textareas.length) {
    btn.addEventListener("click", function () {
      textareas.forEach(function (t) { t.value = ""; });
    });
    return;
  }

  // Contenteditable version (workout-output.html)
  btn.addEventListener("click", function () {
    document.querySelectorAll(".wo-section-body, .wo-note-body").forEach(function (el) {
      el.innerHTML = "";
    });
  });
})();

/* ===== WEEK / DAY VIEW TOGGLE ===== */
(function () {
  var toggleBtns = document.querySelectorAll(".wo-toggle-btn");
  var weekView = document.getElementById("weekView");
  var dayNav = document.getElementById("dayNav");
  var dayCards = document.querySelectorAll(".wo-day-card");
  var dayBtns = document.querySelectorAll(".wo-day-btn");

  if (!toggleBtns.length || !weekView) return;

  var currentView = "week";
  var currentDay = 0;

  function showDay(idx) {
    dayCards.forEach(function (c) {
      c.classList.toggle("wo-hidden", parseInt(c.dataset.col) !== idx);
    });
  }

  toggleBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      toggleBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentView = btn.dataset.view;

      if (currentView === "week") {
        weekView.classList.remove("wo-day-mode");
        dayNav.classList.remove("visible");
        dayCards.forEach(function (c) { c.classList.remove("wo-hidden"); });
      } else {
        weekView.classList.add("wo-day-mode");
        dayNav.classList.add("visible");
        showDay(currentDay);
      }
    });
  });

  dayBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      dayBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentDay = parseInt(btn.dataset.day);
      showDay(currentDay);
    });
  });
})();

/* ===== TIMETABLE ===== */
(function () {
  var elDates = document.getElementById("ttDates");
  var elList = document.getElementById("ttList");
  var elHeading = document.getElementById("ttHeading");
  var elCount = document.getElementById("ttCount");
  var elSearch = document.getElementById("ttSearch");
  var elLocation = document.getElementById("ttLocation");
  var elCategory = document.getElementById("ttCategory");
  var elClear = document.getElementById("ttClear");

  if (!elDates || !elList) return;

  var pad2 = function (n) { return String(n).padStart(2, "0"); };

  function formatDayLabel(d) {
    return d.toLocaleDateString(undefined, { weekday: "long", day: "2-digit", month: "long" });
  }

  function formatShort(d) {
    return d.toLocaleDateString(undefined, { weekday: "short" });
  }

  function formatNum(d) {
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
  }

  function ymd(d) {
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }

  function minutesBetween(startHHMM, endHHMM) {
    var s = startHHMM.split(":").map(Number);
    var e = endHHMM.split(":").map(Number);
    return (e[0] * 60 + e[1]) - (s[0] * 60 + s[1]);
  }

  function durationLabel(mins) {
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    if (h && m) return h + "h " + m + "m";
    if (h) return h + "h";
    return m + "m";
  }

  var TODAY = new Date();
  var dates = [];
  for (var i = 0; i < 7; i++) {
    dates.push(ymd(new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + i)));
  }

  var SESSIONS = [
    { date: dates[0], location: "Clapham Junction", category: "Strength", title: "Lift", instructor: "Nina Luca", start: "07:00", end: "07:45", bookUrl: "#" },
    { date: dates[0], location: "Clapham Junction", category: "Yoga", title: "Vinyasa Yoga", instructor: "Natasha O'Brien", start: "12:15", end: "13:15", bookUrl: "#" },
    { date: dates[0], location: "Soho", category: "Conditioning", title: "Metaburn", instructor: "Mikey Colbourne", start: "18:30", end: "19:15", bookUrl: "#" },
    { date: dates[0], location: "Soho", category: "Pilates", title: "Dynamic Reformer", instructor: "Cian Hughes", start: "19:10", end: "20:00", bookUrl: "#" },
    { date: dates[1], location: "Clapham Junction", category: "Pilates", title: "Tower Pilates", instructor: "Janet Steele", start: "06:10", end: "07:00", bookUrl: "#" },
    { date: dates[1], location: "Soho", category: "Strength", title: "Force", instructor: "Alessandro Tessadro", start: "10:30", end: "11:15", bookUrl: "#" },
    { date: dates[1], location: "Mayfair", category: "Yoga", title: "Yin Yoga", instructor: "Cathy Henderson", start: "17:00", end: "17:45", bookUrl: "#" },
    { date: dates[2], location: "Mayfair", category: "Conditioning", title: "Sweat X", instructor: "Georgia Isaacs", start: "06:45", end: "07:30", bookUrl: "#" },
    { date: dates[2], location: "Clapham Junction", category: "Strength", title: "The WOD", instructor: "Nina Luca", start: "08:00", end: "08:45", bookUrl: "#" },
    { date: dates[3], location: "Soho", category: "Pilates", title: "Mat Pilates", instructor: "Millie Shiers", start: "11:15", end: "12:00", bookUrl: "#" },
    { date: dates[3], location: "Soho", category: "Yoga", title: "Hatha Yoga", instructor: "Callista Nurse", start: "07:30", end: "08:15", bookUrl: "#" },
    { date: dates[4], location: "Mayfair", category: "Recovery", title: "Sound Bath", instructor: "Cathy Henderson", start: "18:00", end: "19:00", bookUrl: "#" },
    { date: dates[5], location: "Clapham Junction", category: "Conditioning", title: "HYROX Train", instructor: "Mikey Colbourne", start: "09:45", end: "10:30", bookUrl: "#" },
    { date: dates[6], location: "Soho", category: "Strength", title: "The Method", instructor: "Willow Cockram-Hawkins", start: "08:30", end: "09:15", bookUrl: "#" }
  ];

  var selectedDate = dates[0];

  function buildDatePills() {
    elDates.innerHTML = "";
    for (var i = 0; i < 7; i++) {
      var d = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + i);
      var key = ymd(d);

      var pill = document.createElement("button");
      pill.type = "button";
      pill.className = "tt-date" + (key === selectedDate ? " active" : "");
      pill.setAttribute("data-date", key);

      var day = document.createElement("div");
      day.className = "tt-day";
      day.textContent = (i === 0) ? "Today" : d.toLocaleDateString(undefined, { weekday: "long" });

      var num = document.createElement("div");
      num.className = "tt-num";
      num.textContent = formatNum(d);

      var short = document.createElement("div");
      short.className = "tt-short";
      short.textContent = formatShort(d);

      pill.appendChild(day);
      pill.appendChild(num);
      pill.appendChild(short);

      (function (k) {
        pill.addEventListener("click", function () {
          selectedDate = k;
          buildDatePills();
          render();
        });
      })(key);

      elDates.appendChild(pill);
    }
  }

  function populateFilters() {
    var locations = [];
    var categories = [];
    SESSIONS.forEach(function (s) {
      if (locations.indexOf(s.location) === -1) locations.push(s.location);
      if (categories.indexOf(s.category) === -1) categories.push(s.category);
    });
    locations.sort();
    categories.sort();

    locations.forEach(function (loc) {
      var opt = document.createElement("option");
      opt.value = loc;
      opt.textContent = loc;
      elLocation.appendChild(opt);
    });

    categories.forEach(function (cat) {
      var opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      elCategory.appendChild(opt);
    });
  }

  function render() {
    var d = new Date(selectedDate + "T00:00:00");
    elHeading.textContent = (selectedDate === dates[0]) ? "Today" : formatDayLabel(d);

    var q = (elSearch.value || "").trim().toLowerCase();
    var loc = elLocation.value;
    var cat = elCategory.value;

    var items = SESSIONS
      .filter(function (s) { return s.date === selectedDate; })
      .filter(function (s) { return !loc || s.location === loc; })
      .filter(function (s) { return !cat || s.category === cat; })
      .filter(function (s) {
        if (!q) return true;
        return (
          s.title.toLowerCase().indexOf(q) !== -1 ||
          s.instructor.toLowerCase().indexOf(q) !== -1 ||
          s.location.toLowerCase().indexOf(q) !== -1 ||
          s.category.toLowerCase().indexOf(q) !== -1
        );
      })
      .sort(function (a, b) { return a.start > b.start ? 1 : -1; });

    elCount.textContent = items.length + " " + (items.length === 1 ? "class" : "classes");

    elList.innerHTML = "";

    if (!items.length) {
      var empty = document.createElement("div");
      empty.className = "tt-empty";
      empty.textContent = "No classes match your filters for this day.";
      elList.appendChild(empty);
      return;
    }

    items.forEach(function (s) {
      var mins = minutesBetween(s.start, s.end);

      var item = document.createElement("article");
      item.className = "tt-item";

      var time = document.createElement("div");
      time.className = "tt-time";
      time.innerHTML = "<strong>" + s.start + "\u2013" + s.end + "</strong><span>" + durationLabel(mins) + "</span>";

      var body = document.createElement("div");
      body.className = "tt-body";
      body.innerHTML = '<div class="tt-badge">' + s.location + " \u2022 " + s.category + "</div>" +
        '<h3 class="tt-title">' + s.title + "</h3>" +
        '<div class="tt-meta"><span><b>' + s.instructor + "</b></span></div>";

      var cta = document.createElement("div");
      cta.className = "tt-cta";
      cta.innerHTML = '<a class="tt-link" href="' + s.bookUrl + '">Book</a>';

      item.appendChild(time);
      item.appendChild(body);
      item.appendChild(cta);
      elList.appendChild(item);
    });
  }

  elSearch.addEventListener("input", render);
  elLocation.addEventListener("change", render);
  elCategory.addEventListener("change", render);

  elClear.addEventListener("click", function () {
    elSearch.value = "";
    elLocation.value = "";
    elCategory.value = "";
    render();
  });

  buildDatePills();
  populateFilters();
  render();
})();

