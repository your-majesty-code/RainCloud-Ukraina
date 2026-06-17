/* RainCloud Ukraina — Feed "super-search" popover.
   Opens beneath the hero search field on focus. Context-aware:
   - empty field  -> recent / suggested / relevant people + type & category chips
   - typing       -> intent is detected from the query and the popover morphs
                     (with a subtle motion) into a results block tuned to that
                     intent: Person · Company · Service · Product · mixed (Drones).
   Pure mock data — no network. */
(function () {
  "use strict";

  /* ---------- tiny icon set ---------- */
  var PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
  var CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

  /* ---------- empty-state data ---------- */
  var EMPTY = {
    recent: ["Modular housing suppliers in Lviv", "Solar panel manufacturers in Ukraine", "Active reconstruction tenders"],
    suggested: ["Search reconstruction products", "Find active opportunities", "Find members by expertise"],
    people: [
      { t: "Anna Müller", s: "Project Director · WeBuild" },
      { t: "Olena Kovalenko", s: "Energy Policy Manager" },
      { t: "Tomasz Jabłoński", s: "Investment Advisor" }
    ],
    types: ["All", "Events", "Members", "Companies", "Articles", "Opportunities", "News", "Products"],
    cats: ["Housing", "Energy", "Infrastructure", "Construction"]
  };

  /* ---------- context-aware result scenarios ---------- */
  function P(t, s) { return { person: true, title: t, sub: s }; }
  function C(t, s) { return { title: t, sub: s }; }

  var SCEN = {
    product: {
      top: { badge: "Product", title: "Rapid Modular Housing Units", meta: "Housing · UkrBuild Solutions · Kyiv, Ukraine", loc: "Kyiv, Ukraine" },
      cols: [
        { label: "Relevant people to contact", items: [P("Ivan Petrov", "Product Owner · Slava Modular"), P("Anna Müller", "Project Director · WeBuild")] },
        { label: "Products", items: [C("Modular Wall Panel", "Product · Housing"), C("Prefabricated Modular Home", "Product · Housing")] },
        { label: "Companies", items: [C("Slava Modular", "Verified company · Housing"), C("UkrBuild Solutions", "Manufacturer · Construction")] }
      ],
      bottom: { label: "Opportunities", rows: [
        { title: "Prefab housing supplier", sub: "Bucha · RFP · €1.8M · Deadline Aug 12" },
        { title: "Temporary housing units", sub: "Kyiv · Procurement · Open" }
      ] }
    },

    person: {
      top: { badge: "Person", title: "Anna Müller", meta: "Company Representative · WeBuild", loc: "Berlin, Germany" },
      cols: [
        { label: "People", items: [P("Anna Müller", "Project Director · WeBuild"), P("Olena Kovalenko", "Energy Policy Manager · Kyiv")] },
        { label: "Shared companies", items: [C("WeBuild", "Construction · Germany"), C("Slava Modular", "Manufacturer · Housing")] },
        { label: "Expertise", items: [C("Modular construction", "Topic · 24 experts"), C("Energy policy", "Topic · 11 experts")] }
      ],
      bottom: { label: "Mutual opportunities", rows: [
        { title: "Modular Housing Roundtable", sub: "Warsaw · Event · Jun 4, 2026" },
        { title: "Prefab housing supplier", sub: "Bucha · RFP · €1.8M" }
      ] }
    },

    company: {
      top: { badge: "Company", title: "UkrBuild Solutions", meta: "Manufacturer · Construction & Housing · Ukraine", loc: "12 products · 38 members" },
      cols: [
        { label: "Companies", items: [C("UkrBuild Solutions", "Manufacturer · Construction"), C("Slava Modular", "Verified company · Housing")] },
        { label: "Products", items: [C("Rapid Modular Housing Units", "Product · Housing"), C("Modular Wall Panel", "Product · Housing")] },
        { label: "Key contacts", items: [P("Ivan Petrov", "Product Owner"), P("Mark Weber", "Business Development Lead")] }
      ],
      bottom: { label: "Open opportunities", rows: [
        { title: "Prefab housing supplier", sub: "Bucha · RFP · €1.8M" },
        { title: "Steel bridge components tender", sub: "Dnipro · Tender · €3.2M" }
      ] }
    },

    service: {
      top: { badge: "Service", title: "Humanitarian Demining Services", meta: "Service · Defense & Demining · SafeGround Ukraine", loc: "Ukraine" },
      cols: [
        { label: "Services", items: [C("Humanitarian demining", "Service · Site safety"), C("Site survey & assessment", "Service · Engineering")] },
        { label: "Providers", items: [C("SafeGround Ukraine", "Technology Provider · Defense"), C("UkrBuild Solutions", "Manufacturer · Construction")] },
        { label: "Specialists", items: [P("Maria Shevchuk", "Operations Lead · SafeGround"), P("Ivan Petrov", "Product Owner · Slava Modular")] }
      ],
      bottom: { label: "Related opportunities", rows: [
        { title: "Demining equipment supply", sub: "Kharkiv · RFP · €2.4M · Deadline Sep 3" },
        { title: "Field safety training programme", sub: "Kyiv · Procurement · Open" }
      ] }
    },

    /* mixed entity: name + location + product type ("Drones") */
    drones: {
      top: { badge: "Product", title: "Reconnaissance UAV Systems", meta: "Drones · AeroDefence UA · Kyiv, Ukraine", loc: "Kyiv, Ukraine" },
      cols: [
        { label: "Relevant people to contact", items: [P("Andriy Kovalenko", "UAV Engineer · AeroDefence"), P("Tomasz Jabłoński", "Investment Advisor")] },
        { label: "Products", items: [C("Reconnaissance UAV", "Product · Drones"), C("Cargo Drone Platform", "Product · Drones")] },
        { label: "Companies", items: [C("AeroDefence UA", "Manufacturer · Defense"), C("SafeGround Ukraine", "Technology Provider")] }
      ],
      bottom: { label: "Opportunities", rows: [
        { title: "UAV procurement programme", sub: "Kyiv · Tender · €5.1M · Deadline Sep 1" },
        { title: "Drone pilot training", sub: "Lviv · Service · Open" }
      ] }
    }
  };
  SCEN.mixed = SCEN.product; // default mixed view reuses the rich product layout

  /* ---------- intent detection ---------- */
  function detect(q) {
    q = q.toLowerCase();
    var has = function () { for (var i = 0; i < arguments.length; i++) { if (q.indexOf(arguments[i]) !== -1) return true; } return false; };
    if (has("drone", "uav", "uas", "unmanned")) return "drones";
    if (has("anna", "olena", "ivan", "tomasz", "sarah", "dmytro", "mueller", "müller", "kovalenko", "petrov", "jablon", "manager", "director", "advisor", "expert", "engineer", "people", "person", "who ", "contact")) return "person";
    if (has("company", "companies", "supplier", "manufacturer", "organisation", "organization", "ukrbuild", "slava", "energreen", "steelframe", "safeground", "medunit", "aquatech", "aerodefence", "firm", "vendor", "provider")) return "company";
    if (has("service", "consult", "logistic", "demining", "training", "repair", "installation", "maintenance", "survey", "assessment")) return "service";
    if (has("housing", "panel", "module", "modular", "kit", "material", "product", "solar", "bridge", "clinic", "water", "steel", "concrete")) return "product";
    return "mixed";
  }

  /* ---------- renderers ---------- */
  function renderEmpty() {
    var col = function (label, html) { return '<div class="ss-col"><p class="ss-label">' + label + '</p><div class="ss-list">' + html + '</div></div>'; };
    var items = function (arr) { return arr.map(function (t) { return '<div class="ss-item">' + t + '</div>'; }).join(""); };
    var ppl = EMPTY.people.map(function (p) { return '<div class="ss-person"><div class="ss-person__name">' + p.t + '</div><div class="ss-person__sub">' + p.s + '</div></div>'; }).join("");
    return '' +
      '<div class="ss-grid3">' +
        col("Recent searches", items(EMPTY.recent)) +
        col("Suggested searches", items(EMPTY.suggested)) +
        col("Relevant people", ppl) +
      '</div>' +
      '<hr class="ss-divider">' +
      '<div class="ss-section"><p class="ss-label">Search by type</p><div class="ss-chips">' +
        EMPTY.types.map(function (t, i) { return '<button class="ss-chip' + (i === 0 ? " is-active" : "") + '">' + t + '</button>'; }).join("") +
      '</div></div>' +
      '<div class="ss-section"><p class="ss-label">Popular categories</p><div class="ss-chips">' +
        EMPTY.cats.map(function (c) { return '<button class="ss-chip">' + c + '</button>'; }).join("") +
      '</div></div>';
  }

  function renderResults(s) {
    var cols = s.cols.map(function (c) {
      var list = c.items.map(function (it) {
        return it.person
          ? '<div class="ss-person"><div class="ss-person__name">' + it.title + '</div><div class="ss-person__sub">' + it.sub + '</div></div>'
          : '<div class="ss-card"><div class="ss-card__title">' + it.title + '</div><div class="ss-card__sub">' + it.sub + '</div></div>';
      }).join("");
      return '<div class="ss-col"><p class="ss-label">' + c.label + '</p><div class="ss-list">' + list + '</div></div>';
    }).join("");

    var bottom = s.bottom ? (
      '<div class="ss-section" style="margin-top:20px"><p class="ss-label">' + s.bottom.label + '</p><div class="ss-list">' +
      s.bottom.rows.map(function (r) {
        return '<div class="ss-row"><div><div class="ss-row__title">' + r.title + '</div><div class="ss-row__sub">' + r.sub + '</div></div>' + CHEV + '</div>';
      }).join("") + '</div></div>'
    ) : "";

    return '' +
      '<p class="ss-label">Top match</p>' +
      '<div class="ss-top"><div class="ss-top__body">' +
        '<div class="ss-top__title">' + s.top.title + '</div>' +
        '<div class="ss-top__meta"><span class="ss-badge">' + s.top.badge + '</span>' + s.top.meta + '</div>' +
        (s.top.loc ? '<div class="ss-top__loc">' + PIN + s.top.loc + '</div>' : "") +
      '</div><span class="ss-top__go">' + CHEV + '</span></div>' +
      '<div class="ss-grid3" style="margin-top:20px">' + cols + '</div>' +
      bottom;
  }

  /* ---------- wire up ---------- */
  function init() {
    var wrap = document.querySelector(".ss-wrap");
    if (!wrap) return;
    var input = wrap.querySelector("input");
    var body = wrap.querySelector(".ss-body");
    if (!input || !body) return;

    var curKey = null;

    function animate() { body.classList.remove("ss-in"); void body.offsetWidth; body.classList.add("ss-in"); }

    function render() {
      var q = input.value.trim();
      var scen = q ? detect(q) : null;
      var key = scen ? "r:" + scen : "empty";
      if (key === curKey) return;          // same view -> keep stable (no jitter while typing)
      curKey = key;
      body.innerHTML = scen ? renderResults(SCEN[scen]) : renderEmpty();
      animate();
    }

    function open() { if (!wrap.classList.contains("is-open")) { wrap.classList.add("is-open"); } render(); }
    function close() { wrap.classList.remove("is-open"); curKey = null; }

    input.addEventListener("focus", open);
    input.addEventListener("input", open);
    document.addEventListener("mousedown", function (e) { if (!wrap.contains(e.target)) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { close(); input.blur(); } });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
