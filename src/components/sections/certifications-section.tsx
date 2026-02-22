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
    <section id="certifications" ref={sectionRef} className="mt-16 space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-(--muted)">
          Certifications
        </p>
        <h2 className="font-display text-2xl text-(--foreground) sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-sm text-(--muted) sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cert, index) => (
          <Card
            key={cert.id}
            variant="surface"
            hover
            className={`p-5 transition-all duration-300 motion-reduce:transition-none ${
              visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{
              transitionDelay: visible ? `${index * 70}ms` : "0ms",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-black/10 bg-white/60 p-1">
                <img
                  src={cert.logoSrc}
                  alt={cert.provider}
                  className="h-full w-full object-contain"
                />
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--muted)">
                {cert.provider}
              </p>
            </div>
            <h3 className="mt-3 text-base font-semibold text-(--foreground)">
              {cert.title}
            </h3>
            <p className="mt-2 text-sm text-(--muted)">Issued {cert.issued}</p>
            {cert.credentialId ? (
              <p className="mt-1 text-xs text-(--muted)">
                Credential ID: {cert.credentialId}
              </p>
            ) : null}
            <a
              href={cert.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.25em] text-(--accent-deep)"
            >
              View certificate
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}
