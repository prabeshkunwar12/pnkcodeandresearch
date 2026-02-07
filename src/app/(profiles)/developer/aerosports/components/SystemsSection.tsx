"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { systemsCards } from "../data";
import { SectionHeader } from "./SectionHeader";
import type { SystemsCard } from "../types";

export function SystemsSection() {
  const [activeSystem, setActiveSystem] = useState<SystemsCard | null>(null);
  const [activeSystemIndex, setActiveSystemIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!activeSystem) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveSystem(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveSystemIndex((prev) =>
          (prev + 1) % activeSystem.images.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveSystemIndex((prev) =>
          prev === 0 ? activeSystem.images.length - 1 : prev - 1,
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeSystem]);

  const openSystemDialog = (system: SystemsCard) => {
    setActiveSystem(system);
    setActiveSystemIndex(0);
  };

  const closeSystemDialog = () => {
    setActiveSystem(null);
    setActiveSystemIndex(0);
  };

  const nextSystemImage = () => {
    if (!activeSystem) return;
    setActiveSystemIndex((prev) => (prev + 1) % activeSystem.images.length);
  };

  const prevSystemImage = () => {
    if (!activeSystem) return;
    setActiveSystemIndex((prev) =>
      prev === 0 ? activeSystem.images.length - 1 : prev - 1,
    );
  };

  return (
    <section id="systems" className="mt-20 scroll-mt-28 space-y-8">
      <SectionHeader
        eyebrow="Full-Stack Systems"
        title="End-to-end software architecture for interactive game rooms"
        description="I built and maintained the complete software ecosystem that runs the facility — kiosk UI, scoreboards, signage, real-time communication with the game engine, API integration, device control, and staff tooling."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {systemsCards.map((item) => (
          <Card
            key={item.title}
            variant="surface"
            hover
            className="group relative min-h-65 overflow-hidden p-0"
          >
            <Image
              src={item.mainImage}
              alt={item.title}
              fill
              className="object-cover brightness-[0.65] contrast-105 transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/60 to-black/25" />
            <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/85">{item.desc}</p>
              <button
                type="button"
                onClick={() => openSystemDialog(item)}
                aria-label={`View more details for ${item.title}`}
                className="mt-4 inline-flex w-fit items-center rounded-full border border-white/45 bg-black/35 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/95 transition hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
              >
                View more
              </button>
            </div>
          </Card>
        ))}
      </div>


      {activeSystem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close system details dialog"
            onClick={closeSystemDialog}
          />
          <Card
            variant="surface"
            className="relative z-10 h-[88vh] w-full max-w-6xl overflow-y-auto rounded-[28px] border-white/20 bg-black/90 p-4 text-white sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeSystem.title} details`}
          >
            <button
              type="button"
              onClick={closeSystemDialog}
              className="absolute right-3 top-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Close
            </button>

            <h3 className="pr-14 text-xl font-semibold sm:text-2xl">
              {activeSystem.title}
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/80">
              {activeSystem.desc}
            </p>

            <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/20 bg-black">
              <div className="relative aspect-video">
                <Image
                  src={activeSystem.images[activeSystemIndex].src}
                  alt={activeSystem.images[activeSystemIndex].alt}
                  fill
                  className={`object-contain p-3 ${
                    reducedMotion ? "" : "transition-opacity duration-300"
                  }`}
                />

                <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white/90">
                  {activeSystemIndex + 1} / {activeSystem.images.length}
                </div>

                {activeSystem.images.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={prevSystemImage}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={nextSystemImage}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      →
                    </button>
                  </>
                ) : null}
              </div>
              <div className="border-t border-white/15 px-4 py-3 text-sm text-white/85">
                {activeSystem.images[activeSystemIndex].caption}
              </div>
            </div>

            {activeSystem.images.length > 1 ? (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {activeSystem.images.map((image, index) => (
                  <button
                    type="button"
                    key={image.src}
                    onClick={() => setActiveSystemIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      activeSystemIndex === index
                        ? "bg-white"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </Card>
        </div>
      ) : null}

    </section>
  );
}
