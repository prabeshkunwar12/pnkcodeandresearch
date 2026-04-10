"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { certifications, type Certification } from "@/data/certifications";
import { Card } from "@/components/ui/card";

type CertificationsSectionProps = {
  context: "landing" | "developer" | "researcher" | "quantum";
  title?: string;
  description?: string;
  limit?: number;
};

function sortForContext(items: Certification[], context: string) {
  if (context !== "landing") return items;
  const featured = items.filter((item) => item.featured);
  const rest = items.filter((item) => !item.featured);
  return [...featured, ...rest];
}

export function CertificationsSection({
  context,
  title = "Certifications",
  description,
  limit,
}: CertificationsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const filtered = useMemo(() => {
    const items = certifications.filter((item) =>
      item.relations.includes(context),
    );
    const ordered = sortForContext(items, context);
    if (limit && ordered.length > limit) return ordered.slice(0, limit);
    return ordered;
  }, [context, limit]);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      data-page-section="true"
      data-page-section-label="Certifications"
      className={context === "landing" ? "mt-8 space-y-4 sm:mt-12 sm:space-y-5" : "mt-16 space-y-6"}
    >
      <div className="space-y-1.5 sm:space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--muted)] sm:tracking-[0.3em]">
          Certifications
        </p>
        <h2 className="font-display text-2xl text-[color:var(--foreground)] sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-sm leading-6 text-[color:var(--muted)] md:text-base">
            {description}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2.5 sm:hidden">
        {filtered.map((cert, index) => (
          <a
            key={cert.id}
            href={cert.url}
            target="_blank"
            rel="noreferrer noopener"
            className={`min-w-0 rounded-2xl border border-black/10 bg-black/[0.02] px-3 py-2.5 transition-all duration-300 hover:border-black/15 hover:bg-black/[0.035] dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-white/15 dark:hover:bg-white/[0.05] ${
              visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{
              transitionDelay: visible ? `${index * 70}ms` : "0ms",
            }}
          >
            <span className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 p-1.5 shadow-sm dark:border-white/10"
                style={{ backgroundColor: "#ffffff" }}
              >
                <img
                  src={cert.logoSrc}
                  alt={cert.provider}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-5 text-black dark:text-white">
                  {cert.title}
                </span>
                <span className="mt-0.5 block text-sm leading-5 text-black/65 dark:text-white/65">
                  {cert.provider} · Issued {cert.issued}
                </span>
              </span>
            </span>
          </a>
        ))}
      </div>

      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cert, index) => (
          <Card
            key={cert.id}
            variant="surface"
            hover
            className={`p-3.5 sm:p-4 md:p-5 transition-all duration-300 motion-reduce:transition-none ${
              visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{
              transitionDelay: visible ? `${index * 70}ms` : "0ms",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-black/10 bg-white/60 p-1 sm:h-9 sm:w-9">
                <img
                  src={cert.logoSrc}
                  alt={cert.provider}
                  className="h-full w-full object-contain"
                />
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)] sm:text-[11px] sm:tracking-[0.24em]">
                {cert.provider}
              </p>
            </div>
            <h3 className="mt-2.5 text-sm font-semibold text-[color:var(--foreground)] sm:mt-3 sm:text-base">
              {cert.title}
            </h3>
            <p className="mt-1.5 text-[12px] text-[color:var(--muted)] sm:mt-2 sm:text-sm">Issued {cert.issued}</p>
            {cert.credentialId ? (
              <p className="mt-1 text-[11px] text-[color:var(--muted)] sm:text-xs">
                Credential ID: {cert.credentialId}
              </p>
            ) : null}
            <a
              href={cert.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-deep)] sm:mt-4 sm:text-xs sm:tracking-[0.25em]"
            >
              View certificate
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}
