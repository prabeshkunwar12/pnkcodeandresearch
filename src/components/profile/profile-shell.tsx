"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProfileNavItems } from "./profile-nav-items";

type NavItem = { href: string; label: string };
type NavGroup = { id: string; title: string; items: NavItem[] };

const GLOBAL_NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/developer/aerosports", label: "AeroSports" },
  { href: "/researcher/quantum-computing", label: "Quantum Notes" },
  { href: "/developer#contact", label: "Contact" },
];

const DOCS_NAV: NavGroup[] = [
  {
    id: "overview",
    title: "Overview",
    items: [{ href: "/researcher/quantum-computing", label: "Learning Overview" }],
  },
  {
    id: "intro",
    title: "Quantum Computing Intro",
    items: [
      { href: "/researcher/quantum-computing/intro", label: "Myth vs Reality" },
    ],
  },
  {
    id: "foundations",
    title: "Foundations",
    items: [
      { href: "/researcher/quantum-computing/qiskit-basics", label: "Core Foundations" },
    ],
  },
  {
    id: "gates",
    title: "Gates & Circuits",
    items: [
      {
        href: "/researcher/quantum-computing/qiskit-basics",
        label: "Qiskit Basics & Gates",
      },
    ],
  },
  {
    id: "algorithms",
    title: "Algorithms",
    items: [
      { href: "/researcher/quantum-computing/algorithms", label: "Algorithms Overview" },
      { href: "/researcher/quantum-computing/algorithms/grover", label: "Grover's Algorithm" },
    ],
  },
  {
    id: "hardware-noise",
    title: "Hardware & Noise",
    items: [{ href: "/researcher/quantum-computing/qiskit-cloud", label: "Cloud Backends" }],
  },
  {
    id: "experiments",
    title: "Experiments",
    items: [{ href: "/researcher/quantum-computing/qiskit-cloud", label: "Run Experiments" }],
  },
  {
    id: "qa",
    title: "Q&A",
    items: [
      { href: "/researcher/quantum-computing/intro#qa", label: "Common Questions" },
    ],
  },
];

function isPathActive(pathname: string, href: string) {
  const [hrefPath] = href.split("#");
  if (hrefPath === "/researcher/quantum-computing") return pathname === hrefPath;
  return pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
}

