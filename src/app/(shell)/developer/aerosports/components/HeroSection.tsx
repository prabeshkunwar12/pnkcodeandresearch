import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { heroButtons, ownershipItems } from "../data";

export function HeroSection() {
  return (
    <main id="top" className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-8">
        <p className="text-xs uppercase tracking-[0.35em] text-black/60">
          Developer Experience
        </p>
        <h1 className="font-display text-4xl leading-tight text-black sm:text-5xl lg:text-6xl">
          AeroSports - Technical Lead &amp; Full-Stack Game Systems
        </h1>
        <p className="max-w-2xl text-base leading-7 text-black/70 sm:text-lg">
          I led the software and hardware integration for AeroSports&apos;
          interactive game rooms - building end-to-end systems across kiosk
          applications, game engines, device control, and operations tooling.
          This page summarizes the architecture work, game development, and
          project leadership behind launching a full facility from scratch.
        </p>

        <div className="flex flex-wrap gap-4">
          {heroButtons.map((button) => {
            if (button.variant === "tertiary") {
              return (
                <Link
                  key={button.href}
                  className="inline-flex items-center text-sm font-semibold text-[color:var(--accent-deep)]"
                  href={button.href}
                >
                  {button.label}
                </Link>
              );
            }

            if (button.variant === "secondary") {
              return (
                <Link
                  key={button.href}
                  className="inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black transition hover:border-black"
                  href={button.href}
                >
                  {button.label}
                </Link>
              );
            }

            return (
              <Link
                key={button.href}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-[#1f1b16]"
                href={button.href}
              >
                {button.label}
              </Link>
            );
          })}
        </div>
      </section>

      <Card
        as="aside"
        variant="surface"
        className="rounded-[28px] p-6 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.45)]"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-black/50">
          What I Owned
        </p>
        <div className="mt-4 grid gap-3">
          {ownershipItems.map((item) => (
            <Card key={item} className="px-4 py-3 text-sm text-black/70">
              {item}
            </Card>
          ))}
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-black/10">
          <Image
            src="/developer/aerosports/game-rooms/hexaquest_complete2.jpeg"
            alt="AeroSports game room"
            width={1000}
            height={700}
            className="h-56 w-full object-cover"
          />
        </div>
      </Card>
    </main>
  );
}
