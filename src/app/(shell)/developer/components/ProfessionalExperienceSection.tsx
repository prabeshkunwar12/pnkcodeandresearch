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
      className="mt-20 space-y-8"
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
          className="group grid gap-6 p-6 sm:grid-cols-[120px_1fr]"
        >
          <div className="flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-black/10 bg-white p-2 shadow-sm">
              <Image
                src="/company_logo/aerosports.jpeg"
                alt="AeroSports Parks"
                width={72}
                height={72}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                AeroSports Parks (PixelPulse / PixelGames)
              </p>
              <h3 className="mt-2 text-lg font-semibold text-black">
                Technical Lead / Full-Stack &amp; Systems Engineering
              </h3>
            </div>
            <ul className="grid gap-2 text-sm text-black/70 sm:grid-cols-2">
              <li>• End-to-end game room platform: kiosk, engine integration, hardware control</li>
              <li>• Multi-location deployments and tooling (debuggers, simulators, admin controls)</li>
              <li>• Shipped to multiple facilities with high daily game volume</li>
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
