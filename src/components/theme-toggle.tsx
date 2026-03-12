"use client";

import { useEffect, useState } from "react";
import { useThemeContext } from "@/components/theme-context";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useThemeContext();
  const [isMounted, setIsMounted] = useState(false);
  const isDark = isMounted && resolvedTheme === "dark";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--foreground)] transition hover:bg-[color:var(--chip)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground)]/40"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="4" />
      <path d="M10 3.2V1.2M10 18.8v-2M3.5 10H1.4M18.6 10H16.5M15 5l1.4-1.4M3.6 16.4 5 15M15 15l1.4 1.4M3.6 3.6 5 5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 12.5A6.5 6.5 0 1 1 8.5 3.4a5 5 0 1 0 7.5 9.1A6.5 6.5 0 0 1 16 12.5Z" />
    </svg>
  );
}
