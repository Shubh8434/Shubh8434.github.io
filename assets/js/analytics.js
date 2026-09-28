/*
 * Site analytics: Google Analytics 4 (GA4) + Microsoft Clarity.
 * IDs are kept here in one place so they are easy to update.
 *   GA4 Measurement ID : G-K1119V8VKK
 *   Clarity Project ID : yp8i9hyxg2
 */
(function () {
  var GA4_ID = "G-K1119V8VKK";
  var CLARITY_ID = "yp8i9hyxg2";

  // --- Google Analytics 4 ---
  var ga = document.createElement("script");
  ga.async = true;
  ga.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
  document.head.appendChild(ga);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA4_ID);

  // --- Microsoft Clarity ---
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);

  // --- GoatCounter: records visits (private dashboard) ---
  var GC_BASE = "https://shubhamsharma.goatcounter.com";
  var gc = document.createElement("script");
  gc.async = true;
  gc.src = "//gc.zgo.at/count.js";
  gc.setAttribute("data-goatcounter", GC_BASE + "/count");
  document.head.appendChild(gc);

  // --- Visible total visitor count in the footer ---
  // GoatCounter's site-wide "TOTAL" bucket is only populated going forward and
  // is cached up to 4h, so early on it can read 0 even though real visits are
  // recorded under actual page paths. To show an accurate number, we read the
  // per-path counts for the main pages and sum them. Falls back silently if the
  // counter endpoints aren't reachable.
  // Requires "Allow adding visitor counts on your website" enabled in settings.
  var GC_PATHS = ["/", "/cv/", "/projects/", "/publications/", "/blog/", "/news/"];

  function renderCounter(text) {
    var footer =
      document.querySelector('footer[role="contentinfo"]') ||
      document.querySelector("footer");
    if (!footer) return;

    var wrap = footer.querySelector(".visitor-counter");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "visitor-counter";
      wrap.style.cssText =
        "text-align:center; margin-top:0.6rem; font-size:0.85rem; " +
        "color:var(--global-text-color); opacity:0.85;";
      footer.appendChild(wrap);
    }
    wrap.innerHTML =
      '<i class="fa-solid fa-eye" style="margin-right:0.4rem;"></i>' +
      "<span>" + text + " total visits</span>";
  }

  function fetchPathCount(path) {
    var url = GC_BASE + "/counter/" + encodeURIComponent(path) + ".json";
    return fetch(url)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.count) return 0;
        // count is a formatted string that may contain thousands separators
        var n = parseInt(String(data.count).replace(/[^0-9]/g, ""), 10);
        return isNaN(n) ? 0 : n;
      })
      .catch(function () { return 0; });
  }

  function loadVisitorCount() {
    Promise.all(GC_PATHS.map(fetchPathCount))
      .then(function (counts) {
        var total = counts.reduce(function (a, b) { return a + b; }, 0);
        if (total > 0) {
          renderCounter(total.toLocaleString());
        }
      })
      .catch(function () { /* stay silent on failure */ });
  }

  // --- Flag Counter: visible per-country flags + counts in the footer ---
  // Flag Counter needs a code tied to YOUR counter. Generate one (1 min) at
  // https://flagcounter.com  -> pick a style -> "Get your flag counter" ->
  // copy the code from the image URL: https://s01.flagcounter.com/count2/<CODE>/...
  // Paste that <CODE> below. Until it's set, the flag widget is skipped so
  // nothing broken shows on the page.
  var FLAG_COUNTER_CODE = "aQzp";             // your Flag Counter code
  var FLAG_COUNTER_SERVER = "s01";            // shown in your Flag Counter URL
  // Style params copied from your generated Flag Counter embed.
  var FLAG_COUNTER_STYLE =
    "bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/" +
    "viewers_0/labels_0/pageviews_0/flags_0/percent_0/";

  function addFlagCounter() {
    if (!FLAG_COUNTER_CODE) return;           // not configured yet
    var footer =
      document.querySelector('footer[role="contentinfo"]') ||
      document.querySelector("footer");
    if (!footer || footer.querySelector(".flag-counter")) return;

    var wrap = document.createElement("div");
    wrap.className = "flag-counter";
    wrap.style.cssText = "text-align:center; margin-top:0.8rem;";

    var link = document.createElement("a");
    link.href =
      "https://info.flagcounter.com/" + FLAG_COUNTER_CODE;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = "Free counters and visitor flags";

    var img = document.createElement("img");
    img.src =
      "https://" + FLAG_COUNTER_SERVER + ".flagcounter.com/count2/" +
      FLAG_COUNTER_CODE + "/" + FLAG_COUNTER_STYLE;
    img.alt = "Flag Counter";
    img.loading = "lazy";
    img.style.cssText = "max-width:100%; height:auto; border:0;";

    link.appendChild(img);
    wrap.appendChild(link);
    footer.appendChild(wrap);
  }

  function initFooterWidgets() {
    loadVisitorCount();
    addFlagCounter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFooterWidgets);
  } else {
    initFooterWidgets();
  }
})();
