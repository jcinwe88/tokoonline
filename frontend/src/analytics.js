// Google Analytics 4 (monitoring aktivitas pengguna)
const GA_ID = import.meta.env.VITE_GA_ID;

export function initAnalytics() {
  if (!GA_ID) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false }); // page view dikirim manual per halaman
}

export function trackPageView(path) {
  if (!GA_ID || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
}

export function trackEvent(name, params = {}) {
  if (!GA_ID || !window.gtag) return;
  window.gtag("event", name, params);
}
