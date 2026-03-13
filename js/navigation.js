(function () {
  const nav = document.querySelector(".terminal-nav");

  function syncNavHeightVar() {
    if (!nav) return;
    const h = Math.max(44, nav.offsetHeight || 44);
    document.documentElement.style.setProperty("--nav-height", `${h}px`);
  }

  const navLinks = document.querySelectorAll(".terminal-nav-link[data-target]");
  const sections = Array.from(navLinks)
    .map((link) => {
      const selector = link.getAttribute("data-target");
      if (!selector) return null;
      const el = document.querySelector(selector);
      return el ? { id: selector, el, link } : null;
    })
    .filter(Boolean);

  if (!navLinks.length || !sections.length) {
    syncNavHeightVar();
    return;
  }

  function setActiveLink(targetId) {
    navLinks.forEach((link) => {
      const id = link.getAttribute("data-target");
      if (id === targetId) {
        link.classList.add("is-active");
      } else {
        link.classList.remove("is-active");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = link.getAttribute("data-target");
      if (!target) return;
      const section = document.querySelector(target);
      if (!section) return;
      event.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const rect = section.getBoundingClientRect();
      const offsetTop = window.scrollY + rect.top - navHeight - 12;

      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setActiveLink(target);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const match = sections.find((s) => s.el === entry.target);
        if (match) {
          setActiveLink(match.id);
        }
      });
    },
    {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0.2,
    }
  );

  sections.forEach((s) => observer.observe(s.el));

  syncNavHeightVar();
  window.addEventListener("resize", syncNavHeightVar, { passive: true });
  window.addEventListener("orientationchange", syncNavHeightVar, { passive: true });
})();
