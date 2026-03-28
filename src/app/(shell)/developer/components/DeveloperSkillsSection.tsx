import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "./SectionHeader";

const capabilityBlocks = [
  {
    title: "Realtime Systems",
    description:
      "Runtime behavior, state transitions, and low-latency communication for systems that need to react cleanly under real usage.",
    bullets: [
      "Event-driven runtime flows for scoring, timers, restart logic, and room state changes.",
      "Controller communication paths tuned for low-latency behavior and reliable recovery.",
      "Production-oriented debugging and observability for runtime issues that surface live.",
    ],
    links: [
      { label: "Game Engine", href: "/developer/projects/game-engine-dotnet" },
      { label: "Kiosk Host", href: "/developer/projects/kiosk-host-dotnet" },
    ],
  },
  {
    title: "Backend & Platform Architecture",
    description:
      "Shared backend systems that connect interfaces, runtime services, and data layers into one maintainable platform.",
    bullets: [
      "Express.js API design for multiple clients, operational tools, and shared business logic.",
      "Authentication, API keys, middleware, rate limiting, and reliability safeguards for production use.",
      "Data flow design across MSSQL, runtime services, and staff-facing systems.",
    ],
    links: [
      { label: "Backend API", href: "/developer/projects/backend-api-express" },
      { label: "Admin Portal", href: "/developer/projects/admin-portal" },
    ],
  },
  {
    title: "Frontend & Interaction Design",
    description:
      "Interfaces designed for fast decisions, clear state, and reliable use in customer-facing and operational workflows.",
    bullets: [
      "Next.js interfaces for kiosks, scoreboards, and staff workflows that need fast feedback loops.",
      "Interaction flows shaped around real environments instead of static demo scenarios.",
      "UI decisions informed by room operations, troubleshooting needs, and live user behavior.",
    ],
    links: [
      { label: "Kiosk UI", href: "/developer/projects/kiosk-ui-nextjs" },
      { label: "Scorecard", href: "/developer/projects/scorecard-nextjs" },
    ],
  },
  {
    title: "Hardware & Device Integration",
    description:
      "Software that coordinates with physical devices, controller networks, and room-level systems without losing operational stability.",
    bullets: [
      "USB, COM, Ethernet, NFC, Arduino, ESP, and controller-network integration work.",
      "Device health checks, watchdog-style recovery paths, and deployment-aware wiring decisions.",
      "Room integration that accounts for physical constraints, fault handling, and maintenance flow.",
    ],
    links: [
      {
        label: "Controllers Network",
        href: "/developer/projects/game-controllers-sensor-network",
      },
      {
        label: "Room Devices",
        href: "/developer/projects/room-devices-access-control",
      },
    ],
  },
  {
    title: "Technical Leadership & Delivery",
    description:
      "Execution work that keeps systems moving from design through rollout, support, and iteration.",
    bullets: [
      "Feature planning, implementation guidance, and review support across multiple moving parts.",
      "Troubleshooting, deployment coordination, and documentation that helps teams ship reliably.",
      "Bridging product needs, technical constraints, and operational realities while systems evolve.",
    ],
    links: [
      { label: "Featured Work", href: "/developer#projects" },
      { label: "AeroSports Case Study", href: "/developer/aerosports" },
    ],
  },
] as const;

export function DeveloperSkillsSection() {
  return (
    <section
      id="skills"
      data-page-section="true"
      data-page-section-label="Skills"
      className="mt-16 w-full max-w-full min-w-0 space-y-6 sm:mt-20 sm:space-y-8"
    >
      <SectionHeader
        eyebrow="Technical Capabilities"
        title="Developer Skills"
        description="A structured view of the systems and engineering work I focus on most across software, runtime architecture, hardware integration, and production delivery."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:gap-5">
        {capabilityBlocks.map((block) => (
          <Card
            key={block.title}
            variant="surface"
            className="w-full max-w-full min-w-0 rounded-[28px] p-4 sm:p-5"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-black dark:text-white sm:text-xl">
                  {block.title}
                </h3>
                <p className="text-sm leading-6 text-black/70 dark:text-white/70 sm:text-[15px]">
                  {block.description}
                </p>
              </div>

              <ul className="space-y-2.5">
                {block.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-6 text-black/72 dark:text-white/72"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/60 dark:bg-white/60" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {block.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1.5 text-xs font-medium text-black transition hover:border-black/20 hover:bg-black/8 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/8"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
