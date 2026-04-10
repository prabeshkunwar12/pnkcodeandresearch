"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "./SectionHeader";

export function ProfessionalExperienceSection() {
  return (
    <section
      id="experience"
      data-page-section="true"
      data-page-section-label="Professional Experience"
      className="mt-16 w-full max-w-full min-w-0 space-y-6 sm:mt-20 sm:space-y-8"
    >
      <SectionHeader
        eyebrow="Professional Experience"
        title="Where I've shipped real systems"
        description="End-to-end product delivery across interactive hardware, software, and operational tooling."
      />

      <Link href="/developer/aerosports" className="block">
        <Card
          variant="surface"
          hover
          className="group relative grid w-full max-w-full min-w-0 gap-5 overflow-hidden p-4 sm:grid-cols-[120px_1fr] sm:gap-6 sm:p-6"
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <Image
              src="/developer/aerosports/game-rooms/tilehunt_complete2.jpeg"
              alt="Tile game room"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="scale-[1.05] object-cover opacity-[0.22] blur-[0.5px] dark:opacity-[0.16]"
              style={{ objectPosition: "center center" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0.7)_38%,rgba(255,255,255,0.48)_72%,rgba(255,255,255,0.6)_100%)] dark:bg-[linear-gradient(135deg,rgba(8,14,28,0.9)_0%,rgba(8,14,28,0.82)_38%,rgba(8,14,28,0.74)_72%,rgba(8,14,28,0.84)_100%)]" />
          </div>

          <div className="relative z-10 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-black/10 bg-white p-2 shadow-sm sm:h-20 sm:w-20">
              <Image
                src="/company_logo/aerosports.jpeg"
                alt="AeroSports Parks"
                width={72}
                height={72}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="relative z-10 min-w-0 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-black/55 dark:text-white/55">
                AeroSports / PixelPulse
              </p>
              <h3 className="mt-2 text-base font-semibold text-black dark:text-white sm:text-lg">
                Technical Lead / Full-Stack Systems Developer
              </h3>
            </div>
            <ul className="hidden gap-2 text-sm leading-6 text-black/78 dark:text-white/74 sm:grid sm:grid-cols-2">
              <li>Built and scaled a production interactive gaming platform across kiosks, backend systems, and room hardware.</li>
              <li>Designed software architecture spanning frontend, backend, controller communication, and operational tooling.</li>
              <li>Led development of game runtime systems, APIs, analytics tools, and staff-facing workflows.</li>
              <li>Worked across software, device wiring, room integration, and deployment planning.</li>
              <li>Trained teammates, reviewed implementations, and helped expand the platform as the system grew.</li>
            </ul>
            <div className="flex sm:hidden">
              <span className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-deep)] dark:border-white/10 dark:bg-white/5">
                Case Study →
              </span>
            </div>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--accent-deep)] sm:inline-flex">
              View AeroSports Case Study →
            </span>
          </div>
        </Card>
      </Link>
    </section>
  );
}
