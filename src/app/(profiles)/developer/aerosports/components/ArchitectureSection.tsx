"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { architectureEdges, architectureNodes } from "../data";
import { SectionHeader } from "./SectionHeader";
import type { ArchitectureEdge } from "../types";

type RenderedArchitectureEdge = ArchitectureEdge & {
  path: string;
  labelX: number;
  labelY: number;
  points: Array<{ x: number; y: number }>;
};

export function ArchitectureSection() {
  const [activeArchitectureNode, setActiveArchitectureNode] = useState<
    string | null
  >(null);
  const [hoveredArchitectureNode, setHoveredArchitectureNode] = useState<
    string | null
  >(null);
  const [isDesktopArchitecture, setIsDesktopArchitecture] = useState(false);
  const [renderedArchitectureEdges, setRenderedArchitectureEdges] = useState<
    RenderedArchitectureEdge[]
  >([]);
  const architectureDiagramRef = useRef<HTMLDivElement | null>(null);
  const architectureNodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rafMeasureRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktopArchitecture(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const scheduleArchitectureMeasure = () => {
    if (rafMeasureRef.current) {
      cancelAnimationFrame(rafMeasureRef.current);
    }
    rafMeasureRef.current = requestAnimationFrame(() => {
      rafMeasureRef.current = null;
      const container = architectureDiagramRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const padding = 12;
      const nodeRects = Object.entries(architectureNodeRefs.current)
        .map(([id, element]) => {
          if (!element) return null;
          const target =
            element.querySelector<HTMLElement>("[data-arch-node]") || element;
          const rect = target.getBoundingClientRect();
          return {
            id,
            left: rect.left - containerRect.left - padding,
            right: rect.right - containerRect.left + padding,
            top: rect.top - containerRect.top - padding,
            bottom: rect.bottom - containerRect.top + padding,
            width: rect.width,
            height: rect.height,
            centerX: rect.left - containerRect.left + rect.width / 2,
            centerY: rect.top - containerRect.top + rect.height / 2,
          };
        })
        .filter((rect): rect is NonNullable<typeof rect> => rect !== null);

      const rows = [...nodeRects]
        .sort((a, b) => a.top - b.top)
        .reduce<{ top: number; bottom: number }[]>((acc, rect) => {
          const last = acc[acc.length - 1];
          if (!last || rect.top - last.bottom > 24) {
            acc.push({ top: rect.top, bottom: rect.bottom });
          } else {
            last.bottom = Math.max(last.bottom, rect.bottom);
          }
          return acc;
        }, []);

      const cols = [...nodeRects]
        .sort((a, b) => a.left - b.left)
        .reduce<{ left: number; right: number }[]>((acc, rect) => {
          const last = acc[acc.length - 1];
          if (!last || rect.left - last.right > 24) {
            acc.push({ left: rect.left, right: rect.right });
          } else {
            last.right = Math.max(last.right, rect.right);
          }
          return acc;
        }, []);

      const horizontalGutters = rows
        .slice(0, -1)
        .map((row, index) => (row.bottom + rows[index + 1].top) / 2);
      const verticalGutters = cols
        .slice(0, -1)
        .map((col, index) => (col.right + cols[index + 1].left) / 2);

      const safeHorizontalGutters = [
        containerRect.height * 0.04,
        ...horizontalGutters,
        containerRect.height * 0.96,
      ];
      const safeVerticalGutters = [
        containerRect.width * 0.04,
        ...verticalGutters,
        containerRect.width * 0.96,
      ];

      const intersectsSegment = (
        rects: typeof nodeRects,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
      ) => {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        return rects.some(
          (rect) =>
            maxX >= rect.left &&
            minX <= rect.right &&
            maxY >= rect.top &&
            minY <= rect.bottom,
        );
      };

      const routeWithGutters = (
        start: { x: number; y: number },
        end: { x: number; y: number },
        useVertical: boolean,
      ) => {
        const gutters = useVertical ? safeVerticalGutters : safeHorizontalGutters;
        const sorted = [...gutters].sort((a, b) =>
          Math.abs(a - (useVertical ? start.x : start.y)) -
            Math.abs(b - (useVertical ? start.x : start.y)),
        );

        for (const gutter of sorted) {
          const p1 = start;
          const p2 = useVertical
            ? { x: gutter, y: start.y }
            : { x: start.x, y: gutter };
          const p3 = useVertical
            ? { x: gutter, y: end.y }
            : { x: end.x, y: gutter };
          const p4 = end;

          if (
            !intersectsSegment(nodeRects, p1.x, p1.y, p2.x, p2.y) &&
            !intersectsSegment(nodeRects, p2.x, p2.y, p3.x, p3.y) &&
            !intersectsSegment(nodeRects, p3.x, p3.y, p4.x, p4.y)
          ) {
            return [p1, p2, p3, p4];
          }
        }

        return [start, end];
      };

      const buildPath = (points: Array<{ x: number; y: number }>) => {
        if (points.length <= 1) return "";
        const radius = 12;
        let path = `M ${points[0].x} ${points[0].y}`;

        for (let i = 1; i < points.length; i += 1) {
          const prev = points[i - 1];
          const curr = points[i];
          if (i < points.length - 1) {
            const next = points[i + 1];
            const dx1 = curr.x - prev.x;
            const dy1 = curr.y - prev.y;
            const dx2 = next.x - curr.x;
            const dy2 = next.y - curr.y;
            const len1 = Math.hypot(dx1, dy1);
            const len2 = Math.hypot(dx2, dy2);
            const r = Math.min(radius, len1 / 2, len2 / 2);
            const dir1X = dx1 / (len1 || 1);
            const dir1Y = dy1 / (len1 || 1);
            const dir2X = dx2 / (len2 || 1);
            const dir2Y = dy2 / (len2 || 1);
            const cornerStartX = curr.x - dir1X * r;
            const cornerStartY = curr.y - dir1Y * r;
            const cornerEndX = curr.x + dir2X * r;
            const cornerEndY = curr.y + dir2Y * r;
            path += ` L ${cornerStartX} ${cornerStartY} Q ${curr.x} ${curr.y} ${cornerEndX} ${cornerEndY}`;
          } else {
            path += ` L ${curr.x} ${curr.y}`;
          }
        }

        return path;
      };

      const estimateLabelWidth = (label: string) =>
        Math.max(52, Math.min(120, label.length * 6.8 + 24));

      const labelIntersectsNode = (
        labelRect: { left: number; right: number; top: number; bottom: number },
      ) =>
        nodeRects.some(
          (rect) =>
            labelRect.right >= rect.left &&
            labelRect.left <= rect.right &&
            labelRect.bottom >= rect.top &&
            labelRect.top <= rect.bottom,
        );

      const buildLabelPoint = (
        point: { x: number; y: number },
        nextPoint: { x: number; y: number },
        label: string,
        perpendicularOffset = 12,
      ) => {
        const dx = nextPoint.x - point.x;
        const dy = nextPoint.y - point.y;
        const length = Math.hypot(dx, dy) || 1;
        const normalX = (-dy / length) * perpendicularOffset;
        const normalY = (dx / length) * perpendicularOffset;
        const labelX = point.x + normalX;
        const labelY = point.y + normalY;
        const width = estimateLabelWidth(label);
        const height = 24;
        const rect = {
          left: labelX - width / 2,
          right: labelX + width / 2,
          top: labelY - height / 2,
          bottom: labelY + height / 2,
        };

        if (labelIntersectsNode(rect)) return null;
        return { labelX, labelY, width, height };
      };

      const getPointAlongPath = (
        points: Array<{ x: number; y: number }>,
        fraction: number,
      ) => {
        const segments = points.slice(1).map((point, index) => {
          const start = points[index];
          const length = Math.hypot(point.x - start.x, point.y - start.y);
          return { start, end: point, length };
        });

        const totalLength = segments.reduce((sum, seg) => sum + seg.length, 0);
        const target = totalLength * fraction;
        let travelled = 0;

        for (const segment of segments) {
          if (travelled + segment.length >= target) {
            const ratio =
              segment.length === 0 ? 0 : (target - travelled) / segment.length;
            return {
              point: {
                x: segment.start.x + (segment.end.x - segment.start.x) * ratio,
                y: segment.start.y + (segment.end.y - segment.start.y) * ratio,
              },
              nextPoint: segment.end,
            };
          }
          travelled += segment.length;
        }

        const last = points[points.length - 1] ?? { x: 0, y: 0 };
        return { point: last, nextPoint: last };
      };

      const seenEdges = new Set<string>();
      const uniqueEdges = architectureEdges.filter((edge) => {
        const key = [edge.from, edge.to].sort().join("--");
        if (seenEdges.has(key)) return false;
        seenEdges.add(key);
        return true;
      });

      const nextEdges: RenderedArchitectureEdge[] = uniqueEdges
        .map((edge) => {
          const fromElement = architectureNodeRefs.current[edge.from];
          const toElement = architectureNodeRefs.current[edge.to];
          if (!fromElement || !toElement) return null;
          const fromTarget =
            fromElement.querySelector<HTMLElement>("[data-arch-node]") ||
            fromElement;
          const toTarget =
            toElement.querySelector<HTMLElement>("[data-arch-node]") || toElement;
          const fromRect = fromTarget.getBoundingClientRect();
          const toRect = toTarget.getBoundingClientRect();

          const fromCenterX =
            fromRect.left - containerRect.left + fromRect.width / 2;
          const fromCenterY =
            fromRect.top - containerRect.top + fromRect.height / 2;
          const toCenterX = toRect.left - containerRect.left + toRect.width / 2;
          const toCenterY = toRect.top - containerRect.top + toRect.height / 2;
          const deltaX = toCenterX - fromCenterX;
          const deltaY = toCenterY - fromCenterY;

          const start = {
            x: fromCenterX,
            y: fromCenterY,
          };

          const tempEnd = {
            x: toCenterX,
            y: toCenterY,
          };

          const useVerticalGutter = Math.abs(deltaX) > Math.abs(deltaY);
          const routedPoints = routeWithGutters(start, tempEnd, useVerticalGutter);
          routedPoints[0] = start;
          routedPoints[routedPoints.length - 1] = tempEnd;
          const path = buildPath(routedPoints);

          const fractions = [0.5, 0.4, 0.6, 0.3, 0.7, 0.2, 0.8];
          let labelX: number | null = null;
          let labelY: number | null = null;

          for (const fraction of fractions) {
            const { point, nextPoint } = getPointAlongPath(
              routedPoints,
              fraction,
            );
            const candidateLabel = buildLabelPoint(
              point,
              nextPoint,
              edge.label,
            );
            if (candidateLabel) {
              labelX = candidateLabel.labelX;
              labelY = candidateLabel.labelY;
              break;
            }
          }

          if (labelX === null || labelY === null) {
            const { point, nextPoint } = getPointAlongPath(routedPoints, 0.5);
            const fallback = buildLabelPoint(point, nextPoint, edge.label, 18);
            if (fallback) {
              labelX = fallback.labelX;
              labelY = fallback.labelY;
            }
          }

          return {
            ...edge,
            path,
            labelX: labelX ?? -9999,
            labelY: labelY ?? -9999,
            points: routedPoints,
          };
        })
        .filter((edge): edge is RenderedArchitectureEdge => edge !== null);

      setRenderedArchitectureEdges(nextEdges);
    });
  };

  useLayoutEffect(() => {
    if (!isDesktopArchitecture) {
      setRenderedArchitectureEdges([]);
      return;
    }

    scheduleArchitectureMeasure();
  }, [isDesktopArchitecture]);

  useEffect(() => {
    if (!isDesktopArchitecture) return;

    const container = architectureDiagramRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      scheduleArchitectureMeasure();
    });

    resizeObserver.observe(container);
    window.addEventListener("resize", scheduleArchitectureMeasure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleArchitectureMeasure);
    };
  }, [isDesktopArchitecture]);

  useEffect(() => {
    if (!activeArchitectureNode) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveArchitectureNode(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeArchitectureNode]);

  const getArchitectureFocusNode = () =>
    activeArchitectureNode || hoveredArchitectureNode;

  const isArchitectureEdgeHighlighted = (
    from: string,
    to: string,
    focusNode?: string | null,
  ) => {
    const active = focusNode ?? getArchitectureFocusNode();
    if (!active) return false;
    return active === from || active === to;
  };

  const getArchitectureHighlightedNodes = (focusNode: string | null) => {
    if (!focusNode) return new Set<string>();
    const related = new Set<string>([focusNode]);
    architectureEdges.forEach((edge) => {
      if (edge.from === focusNode) related.add(edge.to);
      if (edge.to === focusNode) related.add(edge.from);
    });
    return related;
  };

  const activeArchitectureDetails = architectureNodes.find(
    (node) => node.id === activeArchitectureNode,
  );

  return (
    <section id="architecture" className="mt-20 scroll-mt-28 space-y-6">
      <SectionHeader
        eyebrow="Architecture Snapshot"
        title="How the system fits together"
        description="A high-level view of how the backend, kiosk, game engine, and room hardware work together across a private network."
      />

      <div className="flex flex-wrap gap-2">
        {["On-prem server", "Token-based API access", "UDP + COM ports"].map(
          (chip) => (
            <Card
              key={chip}
              variant="chip"
              className="px-3 py-1 text-xs text-black/65"
            >
              {chip}
            </Card>
          ),
        )}
      </div>

      <Card
        variant="surface"
        className="rounded-4xl p-5 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.45)] sm:p-7"
      >
        <div className="relative">
          <div
            ref={architectureDiagramRef}
            className="grid justify-items-start gap-3 lg:grid-cols-12 lg:gap-x-4 lg:gap-y-8"
          >
            {architectureNodes.map((node) => {
              const focusNode = getArchitectureFocusNode();
              const highlightedNodes = getArchitectureHighlightedNodes(focusNode);
              const isHighlighted = highlightedNodes.has(node.id);
              const isDimmed = Boolean(focusNode && !isHighlighted);
              const isActive = activeArchitectureNode === node.id;
              const sizeClassById: Record<string, string> = {
                admin: "w-full lg:w-auto lg:max-w-[240px]",
                pos: "w-full lg:w-auto lg:max-w-[240px]",
                registration: "w-full lg:w-auto lg:max-w-[280px]",
                engine: "w-full lg:w-auto lg:max-w-[280px]",
                handlers: "w-full lg:w-auto lg:max-w-[280px]",
                comHardware: "w-full lg:w-auto lg:max-w-[280px]",
                iot: "w-full lg:w-auto lg:max-w-[320px]",
                sensors: "w-full lg:w-auto lg:max-w-[320px]",
                mssql: "w-full lg:w-auto lg:max-w-[340px]",
                api: "w-full lg:w-auto lg:max-w-[340px]",
              };
              const sizeClass = node.dominant
                ? "w-full lg:max-w-[720px]"
                : sizeClassById[node.id] ?? "w-full lg:w-auto lg:max-w-[280px]";

              return (
                <div
                  key={node.id}
                  ref={(element) => {
                    architectureNodeRefs.current[node.id] = element;
                  }}
                  className={`relative ${node.desktopClassName} ${
                    isActive
                      ? "z-50"
                      : focusNode
                        ? isHighlighted
                          ? "z-40"
                          : "z-10"
                        : "z-10"
                  }`}
                  onMouseEnter={() => setHoveredArchitectureNode(node.id)}
                  onMouseLeave={() => setHoveredArchitectureNode(null)}
                  onFocusCapture={() => setHoveredArchitectureNode(node.id)}
                  onBlurCapture={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                      )
                    ) {
                      setHoveredArchitectureNode(null);
                    }
                  }}
                >
                  <Card
                    as="button"
                    type="button"
                    data-arch-node
                    onClick={() =>
                      setActiveArchitectureNode((prev) =>
                        prev === node.id ? null : node.id,
                      )
                    }
                    aria-haspopup="dialog"
                    aria-expanded={activeArchitectureNode === node.id}
                    className={`${sizeClass} min-h-18 text-left transition ${
                      node.dominant ? "rounded-[28px] p-5" : "p-4"
                    } ${
                      isHighlighted
                        ? "border-black/55 shadow-lg"
                        : "hover:border-black/30"
                    } ${isDimmed ? "opacity-50" : ""}`}
                  >
                    <p
                      className={`font-semibold text-black ${
                        node.dominant ? "text-base" : "text-sm"
                      }`}
                    >
                      {node.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-black/65">
                      {node.subtitle}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>

          {isDesktopArchitecture ? (
            <>
              <svg
                className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
                aria-hidden="true"
              >
                {renderedArchitectureEdges.map((edge) => {
                  const focusNode = getArchitectureFocusNode();
                  const highlighted = isArchitectureEdgeHighlighted(
                    edge.from,
                    edge.to,
                    focusNode ?? undefined,
                  );
                  const dimmed = Boolean(focusNode && !highlighted);

                  return (
                    <path
                      key={`${edge.from}-${edge.to}-base`}
                      d={edge.path}
                      fill="none"
                      stroke={
                        dimmed
                          ? "rgba(45,36,24,0.2)"
                          : "rgba(45,36,24,0.7)"
                      }
                      strokeWidth={2.5}
                      strokeDasharray={edge.variant === "dashed" ? "6 4" : "0"}
                    />
                  );
                })}
              </svg>

              <svg
                className={`pointer-events-none absolute inset-0 hidden h-full w-full lg:block ${
                  activeArchitectureNode ? "z-30" : "z-15"
                }`}
                aria-hidden="true"
              >
                {renderedArchitectureEdges.map((edge) => {
                  const focusNode = getArchitectureFocusNode();
                  const highlighted = isArchitectureEdgeHighlighted(
                    edge.from,
                    edge.to,
                    focusNode ?? undefined,
                  );
                  if (!highlighted) return null;

                  return (
                    <path
                      key={`${edge.from}-${edge.to}-highlight`}
                      d={edge.path}
                      fill="none"
                      stroke="#2d2418"
                      strokeWidth={3.4}
                      strokeDasharray={edge.variant === "dashed" ? "6 4" : "0"}
                    />
                  );
                })}
              </svg>

              <div className="pointer-events-none absolute inset-0 z-35 hidden lg:block">
                {renderedArchitectureEdges.map((edge) => {
                  const focusNode = getArchitectureFocusNode();
                  const highlighted = isArchitectureEdgeHighlighted(
                    edge.from,
                    edge.to,
                    focusNode ?? undefined,
                  );
                  if (!focusNode || !highlighted) return null;
                  if (edge.labelX < 0 || edge.labelY < 0) return null;

                  return (
                    <div
                      key={`${edge.from}-${edge.to}-label`}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] shadow-sm"
                      style={{
                        left: edge.labelX,
                        top: edge.labelY,
                        backgroundColor: highlighted
                          ? "rgba(255,247,236,0.95)"
                          : "rgba(255,247,236,0.75)",
                        borderColor: highlighted
                          ? "rgba(45,36,24,0.65)"
                          : "rgba(45,36,24,0.25)",
                        color: highlighted
                          ? "rgba(45,36,24,0.95)"
                          : "rgba(45,36,24,0.7)",
                      }}
                    >
                      {edge.label}
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-black/10 pt-4 text-xs text-black/60">
          <span className="inline-flex items-center gap-1 rounded-full border border-black/20 px-3 py-1">
            <span>→</span> Solid = primary data/control flow
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-black/25 px-3 py-1">
            <span>⇢</span> Dashed = diagnostics/optional control
          </span>
        </div>
      </Card>

      {activeArchitectureDetails ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeArchitectureDetails.title} details`}
          onClick={() => setActiveArchitectureNode(null)}
        >
          <Card
            variant="surface"
            className="w-full max-w-xl rounded-[28px] border-black/10 p-5 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.6)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-black">
                  {activeArchitectureDetails.title}
                </p>
                <p className="mt-1 text-xs text-black/65">
                  {activeArchitectureDetails.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveArchitectureNode(null)}
                className="rounded-full border border-black/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 transition hover:border-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              >
                Close
              </button>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-black/70">
              {activeArchitectureDetails.details.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </ul>

            <div className="mt-4 border-t border-black/10 pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">
                Connections
              </p>
              <ul className="mt-2 space-y-1 text-sm text-black/65">
                {architectureEdges
                  .filter(
                    (edge) =>
                      edge.from === activeArchitectureDetails.id ||
                      edge.to === activeArchitectureDetails.id,
                  )
                  .map((edge) => {
                    const otherId =
                      edge.from === activeArchitectureDetails.id
                        ? edge.to
                        : edge.from;
                    const otherTitle =
                      architectureNodes.find((node) => node.id === otherId)
                        ?.title ?? otherId;
                    return `${otherTitle} (${edge.label})`;
                  })
                  .map((connection) => (
                    <li key={connection}>- {connection}</li>
                  ))}
              </ul>
            </div>
          </Card>
        </div>
      ) : null}
    </section>
  );
}
