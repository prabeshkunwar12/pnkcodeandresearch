"use client";

import { useEffect, useState, type TouchEvent } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export type FocusGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

type FocusGalleryProps = {
  items: FocusGalleryItem[];
  title?: string;
  description?: string;
  metrics?: string[];
  className?: string;
  initialIndex?: number;
};

export function FocusGallery({
  items,
  title,
  description,
  metrics,
  className,
  initialIndex = 0,
}: FocusGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [captionVisible, setCaptionVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchDelta, setTouchDelta] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex, items]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);
    return () => mediaQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCaptionVisible(true);
      return;
    }

    setCaptionVisible(false);
    const frame = window.requestAnimationFrame(() => setCaptionVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex, prefersReducedMotion]);

  if (!items.length) return null;

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const activeItem = items[activeIndex];
  const counter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchDelta(null);
  };

  const onTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStart) return;
    const touch = event.touches[0];
    setTouchDelta({
      x: touch.clientX - touchStart.x,
      y: touch.clientY - touchStart.y,
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchDelta) {
      setTouchStart(null);
      setTouchDelta(null);
      return;
    }

    const horizontalDistance = touchDelta.x;
    const verticalDistance = touchDelta.y;
    const isHorizontal = Math.abs(horizontalDistance) > Math.abs(verticalDistance) * 1.2;

    if (isHorizontal && Math.abs(horizontalDistance) > 44) {
      if (horizontalDistance < 0) nextImage();
      else prevImage();
    }

    setTouchStart(null);
    setTouchDelta(null);
  };

  const getRelativeOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > items.length / 2) diff -= items.length;
    if (diff < -items.length / 2) diff += items.length;
    return diff;
  };

  const getCardState = (offset: number) => {
    const abs = Math.abs(offset);

    if (prefersReducedMotion) {
      if (offset === 0) {
        return {
          transform: "translate3d(-50%, -50%, 0) scale(1)",
          opacity: 1,
          filter: "blur(0px)",
          zIndex: 30,
          clickable: false,
        };
      }

      if (abs === 1) {
        return {
          transform: `translate3d(calc(-50% ${offset < 0 ? "-" : "+"} min(28vw, 240px)), -50%, 0) scale(0.9)`,
          opacity: 0.72,
          filter: "blur(0px)",
          zIndex: 20,
          clickable: true,
        };
      }

      if (abs === 2) {
        return {
          transform: `translate3d(calc(-50% ${offset < 0 ? "-" : "+"} min(46vw, 420px)), -50%, 0) scale(0.82)`,
          opacity: 0.3,
          filter: "blur(0px)",
          zIndex: 10,
          clickable: true,
        };
      }

      return {
        transform: `translate3d(calc(-50% ${offset < 0 ? "-" : "+"} min(64vw, 620px)), -50%, 0) scale(0.76)`,
        opacity: 0,
        filter: "blur(0px)",
        zIndex: 0,
        clickable: false,
      };
    }

    if (offset === 0) {
      return {
        transform: "translate3d(-50%, -50%, 0) scale(1) rotate(0deg)",
        opacity: 1,
        filter: "blur(0px)",
        zIndex: 30,
        clickable: false,
      };
    }

    if (abs === 1) {
      return {
        transform: `translate3d(calc(-50% ${offset < 0 ? "-" : "+"} min(28vw, 250px)), -50%, 0) scale(0.84) rotate(${offset < 0 ? "-2deg" : "2deg"})`,
        opacity: 0.62,
        filter: "blur(3px)",
        zIndex: 20,
        clickable: true,
      };
    }

    if (abs === 2) {
      return {
        transform: `translate3d(calc(-50% ${offset < 0 ? "-" : "+"} min(48vw, 430px)), -50%, 0) scale(0.68) rotate(${offset < 0 ? "-4deg" : "4deg"})`,
        opacity: 0.24,
        filter: "blur(5px)",
        zIndex: 10,
        clickable: true,
      };
    }

    return {
      transform: `translate3d(calc(-50% ${offset < 0 ? "-" : "+"} min(68vw, 640px)), -50%, 0) scale(0.62) rotate(${offset < 0 ? "-5deg" : "5deg"})`,
      opacity: 0,
      filter: "blur(6px)",
      zIndex: 0,
      clickable: false,
    };
  };

  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      {title ? (
        <h2 className="text-xl font-semibold text-black dark:text-white sm:text-2xl">
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="text-sm leading-6 text-black/70 dark:text-white/70 sm:text-base">
          {description}
        </p>
      ) : null}

      {metrics?.length ? (
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric}
              className="rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm font-medium text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
            >
              {metric}
            </div>
          ))}
        </div>
      ) : null}

      <div
        className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 px-3 py-8 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-white/[0.04] sm:px-6 sm:py-10 lg:px-8 lg:py-12"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute left-3 top-3 z-30 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs font-medium tracking-[0.08em] text-white/90 backdrop-blur-sm sm:text-sm">
          {counter}
        </div>

        <div className="relative h-[360px] sm:h-[420px] lg:h-[480px] xl:h-[520px]">
          {items.map((item, index) => {
            const offset = getRelativeOffset(index);
            const state = getCardState(offset);
            const isCenter = offset === 0;

            return (
              <button
                key={item.src}
                type="button"
                onClick={
                  state.clickable
                    ? () => {
                        if (offset < 0) prevImage();
                        else nextImage();
                      }
                    : undefined
                }
                aria-label={state.clickable ? `View ${item.alt}` : `Current image ${item.alt}`}
                className={`absolute left-1/2 top-1/2 w-[62%] max-w-[520px] overflow-hidden rounded-2xl border border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/[0.04] ${state.clickable ? "cursor-pointer" : "cursor-default"}`}
                style={{
                  transition: prefersReducedMotion
                    ? "transform 220ms ease, opacity 220ms ease"
                    : "transform 560ms cubic-bezier(0.22, 1, 0.36, 1), opacity 560ms cubic-bezier(0.22, 1, 0.36, 1), filter 560ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 560ms cubic-bezier(0.22, 1, 0.36, 1)",
                  transform: state.transform,
                  opacity: state.opacity,
                  filter: state.filter,
                  zIndex: state.zIndex,
                  boxShadow: isCenter
                    ? "0 25px 60px -30px rgba(0,0,0,0.45)"
                    : Math.abs(offset) === 1
                      ? "0 12px 36px -28px rgba(0,0,0,0.35)"
                      : "0 0 0 rgba(0,0,0,0)",
                  pointerEvents: state.clickable || isCenter ? "auto" : "none",
                }}
              >
                <div className="relative flex h-[300px] items-center justify-center bg-black/[0.03] p-4 dark:bg-white/[0.03] sm:h-[340px] lg:h-[400px]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-3 bottom-3 z-30 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs text-black/80 backdrop-blur-sm transition hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:bg-white/[0.08] dark:text-white/85 dark:hover:bg-white/[0.14] dark:focus-visible:ring-white/20"
            >
              ←
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-3 bottom-3 z-30 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs text-black/80 backdrop-blur-sm transition hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:bg-white/[0.08] dark:text-white/85 dark:hover:bg-white/[0.14] dark:focus-visible:ring-white/20"
            >
              →
            </button>
          </>
        ) : null}
      </div>

      <Card
        variant="surface"
        className="rounded-2xl border-black/10 bg-white/70 px-4 py-3 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.2)] dark:border-white/10 dark:bg-white/[0.04] sm:px-5 sm:py-4"
      >
        <p
          className="text-sm font-medium leading-6 text-black/80 transition-all duration-500 dark:text-white/80 sm:text-base motion-reduce:transition-none"
          style={{
            opacity: captionVisible ? 1 : 0.55,
            transform: prefersReducedMotion
              ? "translateY(0px)"
              : captionVisible
                ? "translateY(0px)"
                : "translateY(4px)",
          }}
        >
          {activeItem.caption ?? activeItem.alt}
        </p>
      </Card>
    </div>
  );
}
