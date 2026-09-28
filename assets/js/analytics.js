/*
 * Site analytics: Google Analytics 4 (GA4) + Microsoft Clarity + GoatCounter.
 * These run in the background and feed their private dashboards only.
 * No visible counters are rendered on the page.
 *   GA4 Measurement ID : G-K1119V8VKK
 *   Clarity Project ID : yp8i9hyxg2
 *   GoatCounter        : shubhamsharma.goatcounter.com
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

  // --- GoatCounter: records visits (private dashboard, no visible counter) ---
  var gc = document.createElement("script");
  gc.async = true;
  gc.src = "//gc.zgo.at/count.js";
  gc.setAttribute("data-goatcounter", "https://shubhamsharma.goatcounter.com/count");
  document.head.appendChild(gc);
})();
