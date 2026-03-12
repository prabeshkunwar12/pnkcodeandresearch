"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ProjectArchitectureEdge, ProjectArchitectureMap as ProjectArchitectureMapType } from "../data";
import { projectPageTypography as type } from "./project-page-typography";

type ArchitectureMapProps = {
  architecture: ProjectArchitectureMapType;
};

type RenderedEdge = ProjectArchitectureEdge & {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  labelX: number;
  labelY: number;
};

export function ArchitectureMap({ architecture }: ArchitectureMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [renderedEdges, setRenderedEdges] = useState<RenderedEdge[]>([]);

  const rows = architecture.nodes.reduce<Map<number, ProjectArchitectureMapType["nodes"]>>(
    (acc, node) => {
      const row = node.row ?? 1;
      const existing = acc.get(row) ?? [];
      existing.push(node);
      acc.set(row, existing);
      return acc;
    },
    new Map(),
  );

  const orderedRows = [...rows.entries()].sort(([a], [b]) => a - b);

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const positions = architecture.nodes
        .map((node) => {
          const element = nodeRefs.current[node.id];
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return {
            id: node.id,
            left: rect.left - containerRect.left,
            top: rect.top - containerRect.top,
            width: rect.width,
            height: rect.height,
            centerX: rect.left - containerRect.left + rect.width / 2,
            centerY: rect.top - containerRect.top + rect.height / 2,
          };
        })
        .filter((position): position is NonNullable<typeof position> => position !== null);

      const nextEdges = architecture.edges
        .map((edge) => {
          const from = positions.find((position) => position.id === edge.from);
          const to = positions.find((position) => position.id === edge.to);
          if (!from || !to) return null;

          const dx = to.centerX - from.centerX;
          const dy = to.centerY - from.centerY;
          const length = Math.hypot(dx, dy) || 1;
          const unitX = dx / length;
          const unitY = dy / length;

          const fromInset = Math.min(from.width, from.height) * 0.36;
          const toInset = Math.min(to.width, to.height) * 0.36;

          const x1 = from.centerX + unitX * fromInset;
          const y1 = from.centerY + unitY * fromInset;
          const x2 = to.centerX - unitX * toInset;
          const y2 = to.centerY - unitY * toInset;

          const normalX = -unitY;
          const normalY = unitX;
          const labelOffset = Math.abs(dx) > Math.abs(dy) ? 18 : 14;

          return {
            ...edge,
            x1,
            y1,
            x2,
            y2,
            labelX:
              (x1 + x2) / 2 + normalX * labelOffset + (edge.labelOffsetX ?? 0),
            labelY:
              (y1 + y2) / 2 + normalY * labelOffset + (edge.labelOffsetY ?? 0),
          };
        })
        .filter((edge): edge is RenderedEdge => edge !== null);

      setRenderedEdges(nextEdges);
    };

    measure();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => measure())
        : null;

    if (resizeObserver && containerRef.current) {
      resizeObserver.observe(containerRef.current);
      architecture.nodes.forEach((node) => {
        const element = nodeRefs.current[node.id];
        if (element) resizeObserver.observe(element);
      });
    }

    window.addEventListener("resize", measure);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [architecture]);

  useEffect(() => {
    setRenderedEdges([]);
  }, [architecture]);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        {architecture.title ? <h2 className={type.sectionTitle}>{architecture.title}</h2> : null}
        {architecture.description ? (
          <p className={type.sectionIntro}>{architecture.description}</p>
        ) : null}
      </div>

      {architecture.badges?.length ? (
        <div className="flex flex-wrap gap-2">
          {architecture.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-black/65 dark:border-white/10 dark:bg-white/5 dark:text-white/65"
            >
              {badge}
            </span>
          ))}
        </div>
      ) : null}

      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl border border-black/10 bg-black/5 px-4 py-6 dark:border-white/10 dark:bg-white/5 sm:px-8 sm:py-8 lg:px-12"
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <marker
              id="architecture-arrow-end"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-black/35 dark:fill-white/35" />
            </marker>
          </defs>

          {renderedEdges.map((edge) => (
            <line
              key={`${edge.from}-${edge.to}-${edge.label ?? "link"}`}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              className="stroke-black/35 dark:stroke-white/35"
              strokeWidth="1.5"
              markerStart={edge.bidirectional ? "url(#architecture-arrow-end)" : undefined}
              markerEnd="url(#architecture-arrow-end)"
            />
          ))}
        </svg>

        <div className="relative z-10 space-y-12 lg:space-y-16">
          {orderedRows.map(([row, nodes]) => (
            <div
              key={row}
              className={
                nodes.length === 1
                  ? "flex items-center justify-center"
                  : "mx-auto flex w-full max-w-[960px] items-center justify-between gap-10 px-4 sm:px-8 lg:px-12"
              }
            >
              {nodes.map((node) => (
                <div
                  key={node.id}
                  ref={(element) => {
                    nodeRefs.current[node.id] = element;
                  }}
                  className="min-w-[140px] max-w-[180px] rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-center text-sm font-semibold text-black shadow-[0_10px_40px_-30px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                >
                  {node.label}
                </div>
              ))}
            </div>
          ))}
        </div>

        {renderedEdges.map((edge) =>
          edge.label ? (
            <div
              key={`label-${edge.from}-${edge.to}-${edge.label}`}
              className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-black/65 shadow-sm dark:bg-black/60 dark:text-white/75"
              style={{ left: edge.labelX, top: edge.labelY }}
            >
              {edge.label}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
