/* RainCloud Ukraina — sidebar nav tooltips
   Assigns a hover tooltip (data-tip) to each .feed-nav__row by matching its
   label text. The bubble + arrow are rendered purely in CSS (components.css /
   the inlined feed-shell block). Centralised here so every page — current and
   future — gets identical tooltip copy without per-row markup. */
(function () {
  var TIPS = {
    "Feed": "Your personalised overview of new matches, updates, products, people, companies, events, and opportunities across the RainCloud ecosystem.",
    "Network": "Find and connect with members, experts, company representatives, investors, and decision-makers involved in Ukraine's recovery.",
    "Companies & Organisations": "Explore verified companies, suppliers, NGOs, public institutions, and organisations participating in reconstruction projects.",
    "Virtual Trade Show": "Discover products, services, technologies, and companies offering solutions for Ukraine's reconstruction.",
    "Business Pavilions": "Visit dedicated company and organisation spaces with curated products, services, contacts, and business materials.",
    "Opportunities": "Browse active tenders, RFPs, partnership requests, investment opportunities, and reconstruction-related projects.",
    "Thought Leadership": "Read expert articles, reports, insights, and strategic analysis from members and organisations in the ecosystem.",
    "Events": "Explore upcoming forums, conferences, roundtables, meetings, and trade events related to Ukraine's recovery.",
    "News": "Stay current with announcements, funding updates, and developments shaping Ukraine's reconstruction."
  };

  function apply() {
    var rows = document.querySelectorAll(".feed-nav__row");
    rows.forEach(function (row) {
      var label = (row.textContent || "").replace(/\s+/g, " ").trim();
      if (TIPS[label]) row.setAttribute("data-tip", TIPS[label]);
    });
  }

  /* ---- Filters popover toggle (Companies / Network pages) ----
     A [data-filters-toggle] button toggles the .filters-popover inside the same
     .filters-wrap. Click-outside, the X ([data-filters-close]) and Esc close it. */
  function wireFilters() {
    var wrap = document.querySelector(".filters-wrap");
    if (!wrap) return;
    var btn = wrap.querySelector("[data-filters-toggle]");
    var pop = wrap.querySelector(".filters-popover");
    if (!btn || !pop) return;

    function open() { wrap.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); }
    function close() { wrap.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }
    function toggle(e) { e.stopPropagation(); wrap.classList.contains("is-open") ? close() : open(); }

    btn.addEventListener("click", toggle);
    pop.addEventListener("click", function (e) { e.stopPropagation(); });
    var x = pop.querySelector("[data-filters-close]");
    if (x) x.addEventListener("click", close);
    document.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  function init() { apply(); wireFilters(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
