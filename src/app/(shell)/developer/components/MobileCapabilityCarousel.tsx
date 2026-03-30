"use client";

import { ThemeImage } from "@/components/theme-image";

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

type MobileCapabilityCarouselProps = {
  items: CapabilityItem[];
};

export function MobileCapabilityCarousel({
  items,
}: MobileCapabilityCarouselProps) {
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
    <div className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 dark:text-white/45">
        Explore by capability
      </p>
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => handleSelect(item.filter)}
            className="relative w-[84%] shrink-0 snap-start overflow-hidden rounded-[28px] border border-black/10 bg-black/[0.03] p-4 text-left dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_28%,rgba(255,255,255,0.01)_58%,rgba(255,255,255,0)_100%),linear-gradient(90deg,rgba(255,255,255,0.74)_0%,rgba(255,255,255,0.42)_34%,rgba(255,255,255,0.12)_68%,rgba(255,255,255,0.04)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.02)_26%,rgba(255,255,255,0.01)_52%,rgba(255,255,255,0)_100%),linear-gradient(90deg,rgba(9,12,18,0.44)_0%,rgba(9,12,18,0.18)_38%,rgba(255,255,255,0.03)_72%,rgba(255,255,255,0.01)_100%)]" />
              <div className="absolute left-1/2 top-1/2 h-[140%] w-[84%] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] blur-[1.5px] dark:opacity-[0.09]">
                <ThemeImage
                  lightSrc={item.lightSrc}
                  darkSrc={item.darkSrc}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="space-y-2">
                <p className="text-base font-semibold text-black dark:text-white">
                  {item.title}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.stack.map((stackItem) => (
                    <span
                      key={stackItem}
                      className="rounded-full border border-black/10 bg-white/80 px-2 py-0.5 text-[10px] font-medium leading-4 text-black/65 dark:border-white/10 dark:bg-white/[0.08] dark:text-white/65"
                    >
                      {stackItem}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-deep)]">
                View projects →
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
