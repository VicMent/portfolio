(function () {
  const root = document.documentElement;
  const presetButtons = Array.from(document.querySelectorAll("[data-theme-preset]"));
  const defaultTheme = "glacier";
  const validThemes = new Set(["matrix", "ember", "glacier"]);

  if (!presetButtons.length) return;

  function setActivePreset(themeName) {
    const resolvedTheme = validThemes.has(themeName) ? themeName : defaultTheme;

    root.dataset.theme = resolvedTheme;

    window.localStorage.setItem("portfolio-theme", resolvedTheme);

    presetButtons.forEach((button) => {
      const isActive = button.dataset.themePreset === resolvedTheme;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  const initialTheme = root.dataset.theme || window.localStorage.getItem("portfolio-theme") || defaultTheme;
  setActivePreset(initialTheme);

  presetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActivePreset(button.dataset.themePreset || defaultTheme);
    });
  });
})();