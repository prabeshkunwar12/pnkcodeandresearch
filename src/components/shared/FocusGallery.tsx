"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchDelta, setTouchDelta] = useState<{ x: number; y: number } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPointerDragging, setIsPointerDragging] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const pinchDistanceRef = useRef<number | null>(null);
  const pinchZoomRef = useRef(1);
  const panStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastTapRef = useRef(0);
  const suppressDoubleClickUntilRef = useRef(0);

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
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsMobileViewport(mediaQuery.matches);
    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);
    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lightboxIndex]);

  if (!items.length) return null;

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const shiftLightbox = (direction: "next" | "prev") => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return direction === "next"
        ? (prev + 1) % items.length
        : prev === 0
          ? items.length - 1
          : prev - 1;
    });
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const clampZoom = (value: number) => Math.min(4, Math.max(1, value));

  const toggleZoom = (nextZoom?: number) => {
    setZoom((current) => {
      const target = nextZoom ?? (current > 1 ? 1 : 2);
      const clamped = clampZoom(target);
      if (clamped === 1) setPan({ x: 0, y: 0 });
      return clamped;
    });
  };

  const onLightboxTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      const a = event.touches[0];
      const b = event.touches[1];
      pinchDistanceRef.current = Math.hypot(
        b.clientX - a.clientX,
        b.clientY - a.clientY,
      );
      pinchZoomRef.current = zoom;
      panStartRef.current = null;
      swipeStartRef.current = null;
      setIsPointerDragging(false);
      return;
    }

    const touch = event.touches[0];
    const now = Date.now();
    if (now - lastTapRef.current < 280) {
      event.preventDefault();
      toggleZoom(zoom === 1 ? 2 : 1);
      suppressDoubleClickUntilRef.current = now + 450;
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;

    if (zoom > 1) {
      panStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        panX: pan.x,
        panY: pan.y,
      };
      setIsPointerDragging(true);
      swipeStartRef.current = null;
      return;
    }

    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
    panStartRef.current = null;
  };

  const onLightboxTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2 && pinchDistanceRef.current) {
      event.preventDefault();
      const a = event.touches[0];
      const b = event.touches[1];
      const distance = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
      const ratio = distance / pinchDistanceRef.current;
      const nextZoom = clampZoom(pinchZoomRef.current * ratio);
      setZoom(nextZoom);
      if (nextZoom === 1) setPan({ x: 0, y: 0 });
      if (nextZoom === 1) setIsPointerDragging(false);
      return;
    }

    const touch = event.touches[0];
    if (zoom > 1 && panStartRef.current) {
      event.preventDefault();
      const deltaX = touch.clientX - panStartRef.current.x;
      const deltaY = touch.clientY - panStartRef.current.y;
      setPan({
        x: panStartRef.current.panX + deltaX,
        y: panStartRef.current.panY + deltaY,
      });
      return;
    }
  };

  const onLightboxTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length > 0) return;

    pinchDistanceRef.current = null;
    panStartRef.current = null;
    setIsPointerDragging(false);

    if (zoom > 1 || !swipeStartRef.current) {
      swipeStartRef.current = null;
      return;
    }

    const changedTouch = event.changedTouches[0];
    if (!changedTouch) {
      swipeStartRef.current = null;
      return;
    }

    const deltaX = changedTouch.clientX - swipeStartRef.current.x;
    const deltaY = changedTouch.clientY - swipeStartRef.current.y;
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

    if (isHorizontal && Math.abs(deltaX) > 46) {
      if (deltaX < 0) shiftLightbox("next");
      else shiftLightbox("prev");
    }

    swipeStartRef.current = null;
  };

  const onLightboxPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || zoom <= 1) return;
    event.preventDefault();
    panStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    setIsPointerDragging(true);
  };

  const onLightboxPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || zoom <= 1 || !panStartRef.current) return;
    event.preventDefault();
    const deltaX = event.clientX - panStartRef.current.x;
    const deltaY = event.clientY - panStartRef.current.y;
    setPan({
      x: panStartRef.current.panX + deltaX,
      y: panStartRef.current.panY + deltaY,
    });
  };

  const endPointerDrag = () => {
    panStartRef.current = null;
    setIsPointerDragging(false);
  };

  const onLightboxWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!event.ctrlKey) return;
    event.preventDefault();

    const delta = -event.deltaY * 0.0025;
    setZoom((current) => {
      const next = clampZoom(current + delta);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

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
          visible: true,
        };
      }

      if (abs === 1) {
        return {
          transform: `translate3d(calc(-50% ${offset < 0 ? "-" : "+"} min(28vw, 240px)), -50%, 0) scale(0.9)`,
          opacity: 0.72,
          filter: "blur(0px)",
          zIndex: 20,
          visible: true,
        };
      }

      if (abs === 2) {
        return {
          transform: `translate3d(calc(-50% ${offset < 0 ? "-" : "+"} min(46vw, 420px)), -50%, 0) scale(0.82)`,
          opacity: 0.3,
          filter: "blur(0px)",
          zIndex: 10,
          visible: true,
        };
      }

      return {
        transform: `translate3d(calc(-50% ${offset < 0 ? "-" : "+"} min(64vw, 620px)), -50%, 0) scale(0.76)`,
        opacity: 0,
        filter: "blur(0px)",
        zIndex: 0,
        visible: false,
      };
    }

    if (offset === 0) {
      return {
        transform: "translate3d(-50%, -50%, 0) scale(1) rotate(0deg)",
        opacity: 1,
        filter: "blur(0px)",
        zIndex: 30,
        visible: true,
      };
    }

    if (abs === 1) {
      return {
        transform: `translate3d(calc(-50% ${offset < 0 ? "-" : "+"} min(28vw, 250px)), -50%, 0) scale(0.84) rotate(${offset < 0 ? "-2deg" : "2deg"})`,
        opacity: 0.62,
        filter: "blur(3px)",
        zIndex: 20,
        visible: true,
      };
    }

    if (abs === 2) {
      return {
        transform: `translate3d(calc(-50% ${offset < 0 ? "-" : "+"} min(48vw, 430px)), -50%, 0) scale(0.68) rotate(${offset < 0 ? "-4deg" : "4deg"})`,
        opacity: 0.24,
        filter: "blur(5px)",
        zIndex: 10,
        visible: true,
      };
    }

    return {
      transform: `translate3d(calc(-50% ${offset < 0 ? "-" : "+"} min(68vw, 640px)), -50%, 0) scale(0.62) rotate(${offset < 0 ? "-5deg" : "5deg"})`,
      opacity: 0,
      filter: "blur(6px)",
      zIndex: 0,
      visible: false,
    };
  };

  const lightboxItem = lightboxIndex !== null ? items[lightboxIndex] : null;

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

      <div className="space-y-4 sm:hidden">
        <div className="-mx-3 overflow-x-auto px-3 pb-1">
          <div className="flex w-max gap-3 pr-3">
            {items.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => openLightbox(index)}
                className="w-[82vw] max-w-[320px] shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03] text-left dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative h-[220px] bg-black/[0.03] dark:bg-white/[0.03]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm leading-6 text-black/78 dark:text-white/78">
                    {item.caption ?? item.alt}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="relative hidden overflow-hidden rounded-2xl border border-black/10 bg-white/70 px-3 py-8 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-white/[0.04] sm:block sm:px-6 sm:py-10 lg:px-8 lg:py-12"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute left-3 top-3 z-30 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs font-medium tracking-[0.08em] text-white/90 backdrop-blur-sm sm:text-sm">
          {`${String(activeIndex + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`}
        </div>

        <div className="relative h-[420px] lg:h-[480px] xl:h-[520px]">
          {items.map((item, index) => {
            const offset = getRelativeOffset(index);
            const state = getCardState(offset);
            const isCenter = offset === 0;

            return (
              <button
                key={item.src}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  openLightbox(index);
                }}
                aria-label={`Open ${item.alt}`}
                className="absolute left-1/2 top-1/2 w-[62%] max-w-[520px] overflow-hidden rounded-2xl border border-black/10 bg-white/70 text-left dark:border-white/10 dark:bg-white/[0.04]"
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
                  pointerEvents: state.visible ? "auto" : "none",
                }}
              >
                <div className="relative flex h-[340px] items-center justify-center bg-black/[0.03] p-4 dark:bg-white/[0.03] lg:h-[400px]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="px-4 py-3 sm:px-5 sm:py-4">
                  <p className="text-sm font-medium leading-6 text-black/80 dark:text-white/80 sm:text-base">
                    {item.caption ?? item.alt}
                  </p>
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

      {lightboxItem ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/58 px-0 py-0 backdrop-blur-[3px] dark:bg-black/72 sm:px-4 sm:py-4">
          <button
            type="button"
            aria-label="Close image dialog"
            className="absolute inset-0"
            onClick={closeLightbox}
          />
          <div className="relative z-10 flex h-full w-full flex-col overflow-hidden bg-[color:var(--surface)] text-[color:var(--foreground)] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] dark:bg-[rgb(7,11,20)] sm:h-auto sm:max-h-[92vh] sm:max-w-6xl sm:rounded-2xl sm:border sm:border-black/10 dark:sm:border-white/10">
            <div className="relative border-b border-black/10 px-4 py-3 dark:border-white/10 sm:px-5">
              <p className="mx-auto max-w-3xl text-center text-sm leading-6 text-black/80 dark:text-white/82 sm:text-base">
                {lightboxItem.caption ?? lightboxItem.alt}
              </p>
              {!isMobileViewport ? (
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-[color:var(--surface-strong)] px-3 py-1.5 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-[color:var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:bg-white dark:!text-black dark:hover:bg-white/90 dark:focus-visible:ring-white/20 sm:right-5"
                >
                  Close
                </button>
              ) : null}
            </div>

            <div
              className="relative flex-1 overflow-hidden bg-black/[0.04] dark:bg-black/28"
              onTouchStart={onLightboxTouchStart}
              onTouchMove={onLightboxTouchMove}
              onTouchEnd={onLightboxTouchEnd}
              onPointerDown={onLightboxPointerDown}
              onPointerMove={onLightboxPointerMove}
              onPointerUp={endPointerDrag}
              onPointerCancel={endPointerDrag}
              onPointerLeave={endPointerDrag}
              onWheel={onLightboxWheel}
              style={{ touchAction: "none" }}
            >
              <div className="pointer-events-none absolute right-3 top-3 z-20 sm:right-5 sm:top-5">
                <div className="pointer-events-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setZoom((value) => Math.max(1, value - 0.25))}
                    className="rounded-full border border-black/10 bg-white/78 px-3 py-1.5 text-sm font-medium text-black/82 shadow-sm backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:bg-[rgba(12,18,30,0.72)] dark:text-white/88 dark:hover:bg-[rgba(18,26,42,0.88)] dark:focus-visible:ring-white/20"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setZoom(1);
                      setPan({ x: 0, y: 0 });
                    }}
                    className="rounded-full border border-black/10 bg-white/78 px-3 py-1.5 text-sm font-medium text-black/82 shadow-sm backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:bg-[rgba(12,18,30,0.72)] dark:text-white/88 dark:hover:bg-[rgba(18,26,42,0.88)] dark:focus-visible:ring-white/20"
                  >
                    {Math.round(zoom * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom((value) => Math.min(4, value + 0.25))}
                    className="rounded-full border border-black/10 bg-white/78 px-3 py-1.5 text-sm font-medium text-black/82 shadow-sm backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:bg-[rgba(12,18,30,0.72)] dark:text-white/88 dark:hover:bg-[rgba(18,26,42,0.88)] dark:focus-visible:ring-white/20"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex min-h-full min-w-full items-center justify-center p-3 sm:p-6">
                <div
                  className="relative h-[68vh] w-full max-w-5xl select-none transition-transform duration-200 ease-out sm:h-[72vh]"
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                    transformOrigin: "center center",
                    cursor: zoom > 1 ? (isPointerDragging ? "grabbing" : "grab") : "zoom-in",
                  }}
                  onDoubleClick={() => {
                    if (Date.now() < suppressDoubleClickUntilRef.current) return;
                    toggleZoom();
                  }}
                >
                  <Image
                    src={lightboxItem.src}
                    alt={lightboxItem.alt}
                    fill
                    className="object-contain"
                    draggable={false}
                  />
                </div>
              </div>

              {items.length > 1 ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center px-3 sm:bottom-5 sm:px-5">
                  <div className="pointer-events-auto flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => shiftLightbox("prev")}
                      className="rounded-full border border-black/10 bg-white/78 px-3 py-1.5 text-sm font-medium text-black/82 shadow-sm backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:bg-[rgba(12,18,30,0.72)] dark:text-white/88 dark:hover:bg-[rgba(18,26,42,0.88)] dark:focus-visible:ring-white/20"
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-2">
                      {items.map((item, index) => (
                        <button
                          key={`${item.src}-dot`}
                          type="button"
                          aria-label={`Go to image ${index + 1}`}
                          onClick={() => {
                            setLightboxIndex(index);
                            setZoom(1);
                            setPan({ x: 0, y: 0 });
                          }}
                          className={`h-2.5 w-2.5 rounded-full transition ${
                            index === lightboxIndex
                              ? "bg-black dark:bg-white"
                              : "bg-black/20 hover:bg-black/35 dark:bg-white/25 dark:hover:bg-white/45"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => shiftLightbox("next")}
                      className="rounded-full border border-black/10 bg-white/78 px-3 py-1.5 text-sm font-medium text-black/82 shadow-sm backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:bg-[rgba(12,18,30,0.72)] dark:text-white/88 dark:hover:bg-[rgba(18,26,42,0.88)] dark:focus-visible:ring-white/20"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-black/10 px-4 py-3 dark:border-white/10 sm:px-5">
              <div className="flex flex-col items-center gap-3 text-center">
                <p className="max-w-2xl text-xs leading-6 text-black/58 dark:text-white/65 sm:text-sm">
                  {isMobileViewport
                    ? "Pinch or double tap to zoom. Swipe to browse."
                    : "Double-click to zoom. Drag to pan when zoomed."}
                </p>
                {isMobileViewport ? (
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="rounded-full border border-black/10 bg-[color:var(--surface-strong)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-[color:var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:bg-white dark:!text-black dark:hover:bg-white/90 dark:focus-visible:ring-white/20"
                  >
                    Close
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
