"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ThemeImage } from "@/components/theme-image";
import { useThemeContext } from "@/components/theme-context";
import { resolveTechIcon } from "@/data/images";

type CapabilityItem = {
  title: string;
  stack: string[];
  lightSrc: string;
  darkSrc: string;
  filter:
    | "featured"
    | "all"
    | "frontend"
    | "backend"
    | "runtime"
    | "hardware"
    | "operations";
};

type DesktopCapabilityCardsRowProps = {
  items: CapabilityItem[];
  className?: string;
};

function cx(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function DesktopCapabilityCardsRow({
  items,
  className,
}: DesktopCapabilityCardsRowProps) {
  const { resolvedTheme } = useThemeContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSelect = (filter: CapabilityItem["filter"]) => {
    window.dispatchEvent(
      new CustomEvent("project-browser:set-filter", {
        detail: { sectionId: "projects", type: filter, tech: "all" },
      }),
    );

    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={cx("hidden gap-3 sm:grid", className)}>
      {items.map((item) => (
        <button
          key={item.title}
          type="button"
          onClick={() => handleSelect(item.filter)}
          className="relative overflow-hidden rounded-[24px] border border-black/10 bg-black/[0.03] p-3.5 text-center transition hover:border-black/20 hover:bg-black/[0.045] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20 dark:hover:bg-white/[0.06] lg:p-4"
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.2)_100%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_100%)]" />
            <div className="absolute left-1/2 top-1/2 h-[145%] w-[85%] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] blur-[1.5px] dark:opacity-[0.1]">
              <ThemeImage
                lightSrc={item.lightSrc}
                darkSrc={item.darkSrc}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="relative z-10 flex min-h-[124px] flex-col items-center justify-center space-y-3">
            <h3 className="text-sm font-semibold text-black dark:text-white lg:text-[15px]">
              {item.title}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {item.stack.map((stackItem) => (
                <TechGlyph
                  key={stackItem}
                  label={stackItem}
                  isDark={resolvedTheme === "dark"}
                  isMounted={isMounted}
                />
              ))}
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-deep)]">
              Explore projects →
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function TechGlyph({
  label,
  isDark,
  isMounted,
}: {
  label: string;
  isDark: boolean;
  isMounted: boolean;
}) {
  const resolved = resolveTechIcon(label);
  const iconSrc = isMounted
    ? isDark
      ? resolved.darkIconSrc ?? resolved.lightIconSrc ?? resolved.iconSrc
      : resolved.lightIconSrc ?? resolved.iconSrc
    : resolved.lightIconSrc ?? resolved.iconSrc;

  if (iconSrc) {
    return (
      <span
        title={label}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white/85 dark:border-white/10 dark:bg-white/[0.08]"
      >
        <Image
          src={iconSrc}
          alt={label}
          width={18}
          height={18}
          className="h-4.5 w-4.5 object-contain"
        />
      </span>
    );
  }

  return (
    <span className="text-[11px] font-medium text-black/60 dark:text-white/60">
      {label}
    </span>
  );
}
