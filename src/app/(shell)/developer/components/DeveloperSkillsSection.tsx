"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { SectionHeader } from "./SectionHeader";

type CapabilityFilter =
  | "featured"
  | "all"
  | "frontend"
  | "backend"
  | "runtime"
  | "hardware"
  | "operations";

type CapabilityBlock = {
  id: string;
  layer: string;
  title: string;
  summary: string;
  description: string;
  details: string[];
  tech: string[];
  filter: CapabilityFilter;
};

const highlightedTerms = [
  ".NET",
  "Controllers",
  "Sockets",
  "Game state",
  "Timer synchronization",
  "Low-latency",
  "Event-driven",
  "Express",
  "MSSQL",
  "JWT",
  "Authentication",
  "API keys",
  "middleware",
  "Retry handling",
  "Next.js",
  "React",
  "WebView",
  "Interaction design",
  "Arduino",
  "Ethernet",
  "NFC",
  "Device orchestration",
  "Watchdog",
  "Feature planning",
  "Deployment",
  "Troubleshooting",
  "Documentation",
  "Operations",
  "PowerShell",
];

function highlightKeywords(text: string) {
  const escaped = highlightedTerms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));

  return parts.map((part, index) =>
    highlightedTerms.includes(part) ? (
      <strong key={`${part}-${index}`} className="font-semibold text-black dark:text-white">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

const capabilityBlocks: CapabilityBlock[] = [
  {
    id: "realtime",
    layer: "Layer 01",
    title: "Realtime Systems",
    summary:
      "Game state, scoring, timers, restart flow, and low-latency runtime behavior.",
    description:
      "Runtime-oriented engineering for systems that need clean state transitions, reliable event handling, and fast room feedback under live conditions.",
    details: [
      "Game state management across ready, running, paused, completed, and reset transitions.",
      "Timer synchronization, restart flows, and countdown logic that stay consistent across room states.",
      "Low-latency controller communication paths for sensors, triggers, and score-producing events.",
      "Event-driven scoring logic that reacts cleanly to live gameplay inputs without blocking the runtime.",
      "Operational debugging and recovery patterns for issues that surface while rooms are actively in use.",
    ],
    tech: [".NET", "Controllers", "Sockets"],
    filter: "runtime",
  },
  {
    id: "backend",
    layer: "Layer 02",
    title: "Backend Systems & APIs",
    summary:
      "Shared data flow, auth, retries, middleware, and production API architecture.",
    description:
      "Platform backend work that connects customer interfaces, runtime systems, admin tools, and operational data through one shared service layer.",
    details: [
      "Express API design spanning kiosks, admin tools, runtime services, and operational workflows.",
      "Authentication, API keys, and middleware patterns that protect shared production endpoints.",
      "Retry handling and fault-tolerant request flow for services used by multiple client applications.",
      "MSSQL-backed data flow design for gameplay data, player records, system configuration, and reporting.",
      "Backend architecture decisions that keep shared business logic maintainable as more systems are added.",
    ],
    tech: ["Express", "MSSQL", "JWT"],
    filter: "backend",
  },
  {
    id: "frontend",
    layer: "Layer 03",
    title: "Frontend & Interaction Design",
    summary:
      "Fast operational UI for kiosks, scorecards, admin tooling, and customer workflows.",
    description:
      "UI work focused on speed, clarity, and reliability for interfaces used by customers and staff in real operating environments.",
    details: [
      "Next.js interfaces for kiosks, scorecards, and admin workflows where state visibility matters.",
      "Interaction design shaped around customer scanning, room readiness, and fast staff decision-making.",
      "WebView-hosted UI that integrates with desktop and runtime systems without losing frontend flexibility.",
      "Operational screen design that supports troubleshooting, process clarity, and live status awareness.",
      "Iterative UI improvements informed by actual room usage instead of static demo assumptions.",
    ],
    tech: ["Next.js", "React", "WebView"],
    filter: "frontend",
  },
  {
    id: "hardware",
    layer: "Layer 04",
    title: "Hardware Integration & Control",
    summary:
      "NFC, COM, Ethernet, RS422, Arduino, ESP, and real-world device orchestration.",
    description:
      "Software-to-hardware integration work that connects room devices, controller networks, and physical deployment constraints into stable systems.",
    details: [
      "Integration across NFC readers, serial devices, Ethernet-linked controllers, and RS422 hardware chains.",
      "Arduino and ESP-based control work for interactive device behavior and room-level signaling.",
      "Device orchestration that accounts for power, communication reliability, and physical deployment realities.",
      "Watchdog and recovery paths for controllers or room devices that need to recover safely in production.",
      "Hardware-aware engineering decisions where wiring, maintenance access, and fault handling affect software design.",
    ],
    tech: ["Arduino", "Ethernet", "NFC"],
    filter: "hardware",
  },
  {
    id: "delivery",
    layer: "Layer 05",
    title: "Delivery & Technical Leadership",
    summary:
      "Feature planning, deployment, troubleshooting, reviews, and cross-functional execution.",
    description:
      "Execution work that keeps multi-layer systems moving from design into rollout, support, and continuous iteration.",
    details: [
      "Feature planning across frontend, backend, runtime, and hardware concerns instead of isolated implementation work.",
      "Deployment coordination for systems that must work reliably in physical rooms and staff workflows.",
      "Troubleshooting and production support for issues spanning UI, services, runtime logic, and hardware behavior.",
      "Review, mentoring, and implementation guidance to help teammates ship safely in a shared codebase.",
      "Documentation and cross-functional coordination that bridge product needs, technical constraints, and operations.",
    ],
    tech: ["Git", "PowerShell", "Operations"],
    filter: "featured",
  },
];

function applyProjectFilter(filter: CapabilityFilter) {
  window.dispatchEvent(
    new CustomEvent("project-browser:set-filter", {
      detail: { sectionId: "projects", type: filter, tech: "all" },
    }),
  );

  const target = document.getElementById("projects");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function DeveloperSkillsSection() {
  const [activeDesktopId, setActiveDesktopId] = useState<string | null>("realtime");
  const [activeMobileId, setActiveMobileId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const activeMobileBlock = useMemo(
    () => capabilityBlocks.find((block) => block.id === activeMobileId) ?? null,
    [activeMobileId],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activeMobileId) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeMobileId]);

  return (
    <section
      id="skills"
      data-page-section="true"
      data-page-section-label="Capabilities"
      className="mt-16 w-full max-w-full min-w-0 space-y-6 sm:mt-20 sm:space-y-8"
    >
      <SectionHeader
        eyebrow="Technical Capabilities"
        title="Technical Capabilities"
        description="A structured view of the systems, layers, and engineering work I focus on most."
      />

      <div className="space-y-3 md:hidden">
        {capabilityBlocks.map((block) => {
          const isActive = activeMobileId === block.id;
          return (
            <button
              key={block.id}
              type="button"
              onClick={() => setActiveMobileId(block.id)}
              className={`w-full rounded-[24px] border px-4 py-4 text-left transition ${
                isActive
                  ? "border-black/20 bg-black/[0.04] dark:border-white/20 dark:bg-white/[0.06]"
                  : "border-[color:var(--line)] bg-[color:var(--surface)]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 dark:text-white/45">
                    {block.layer}
                  </p>
                  <h3 className="text-base font-semibold text-black dark:text-white">
                    {block.title}
                  </h3>
                  <p className="text-[15px] leading-6 text-black/78 dark:text-white/76">
                    {highlightKeywords(block.summary)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {block.tech.slice(0, 2).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-[11px] font-medium text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className={`shrink-0 pt-1 text-lg text-black/45 transition dark:text-white/45 ${
                    isActive ? "translate-x-0.5" : ""
                  }`}
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="hidden overflow-hidden rounded-[30px] border border-[color:var(--line)] bg-[color:var(--surface)] md:block">
        {capabilityBlocks.map((block, index) => {
          const isActive = block.id === activeDesktopId;
          return (
            <div
              key={block.id}
              className={index !== capabilityBlocks.length - 1 ? "border-b border-[color:var(--line)]" : ""}
            >
              <div
                onClick={() => setActiveDesktopId(isActive ? null : block.id)}
                className={`grid cursor-pointer gap-4 px-5 transition-all duration-300 ease-out hover:bg-black/[0.025] hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] dark:hover:bg-white/[0.03] dark:hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] lg:grid-cols-[96px_minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-6 ${
                  isActive ? "bg-black/[0.035] dark:bg-white/[0.04]" : ""
                }`}
                style={{ paddingTop: isActive ? "1.25rem" : "0.9rem", paddingBottom: isActive ? "1.25rem" : "0.9rem" }}
              >
                <div className="block text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45 dark:text-white/45">
                    {block.layer}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-black/55 dark:text-white/55">
                    System layer
                  </p>
                </div>

                <div
                  className={`block text-left transition-all duration-300 ease-out ${
                    isActive
                      ? "lg:col-span-1"
                      : "lg:col-span-2 lg:pr-10"
                  }`}
                >
                  <div
                    className={`space-y-2 transition-all duration-300 ease-out ${
                      isActive ? "text-left" : "mx-auto max-w-[720px] text-center"
                    }`}
                  >
                    <div
                      className={`flex items-start gap-3 transition-all duration-300 ease-out ${
                        isActive ? "justify-between" : "justify-center"
                      }`}
                    >
                      <h3
                        className={`text-[1.15rem] font-semibold text-black transition-all duration-300 ease-out dark:text-white lg:text-[1.22rem] ${
                          isActive ? "" : "translate-x-4"
                        }`}
                      >
                        {block.title}
                      </h3>
                    </div>
                    <p
                      className={`text-[16px] leading-7 text-black/78 transition-all duration-300 ease-out dark:text-white/76 ${
                        isActive ? "" : "mx-auto max-w-[640px]"
                      }`}
                    >
                      {highlightKeywords(block.summary)}
                    </p>
                    <div
                      className={`flex flex-wrap gap-2 pt-0.5 transition-all duration-300 ease-out ${
                        isActive ? "" : "justify-center"
                      }`}
                    >
                      {block.tech.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-black/10 bg-black/5 px-3 py-1.5 text-xs font-medium text-black/72 dark:border-white/10 dark:bg-white/5 dark:text-white/72"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isActive
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none -translate-x-2 opacity-0"
                  }`}
                >
                      {isActive ? (
                    <div className="flex h-full flex-col justify-between gap-5">
                      <div className="space-y-4">
                        <p className="text-[16px] leading-7 text-black/78 dark:text-white/76">
                          {highlightKeywords(block.description)}
                        </p>
                        <ul className="space-y-3">
                          {block.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex gap-3 text-[15px] leading-7 text-black/78 dark:text-white/76"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/55 dark:bg-white/55" />
                              <span>{highlightKeywords(detail)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            applyProjectFilter(block.filter);
                          }}
                          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/20 dark:bg-white dark:!text-black dark:hover:bg-white/90 dark:focus:ring-white/20"
                        >
                          Explore Projects
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {mounted && activeMobileBlock
        ? createPortal(
        <div className="fixed inset-0 z-[80] md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close capability details"
            className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"
            onClick={() => setActiveMobileId(null)}
          />
          <div className="fixed inset-0 z-[81] overflow-y-auto bg-[color:var(--surface)]">
            <div className="flex min-h-screen flex-col px-5 py-6">
              <div className="flex items-start justify-between gap-4 border-b border-[color:var(--line)] pb-4">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 dark:text-white/45">
                    {activeMobileBlock.layer}
                  </p>
                  <h3 className="text-[1.75rem] font-semibold text-black dark:text-white">
                    {activeMobileBlock.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveMobileId(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[color:var(--surface-strong)] text-lg text-black transition hover:border-black/20 hover:bg-[color:var(--surface)] dark:border-white/10 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/[0.06]"
                  aria-label="Close capability details"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto py-5">
                <p className="text-[16px] leading-7 text-black/78 dark:text-white/76">
                  {highlightKeywords(activeMobileBlock.description)}
                </p>

                <div className="flex flex-wrap gap-2">
                  {activeMobileBlock.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/10 bg-black/5 px-3 py-1.5 text-xs font-medium text-black/72 dark:border-white/10 dark:bg-white/5 dark:text-white/72"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <ul className="space-y-3">
                  {activeMobileBlock.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-[15px] leading-7 text-black/78 dark:text-white/76"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/55 dark:bg-white/55" />
                      <span>{highlightKeywords(detail)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-[color:var(--line)] pt-4">
                <button
                  type="button"
                  onClick={() => setActiveMobileId(null)}
                  className="rounded-full border border-black/10 bg-[color:var(--surface-strong)] px-4 py-3 text-sm font-medium text-black transition hover:border-black/20 hover:bg-[color:var(--surface)] dark:border-white/10 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/[0.06]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveMobileId(null);
                    applyProjectFilter(activeMobileBlock.filter);
                  }}
                  className="rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/90 dark:bg-white dark:!text-black dark:hover:bg-white/90"
                >
                  Explore Projects
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
        : null}
    </section>
  );
}
