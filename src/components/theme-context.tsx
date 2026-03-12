"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const THEME_STORAGE_KEY = "site-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function normalizeTheme(value: string | null): Theme | null {
  if (value === "light" || value === "dark") return value;
  return null;
}

function applyThemeToDom(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  root.dataset.theme = theme;
}

function resolveThemeFromEnvironment() {
  if (typeof window === "undefined") return "light" as Theme;

  const saved = normalizeTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
  if (saved) return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readThemeFromDom(): Theme | null {
  if (typeof document === "undefined") return null;
  return normalizeTheme(document.documentElement.dataset.theme ?? null);
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return readThemeFromDom() ?? resolveThemeFromEnvironment();
  });
  const [isReady, setIsReady] = useState(false);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    applyThemeToDom(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  useEffect(() => {
    const resolved = readThemeFromDom() ?? resolveThemeFromEnvironment();
    setThemeState(resolved);
    applyThemeToDom(resolved);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (normalizeTheme(saved)) {
      return;
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (!window.localStorage.getItem(THEME_STORAGE_KEY)) {
        const next = mq.matches ? "dark" : "light";
        setThemeState(next);
        applyThemeToDom(next);
      }
    };

    mq.addEventListener("change", onSystemChange);
    return () => mq.removeEventListener("change", onSystemChange);
  }, [isReady]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme: theme,
      setTheme,
      toggleTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
