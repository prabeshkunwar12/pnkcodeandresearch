"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { impactItems } from "../data";
import { SectionHeader } from "./SectionHeader";

export function ImpactSection() {
  const [activeImpactKey, setActiveImpactKey] = useState<string | null>(null);
  const activeImpact = impactItems.find((item) => item.key === activeImpactKey);

  useEffect(() => {
    if (!activeImpactKey) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImpactKey(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImpactKey]);

  return (
    <section
      id="impact"
      className="mt-16 w-full max-w-full min-w-0 space-y-6 sm:mt-20 sm:space-y-8"
    >
      <SectionHeader
        eyebrow="Impact"
        title="What this enabled"
        description="High-level outcomes from owning systems architecture, game integration, and launch execution."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {impactItems.map((item) => (
          <Card
            key={item.key}
            as="button"
            type="button"
            variant="surface"
            hover
            className="p-4 text-left sm:p-5"
            onClick={() =>
              setActiveImpactKey((prev) => (prev === item.key ? null : item.key))
            }
            aria-haspopup="dialog"
            aria-expanded={activeImpactKey === item.key}
          >
            <p className="text-base font-semibold text-black">{item.title}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
              {item.stat}
            </p>
          </Card>
        ))}
      </div>

      {activeImpact ? (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeImpact.title} details`}
          onClick={() => setActiveImpactKey(null)}
        >
          <Card
            variant="surface"
            className="w-full max-w-xl rounded-[28px] border-black/10 p-5 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.6)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-black">
                  {activeImpact.title}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
                  {activeImpact.stat}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveImpactKey(null)}
                className="rounded-full border border-black/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 transition hover:border-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              >
                Close
              </button>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-black/70">
              {activeImpact.details.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </ul>
          </Card>
        </div>
      ) : null}
    </section>
  );
}