export function ProfileShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const showDocs = pathname.startsWith("/researcher/quantum-computing");
  const externalLinks = useMemo(
    () => getProfileNavItems({}).filter((item) => item.external),
    [],
  );

  useEffect(() => {
    const stored = window.localStorage.getItem("profile-sidebar-collapsed");
    if (stored === "1") setSidebarCollapsed(true);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "profile-sidebar-collapsed",
      sidebarCollapsed ? "1" : "0",
    );
  }, [sidebarCollapsed]);

  const motionSafe = "motion-reduce:transition-none";

  return (
    <div
      className="relative min-h-screen bg-background"
      style={{
        ["--sidebar-expanded" as string]: "clamp(220px, 22vw, 300px)",
        ["--sidebar-collapsed" as string]: "clamp(60px, 6vw, 76px)",
        ["--sidebar-gap" as string]: "16px",
      }}
    >
      <div className="absolute inset-0">
        <div className="absolute -top-36 -left-28 h-95 w-95 rounded-full bg-(--cloud-1) blur-[120px] opacity-60 animate-float-slow" />
        <div className="absolute top-20 -right-30 h-90 w-90 rounded-full bg-(--cloud-2) blur-[120px] opacity-60 animate-float-slow" />
        <div className="absolute -bottom-45 left-[18%] h-110 w-110 rounded-full bg-(--cloud-3) blur-[140px] opacity-55 animate-float-slow" />
      </div>

      <header
        className={`fixed top-0 z-40 border-b border-[color:var(--line)] bg-[color:var(--background)]/90 backdrop-blur transition-[left,width] duration-300 ease-out ${motionSafe}`}
        style={{
          left: sidebarCollapsed
            ? "var(--sidebar-collapsed)"
            : "var(--sidebar-expanded)",
          right: "0px",
        }}
      >
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-display text-base tracking-[0.02em] sm:text-lg"
            >
              Prabesh Kunwar
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/developer"
              className="rounded-full border border-[color:var(--line)] px-3 py-1.5 text-xs font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--chip)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground)]/20"
            >
              Developer
            </Link>
            <Link
              href="/researcher"
              className="rounded-full border border-[color:var(--line)] px-3 py-1.5 text-xs font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--chip)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground)]/20"
            >
              Researcher
            </Link>
          </div>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-[color:var(--line)] bg-[color:var(--background)]/95 backdrop-blur transition-[width] duration-300 ease-out ${motionSafe} ${
          sidebarCollapsed ? "w-[var(--sidebar-collapsed)]" : "w-[var(--sidebar-expanded)]"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {sidebarCollapsed ? (
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setSidebarCollapsed(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line)] text-xs font-semibold tracking-[0.08em] text-[color:var(--foreground)] transition hover:bg-[color:var(--chip)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground)]/20"
            >
              PNK
            </button>
          ) : (
            <Link
              href="/"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line)] text-xs font-semibold tracking-[0.08em] text-[color:var(--foreground)] transition hover:bg-[color:var(--chip)]"
            >
              PNK
            </Link>
          )}

          {!sidebarCollapsed ? (
            <button
              type="button"
              aria-label="Collapse sidebar"
              onClick={() => setSidebarCollapsed(true)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--foreground)] transition hover:bg-[color:var(--chip)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground)]/20"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 4-6 6 6 6" />
              </svg>
            </button>
          ) : null}
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-6 pt-4">
          {!sidebarCollapsed ? (
            <>
              <div className="space-y-2">
                {GLOBAL_NAV.map((item) => (
                  <SidebarLink key={item.href} item={item} pathname={pathname} />
                ))}
              </div>

              {showDocs ? (
                <SidebarSection title="Quantum Docs">
                  {DOCS_NAV.map((group) => (
                    <div key={group.id} className="space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--muted)">
                        {group.title}
                      </p>
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <SidebarLink
                            key={item.href + item.label}
                            item={item}
                            pathname={pathname}
                            compact
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </SidebarSection>
              ) : null}
            </>
          ) : null}
        </div>

        <div className="shrink-0 border-t border-[color:var(--line)] px-4 py-4">
          {!sidebarCollapsed ? (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--muted)">
                Links
              </p>
              <div className="mt-3 space-y-2">
                {externalLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 rounded-xl border border-[color:var(--line)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--chip)]"
                  >
                    <span className="h-4 w-4">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              {externalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  title={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--foreground)] transition hover:bg-[color:var(--chip)]"
                >
                  <span className="h-4 w-4">{item.icon}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </aside>

      <div
        className={`relative w-full px-4 pb-20 pt-24 sm:px-6 lg:px-10 transition-[padding] duration-300 ease-out ${motionSafe}`}
        style={{
          paddingLeft: sidebarCollapsed
            ? "calc(var(--sidebar-collapsed) + var(--sidebar-gap))"
            : "calc(var(--sidebar-expanded) + var(--sidebar-gap))",
        }}
      >
        <div className={`${wide ? "max-w-400" : "max-w-360"} mx-auto w-full`}>
          <div className="mb-8 hidden lg:block">
            <p className="text-xs uppercase tracking-[0.3em] text-(--muted)">
              Prabesh Kunwar
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--muted)">
        {title}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function SidebarLink({
  item,
  pathname,
  compact = false,
}: {
  item: NavItem;
  pathname: string;
  compact?: boolean;
}) {
  const active = isPathActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center justify-between rounded-xl border px-3 py-2 transition ${
        compact ? "text-xs" : "text-sm"
      } ${
        active
          ? "border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)]"
          : "border-[color:var(--line)] text-[color:var(--foreground)] hover:bg-[color:var(--chip)]"
      }`}
    >
      <span>{item.label}</span>
    </Link>
  );
}
