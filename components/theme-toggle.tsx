"use client";

import { useEffect, useRef } from "react";

function currentTheme(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function describe(theme: "light" | "dark") {
  return theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
}

export function ThemeToggle() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = ref.current;
    if (!button) return;
    const theme = currentTheme();
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.setAttribute("aria-label", describe(theme));
  }, []);

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
    ref.current?.setAttribute("aria-pressed", String(next === "dark"));
    ref.current?.setAttribute("aria-label", describe(next));
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-pressed="true"
      aria-label="Switch to light theme"
      className="btn font-mono"
    >
      <span className="when-light">Dark</span>
      <span className="when-dark">Light</span>
    </button>
  );
}
