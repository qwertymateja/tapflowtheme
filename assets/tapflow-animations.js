/**
 * Tapflow scroll reveal — IntersectionObserver based.
 * Adds .is-visible to .tf-reveal elements when they enter viewport.
 * Respects prefers-reduced-motion.
 */
(function () {
  if (typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.tf-reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    // Fallback for very old browsers — just show everything.
    document.querySelectorAll('.tf-reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1,
    }
  );

  function init() {
    document.querySelectorAll('.tf-reveal:not(.is-visible)').forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-scan when Shopify section editor injects new content
  document.addEventListener('shopify:section:load', init);
})();
