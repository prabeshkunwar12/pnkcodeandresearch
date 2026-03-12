"use client";

import { useEffect, useState } from "react";
import { useThemeContext } from "@/components/theme-context";

type ThemeImageProps = {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  className?: string;
};

export function ThemeImage({ lightSrc, darkSrc, alt, className }: ThemeImageProps) {
  const { resolvedTheme } = useThemeContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <img src={lightSrc} alt={alt} className={className} />;
  }

  return <img src={resolvedTheme === "dark" ? darkSrc : lightSrc} alt={alt} className={className} />;
}
