// Reveals [data-reveal] elements as they scroll into view. Works with streamed
// markup: a MutationObserver picks up nodes added after load.
(function () {
  if (window.__mnReveal) return;
  window.__mnReveal = true;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.setAttribute('data-reveal', 'in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  function scan() {
    document.querySelectorAll('[data-reveal=""]').forEach(function (el) {
      if (el.__mnSeen) return;
      el.__mnSeen = true;
      io.observe(el);
    });
  }
  scan();
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', scan);
})();
