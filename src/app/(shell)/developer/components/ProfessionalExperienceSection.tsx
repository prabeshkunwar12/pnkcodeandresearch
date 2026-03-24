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
          className="group grid w-full max-w-full min-w-0 gap-5 p-4 sm:grid-cols-[120px_1fr] sm:gap-6 sm:p-6"
        >
          <div className="flex items-center justify-center">
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

          <div className="min-w-0 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-black/50">
                AeroSports / PixelPulse
              </p>
              <h3 className="mt-2 text-base font-semibold text-black sm:text-lg">
                Technical Lead / Full-Stack Systems Developer
              </h3>
            </div>
            <ul className="grid gap-2 text-sm leading-6 text-black/70 sm:grid-cols-2">
              <li>Built and scaled a production interactive gaming platform across kiosks, backend systems, and room hardware.</li>
              <li>Designed software architecture spanning frontend, backend, controller communication, and operational tooling.</li>
              <li>Led development of game runtime systems, APIs, analytics tools, and staff-facing workflows.</li>
              <li>Worked across software, device wiring, room integration, and deployment planning.</li>
              <li>Trained teammates, reviewed implementations, and helped expand the platform as the system grew.</li>
            </ul>
            <span className="inline-flex text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--accent-deep)]">
              View AeroSports Case Study →
            </span>
          </div>
        </Card>
      </Link>
    </section>
  );
}
