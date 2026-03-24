import { Card } from "@/components/ui/card";
import { SectionHeader } from "./SectionHeader";

const strengths = [
  {
    title: "Realtime Systems",
    detail: "Game runtimes, live score flow, and low-latency controller communication.",
  },
  {
    title: "Full-Stack Architecture",
    detail: "Frontend interfaces, backend services, data models, and deployment-aware design.",
  },
  {
    title: "Hardware & Device Integration",
    detail: "USB, COM, Ethernet, NFC, smart devices, and room-level deployment planning.",
  },
  {
    title: "Backend API Design",
    detail: "Authentication, API keys, rate limiting, retries, and platform-wide data flow.",
  },
  {
    title: "Operational Tooling",
    detail: "Staff workflows, analytics, admin controls, diagnostics, and maintenance tooling.",
  },
  {
    title: "Team Leadership",
    detail: "Requirements, reviews, technical direction, onboarding, and implementation guidance.",
  },
];

export function CoreStrengthsSection() {
  return (
    <section
      id="core-strengths"
      data-page-section="true"
      data-page-section-label="Core Strengths"
      className="mt-16 w-full max-w-full min-w-0 space-y-6 sm:mt-20 sm:space-y-8"
    >
      <SectionHeader
        eyebrow="Strengths"
        title="Core Strengths"
        description="Areas where I tend to deliver the most value when systems have to work reliably in production."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {strengths.map((strength) => (
          <Card
            key={strength.title}
            variant="surface"
            className="w-full max-w-full min-w-0 rounded-[24px] p-4 sm:p-5"
          >
            <p className="text-sm font-semibold text-black sm:text-base">
              {strength.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-black/65">
              {strength.detail}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
