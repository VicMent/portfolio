(function () {
  const nav = document.querySelector(".terminal-nav");
  const navMenu = document.getElementById("terminal-nav-menu");
  const navToggle = document.querySelector(".terminal-nav-toggle");

  function isMobileNav() {
    return window.matchMedia("(max-width: 640px)").matches;
  }

  function setMenuOpen(isOpen) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    // Sync immediately and again after layout settles.
    syncNavHeightVar();
    requestAnimationFrame(syncNavHeightVar);
    setTimeout(syncNavHeightVar, 0);
  }

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

      if (isMobileNav()) {
        setMenuOpen(false);
      }
    });
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      setMenuOpen(!isOpen);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav && nav.classList.contains("is-open")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (!nav || !isMobileNav()) return;
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(event.target)) return;
    setMenuOpen(false);
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

  if (nav && typeof ResizeObserver !== "undefined") {
    const navResizeObserver = new ResizeObserver(() => {
      syncNavHeightVar();
    });
    navResizeObserver.observe(nav);
  }

  syncNavHeightVar();
  window.addEventListener("resize", () => {
    if (!isMobileNav()) setMenuOpen(false);
    syncNavHeightVar();
  }, { passive: true });
  window.addEventListener("orientationchange", () => {
    if (!isMobileNav()) setMenuOpen(false);
    syncNavHeightVar();
  }, { passive: true });
})();
