"use client";

import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };
type NavGroup = { id: string; title: string; items: NavItem[] };

const NAV_GROUPS: NavGroup[] = [
  { id: "overview", title: "Overview", items: [{ href: "/researcher/quantum-computing", label: "Learning Overview" }] },
  { id: "intro", title: "Quantum Computing Intro", items: [{ href: "/researcher/quantum-computing/intro", label: "Myth vs Reality" }] },
  { id: "foundations", title: "Foundations", items: [{ href: "/researcher/quantum-computing/qiskit-basics", label: "Core Foundations" }] },
  { id: "gates", title: "Gates & Circuits", items: [{ href: "/researcher/quantum-computing/qiskit-basics", label: "Qiskit Basics & Gates" }] },
  {
    id: "algorithms",
    title: "Algorithms",
    items: [
      { href: "/researcher/quantum-computing/algorithms", label: "Algorithms Overview" },
      { href: "/researcher/quantum-computing/algorithms/grover", label: "Grover's Algorithm" },
    ],
  },
  { id: "hardware-noise", title: "Hardware & Noise", items: [{ href: "/researcher/quantum-computing/qiskit-cloud", label: "Cloud Backends" }] },
  { id: "experiments", title: "Experiments", items: [{ href: "/researcher/quantum-computing/qiskit-cloud", label: "Run Experiments" }] },
  { id: "qa", title: "Q&A", items: [{ href: "/researcher/quantum-computing/intro#qa", label: "Common Questions" }] },
];

const GROUP_STORAGE_KEY = "quantum-learning-nav-open";
const SIDEBAR_STORAGE_KEY = "quantum-learning-sidebar-collapsed";

function isPathActive(pathname: string, href: string) {
  const [hrefPath] = href.split("#");
  if (hrefPath === "/researcher/quantum-computing") return pathname === hrefPath;
  return pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
}

function defaultOpenState(pathname: string) {
  return NAV_GROUPS.reduce<Record<string, boolean>>((acc, group) => {
    acc[group.id] = group.items.some((item) => isPathActive(pathname, item.href)) || group.id === "overview";
    return acc;
  }, {});
}

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${expanded ? "rotate-90" : "rotate-0"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7 4 6 6-6 6" />
    </svg>
  );
}

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${collapsed ? "rotate-180" : "rotate-0"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h12v12H4z" />
      <path d="M8 4v12" />
      <path d="m11 10 3-2v4l-3-2Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 6h12M4 10h12M4 14h12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

function GroupToggleIcon({ collapsed }: { collapsed: boolean }) {
  return (
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
      {collapsed ? (
        <>
          <path d="M5 6h10" />
          <path d="M5 10h10" />
          <path d="M5 14h10" />
        </>
      ) : (
        <>
          <path d="M5 6h10" />
          <path d="M7 10h6" />
          <path d="M9 14h2" />
        </>
      )}
    </svg>
  );
}

function SidebarContent({
  pathname,
  openMap,
  setOpenMap,
}: {
  pathname: string;
  openMap: Record<string, boolean>;
  setOpenMap: Dispatch<SetStateAction<Record<string, boolean>>>;
}) {
  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-1">
        {NAV_GROUPS.map((group) => {
          const expanded = Boolean(openMap[group.id]);
          const groupActive = group.items.some((item) => isPathActive(pathname, item.href));

          return (
            <section key={group.id} className="border-b border-black/10 pb-1">
              <h2>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`group-${group.id}`}
                  onClick={() => setOpenMap((prev) => ({ ...prev, [group.id]: !prev[group.id] }))}
                  className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 motion-reduce:transition-none ${
                    groupActive ? "text-black" : "text-black/70 hover:bg-black/5 hover:text-black"
                  }`}
                >
                  <span>{group.title}</span>
                  <Chevron expanded={expanded} />
                </button>
              </h2>

              <div
                id={`group-${group.id}`}
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="space-y-1 px-1 pb-2">
                    {group.items.map((item) => {
                      const active = isPathActive(pathname, item.href);
                      return (
                        <a
                          key={item.href + item.label}
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`block rounded-lg border-l-2 px-2.5 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 motion-reduce:transition-none ${
                            active
                              ? "border-black bg-black/90 text-white font-semibold"
                              : "border-transparent text-black/70 hover:border-black/30 hover:bg-black/5 hover:text-black"
                          }`}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default function QuantumDocsSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => defaultOpenState(pathname));
  const areAllOpen = useMemo(() => NAV_GROUPS.every((group) => openMap[group.id]), [openMap]);

  useEffect(() => {
    const savedGroups = window.localStorage.getItem(GROUP_STORAGE_KEY);
    const savedSidebar = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);

    if (savedSidebar) setSidebarCollapsed(savedSidebar === "1");

    if (!savedGroups) {
      setOpenMap(defaultOpenState(pathname));
      return;
    }

    try {
      const parsed = JSON.parse(savedGroups) as Record<string, boolean>;
      const merged = NAV_GROUPS.reduce<Record<string, boolean>>((acc, group) => {
        acc[group.id] = Boolean(parsed[group.id]);
        return acc;
      }, {});
      setOpenMap(merged);
    } catch {
      setOpenMap(defaultOpenState(pathname));
    }
  }, [pathname]);

  useEffect(() => {
    window.localStorage.setItem(GROUP_STORAGE_KEY, JSON.stringify(openMap));
  }, [openMap]);

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, sidebarCollapsed ? "1" : "0");
  }, [sidebarCollapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleAllGroups = () => {
    const next = NAV_GROUPS.reduce<Record<string, boolean>>((acc, group) => {
      acc[group.id] = !areAllOpen;
      return acc;
    }, {});
    setOpenMap(next);
  };

  return (
    <>
      <div className="mb-5 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
          aria-controls="quantum-mobile-nav"
          className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white/80 px-4 py-2 text-sm font-semibold text-black/80 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
          <MenuIcon />
          Menu
        </button>
      </div>

      <aside className={`hidden shrink-0 self-start border-r border-black/10 pr-4 transition-[width] duration-200 motion-reduce:transition-none lg:sticky lg:top-8 lg:block ${sidebarCollapsed ? "w-16" : "w-80"}`}>
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto pb-6">
          <div className="mb-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              aria-expanded={!sidebarCollapsed}
              aria-label={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-black bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <CollapseIcon collapsed={sidebarCollapsed} />
              <span className={sidebarCollapsed ? "sr-only" : ""}>
                {sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              </span>
            </button>
            {!sidebarCollapsed ? (
              <button
                type="button"
                onClick={toggleAllGroups}
                aria-label={areAllOpen ? "Collapse all groups" : "Expand all groups"}
                title={areAllOpen ? "Collapse all groups" : "Expand all groups"}
                className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-black/15 bg-white text-black/80 transition-all duration-200 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                <GroupToggleIcon collapsed={areAllOpen} />
              </button>
            ) : null}
          </div>

          {!sidebarCollapsed ? <SidebarContent pathname={pathname} openMap={openMap} setOpenMap={setOpenMap} /> : null}
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" id="quantum-mobile-nav">
          <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-y-0 left-0 w-[88vw] max-w-sm overflow-y-auto bg-[color:var(--background)] p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-lg text-black">Learning Menu</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 rounded-lg border border-black/15 px-3 py-1.5 text-sm text-black/75 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2"
              >
                <CloseIcon />
                Close
              </button>
            </div>
            <SidebarContent pathname={pathname} openMap={openMap} setOpenMap={setOpenMap} />
          </div>
        </div>
      ) : null}
    </>
  );
}
