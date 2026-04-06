"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CodeIcon,
  FlaskIcon,
  getProfileNavItems,
} from "./profile-nav-items";
import { PageSectionNav, type PageSectionItem } from "./page-section-nav";
import { ThemeToggle } from "../theme-toggle";

type NavItem = { href: string; label: string; icon: React.ReactNode };
type SimpleNavItem = { href: string; label: string };
type NavGroup = { id: string; title: string; items: SimpleNavItem[] };

const QUICK_NAV: NavItem[] = [
  { href: "/", label: "Home", icon: <HomeIcon className="h-4 w-4" /> },
  { href: "/developer", label: "Developer", icon: <CodeIcon className="h-4 w-4" /> },
  {
    href: "/researcher",
    label: "Researcher",
    icon: <FlaskIcon className="h-4 w-4" />,
  },
  {
    href: "/developer/aerosports",
    label: "AeroSports",
    icon: <GridIcon className="h-4 w-4" />,
  },
];

const GLOBAL_NAV: NavItem[] = [
  { href: "/", label: "Home", icon: <HomeIcon className="h-4 w-4" /> },
  {
    href: "/developer/aerosports",
    label: "AeroSports",
    icon: <GridIcon className="h-4 w-4" />,
  },
  {
    href: "/researcher/quantum-computing",
    label: "Quantum Notes",
    icon: <OrbitIcon className="h-4 w-4" />,
  },
  {
    href: "/developer#contact",
    label: "Contact",
    icon: <MailIcon className="h-4 w-4" />,
  },
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [hasResolvedViewport, setHasResolvedViewport] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [pageSections, setPageSections] = useState<PageSectionItem[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const showDocs = pathname.startsWith("/researcher/quantum-computing");
  const isProjectPage = pathname.startsWith("/developer/projects/");
  const isAeroSportsPage = pathname === "/developer/aerosports";
  const supportsSectionNav =
    pathname === "/" ||
    pathname === "/developer" ||
    pathname === "/researcher" ||
    isAeroSportsPage ||
    isProjectPage;
  const quickNavItems = useMemo(
    () =>
      QUICK_NAV.filter((item) =>
        isAeroSportsPage ? item.href !== "/developer/aerosports" : true,
      ),
    [isAeroSportsPage],
  );
  const externalLinks = useMemo(
    () => getProfileNavItems({}).filter((item) => item.external),
    [],
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      const isMobile = mq.matches;
      setHasResolvedViewport(true);
      setIsMobileViewport(isMobile);

      if (isMobile) {
        setSidebarCollapsed(true);
        setMobileSidebarOpen(false);
        return;
      }

      const stored = window.localStorage.getItem("profile-sidebar-collapsed");
      setSidebarCollapsed(stored === "1");
      setMobileSidebarOpen(false);
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isMobileViewport || !mobileSidebarOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileViewport, mobileSidebarOpen]);

  useEffect(() => {
    if (!isMobileViewport || !mobileSidebarOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileViewport, mobileSidebarOpen]);

  useEffect(() => {
    if (isMobileViewport) return;

    window.localStorage.setItem(
      "profile-sidebar-collapsed",
      sidebarCollapsed ? "1" : "0",
    );
  }, [isMobileViewport, sidebarCollapsed]);

  useEffect(() => {
    if (!supportsSectionNav) {
      setPageSections([]);
      setActiveSection(null);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let observer: IntersectionObserver | null = null;

    const collectSections = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-page-section='true']"),
      );
      const nextSections = elements
        .map((element) => ({
          id: element.id,
          label: element.dataset.pageSectionLabel ?? "",
        }))
        .filter((section) => section.id && section.label);

      setPageSections(nextSections);

      if (!nextSections.length) {
        setActiveSection(null);
        return;
      }

      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          if (visible[0]?.target instanceof HTMLElement) {
            setActiveSection(visible[0].target.id);
            return;
          }

          const fallback = nextSections.find((section) => {
            const element = document.getElementById(section.id);
            return element ? element.getBoundingClientRect().top >= 0 : false;
          });

          setActiveSection(fallback?.id ?? nextSections[0]?.id ?? null);
        },
        {
          root: null,
          rootMargin: "-120px 0px -55% 0px",
          threshold: [0.1, 0.25, 0.5, 0.75],
        },
      );

      elements.forEach((element) => observer?.observe(element));
    };

    collectSections();
    timeoutId = setTimeout(collectSections, 120);

    const mutationObserver = new MutationObserver(collectSections);
    mutationObserver.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["id", "data-page-section", "data-page-section-label"],
    });

    window.addEventListener("resize", collectSections);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", collectSections);
    };
  }, [pathname, supportsSectionNav]);

  const motionSafe = "motion-reduce:transition-none";
  const shellOffset = isMobileViewport
    ? "0px"
    : sidebarCollapsed
      ? "var(--sidebar-collapsed)"
      : "var(--sidebar-expanded)";
  const closeMobileSidebar = () => {
    if (isMobileViewport) setMobileSidebarOpen(false);
  };
  const showDesktopSidebar = hasResolvedViewport ? !isMobileViewport : false;
  const showMobileOverlay = hasResolvedViewport ? isMobileViewport : false;

  return (
    <div
      className="relative min-h-screen max-w-full bg-background"
      style={{
        ["--sidebar-expanded" as string]: "clamp(220px, 22vw, 300px)",
        ["--sidebar-collapsed" as string]: "clamp(60px, 6vw, 76px)",
        ["--sidebar-gap" as string]: "16px",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-36 -left-28 h-95 w-95 rounded-full bg-[color:var(--cloud-1)] blur-[120px] opacity-60 animate-float-slow" />
        <div className="absolute top-20 -right-30 h-90 w-90 rounded-full bg-[color:var(--cloud-2)] blur-[120px] opacity-60 animate-float-slow" />
        <div className="absolute -bottom-45 left-[18%] h-110 w-110 rounded-full bg-[color:var(--cloud-3)] blur-[140px] opacity-55 animate-float-slow" />
      </div>

      <header
        className={`fixed top-0 z-40 overflow-x-clip border-b border-black/10 bg-background/90 backdrop-blur transition-[left,width] duration-300 ease-out dark:border-white/10 ${motionSafe}`}
        style={{
          left: showDesktopSidebar ? shellOffset : "0px",
          right: "0px",
        }}
      >
        <div className="flex h-16 w-full max-w-full min-w-0 items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            {showMobileOverlay ? (
              <button
                type="button"
                aria-label="Open navigation"
                onClick={() => setMobileSidebarOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:text-white dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
              >
                <MenuIcon className="h-4 w-4" />
              </button>
            ) : null}
            <Link
              href="/"
              className="min-w-0 truncate font-display text-sm tracking-[0.02em] text-black dark:text-white sm:text-lg"
            >
              Prabesh Kunwar
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Link
              href="/developer"
              className="hidden rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:text-white dark:hover:bg-white/5 dark:focus-visible:ring-white/20 md:inline-flex"
            >
              Developer
            </Link>
            <Link
              href="/researcher"
              className="hidden rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:text-white dark:hover:bg-white/5 dark:focus-visible:ring-white/20 md:inline-flex"
            >
              Researcher
            </Link>
          </div>
        </div>
      </header>

      {showDesktopSidebar ? (
        <aside
          className={`fixed left-0 top-0 z-30 flex h-screen max-w-full flex-col border-r border-black/10 bg-background/95 backdrop-blur transition-[width] duration-300 ease-out dark:border-white/10 ${motionSafe} ${
            sidebarCollapsed ? "w-[var(--sidebar-collapsed)]" : "w-[var(--sidebar-expanded)]"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4">
            {sidebarCollapsed ? (
              <CollapsedTooltip
                label="Open sidebar"
                icon={<PanelOpenIcon className="h-4 w-4" />}
              >
                <button
                  type="button"
                  aria-label="Open sidebar"
                  onClick={() => setSidebarCollapsed(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold tracking-[0.08em] text-black transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:text-white dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
                >
                  PNK
                </button>
              </CollapsedTooltip>
            ) : (
              <Link
                href="/"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-xs font-semibold tracking-[0.08em] text-black transition hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
              >
                PNK
              </Link>
            )}

            {!sidebarCollapsed ? (
              <button
                type="button"
                aria-label="Collapse sidebar"
                onClick={() => setSidebarCollapsed(true)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:text-white dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
              >
                <PanelCloseIcon className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-6 pt-4">
            {!sidebarCollapsed ? (
              <div className="space-y-6 pr-1">
                <SidebarSection title="Quick Navigation">
                  {quickNavItems.map((item) => (
                    <SidebarLink key={item.href} item={item} pathname={pathname} />
                  ))}
                </SidebarSection>

                {supportsSectionNav && pageSections.length ? (
                  <SidebarSection title="On this page">
                    <PageSectionNav
                      sections={pageSections}
                      activeSection={activeSection}
                    />
                  </SidebarSection>
                ) : null}

                {!supportsSectionNav ? (
                  <SidebarSection title="Navigation">
                    {GLOBAL_NAV.map((item) => (
                      <SidebarLink key={item.href} item={item} pathname={pathname} />
                    ))}
                  </SidebarSection>
                ) : null}

                {showDocs ? (
                  <SidebarSection title="Quantum Docs">
                    {DOCS_NAV.map((group) => (
                      <div key={group.id} className="space-y-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/60 dark:text-white/60">
                          {group.title}
                        </p>
                        <div className="space-y-1.5">
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
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                {quickNavItems.map((item) => (
                  <CollapsedTooltip key={item.href} label={item.label}>
                    <IconRailLink item={item} pathname={pathname} />
                  </CollapsedTooltip>
                ))}
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-black/10 px-4 py-4 dark:border-white/10">
            {!sidebarCollapsed ? (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/60 dark:text-white/60">
                  Links
                </p>
                <div className="mt-3 space-y-2">
                  {externalLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-black/70 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:text-white/70 dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
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
                  <CollapsedTooltip key={item.href} label={item.label}>
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black/70 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:text-white/70 dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
                    >
                      <span className="h-4 w-4">{item.icon}</span>
                    </Link>
                  </CollapsedTooltip>
                ))}
              </div>
            )}
          </div>
        </aside>
      ) : null}

      {showMobileOverlay ? (
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[min(86vw,320px)] max-w-full flex-col border-r border-black/10 bg-background/95 backdrop-blur transition-transform duration-300 ease-out dark:border-white/10 ${motionSafe} ${
            mobileSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
        >
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-full px-1 text-xs font-semibold tracking-[0.08em] text-black dark:text-white"
            onClick={closeMobileSidebar}
          >
            PNK
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileSidebarOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:text-white dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-6 pt-4">
          <div className="space-y-6 pr-1">
            <SidebarSection title="Quick Navigation">
              {quickNavItems.map((item) => (
                <SidebarLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onNavigate={closeMobileSidebar}
                />
              ))}
            </SidebarSection>

            {supportsSectionNav && pageSections.length ? (
              <SidebarSection title="On this page">
                <PageSectionNav
                  sections={pageSections}
                  activeSection={activeSection}
                  onNavigate={closeMobileSidebar}
                />
              </SidebarSection>
            ) : null}

            {!supportsSectionNav ? (
              <SidebarSection title="Navigation">
                {GLOBAL_NAV.map((item) => (
                  <SidebarLink
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    onNavigate={closeMobileSidebar}
                  />
                ))}
              </SidebarSection>
            ) : null}

            {showDocs ? (
              <SidebarSection title="Quantum Docs">
                {DOCS_NAV.map((group) => (
                  <div key={group.id} className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/60 dark:text-white/60">
                      {group.title}
                    </p>
                    <div className="space-y-1.5">
                      {group.items.map((item) => (
                        <SidebarLink
                          key={item.href + item.label}
                          item={item}
                          pathname={pathname}
                          compact
                          onNavigate={closeMobileSidebar}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </SidebarSection>
            ) : null}
          </div>
        </div>

        <div className="shrink-0 border-t border-black/10 px-4 py-4 dark:border-white/10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/60 dark:text-white/60">
            Links
          </p>
          <div className="mt-3 space-y-2">
            {externalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileSidebar}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-black/70 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:text-white/70 dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
              >
                <span className="h-4 w-4">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>
      ) : null}

      {showMobileOverlay && mobileSidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
        />
      ) : null}

      <div
        className={`relative w-full max-w-full min-w-0 ${
          isProjectPage
            ? "px-0 pb-0 pt-16 sm:px-6 sm:pb-20 sm:pt-24"
            : "px-4 pb-20 pt-24 sm:px-6"
        } lg:px-10 transition-[padding] duration-300 ease-out ${motionSafe}`}
        style={{
          paddingLeft: showDesktopSidebar
            ? `calc(${shellOffset} + var(--sidebar-gap))`
            : undefined,
        }}
      >
        <div className={`${wide ? "max-w-400" : "max-w-360"} mx-auto w-full max-w-full min-w-0`}>
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
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/60 dark:text-white/60">
        {title}
      </p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function SidebarLink({
  item,
  pathname,
  compact = false,
  onNavigate,
}: {
  item: { href: string; label: string; icon?: React.ReactNode };
  pathname: string;
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const active = isPathActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`flex items-center justify-between rounded-xl px-3 py-2 transition ${
        compact ? "text-xs" : "text-sm"
      } ${
        active
          ? "bg-black/8 font-medium text-black dark:bg-white/8 dark:text-white"
          : "text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
      }`}
    >
      <span className="flex items-center gap-2">
        {item.icon ? <span className="h-4 w-4">{item.icon}</span> : null}
        <span>{item.label}</span>
      </span>
    </Link>
  );
}

function IconRailLink({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const active = isPathActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition ${
        active
          ? "bg-black/8 text-black dark:bg-white/8 dark:text-white"
          : "text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
      }`}
    >
      <span className="h-4 w-4">{item.icon}</span>
    </Link>
  );
}

function CollapsedTooltip({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 12,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  return (
    <div
      ref={anchorRef}
      className="relative flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocusCapture={() => setIsOpen(true)}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget as Node | null)
        ) {
          setIsOpen(false);
        }
      }}
    >
      {children}
      {isMounted
        ? createPortal(
            <div
              className="pointer-events-none fixed z-[120] rounded-lg bg-[color:var(--foreground)] px-3 py-2 text-sm font-medium text-[color:var(--background)] shadow-lg transition duration-200 motion-reduce:transition-none"
              style={{
                left: `${position.left}px`,
                top: `${position.top}px`,
                transform: `translate(${isOpen ? "0px" : "4px"}, -50%)`,
                opacity: isOpen ? 1 : 0,
              }}
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                {icon ? <span className="h-4 w-4">{icon}</span> : null}
                <span>{label}</span>
              </span>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

function HomeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9.5 10 4l7 5.5" />
      <path d="M5.5 8.5V16h9V8.5" />
    </svg>
  );
}

function GridIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="5" height="5" rx="1.2" />
      <rect x="12" y="3" width="5" height="5" rx="1.2" />
      <rect x="3" y="12" width="5" height="5" rx="1.2" />
      <rect x="12" y="12" width="5" height="5" rx="1.2" />
    </svg>
  );
}

function OrbitIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="1.6" />
      <path d="M4 10c0-2.8 2.7-5 6-5s6 2.2 6 5-2.7 5-6 5-6-2.2-6-5Z" />
      <path d="M7 4.8c2.4-1.4 5.7-.8 7.3 1.4s.9 5.3-1.6 6.7-5.7.8-7.3-1.4-.9-5.3 1.6-6.7Z" />
    </svg>
  );
}

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="14" height="10" rx="2" />
      <path d="m4 6 6 5 6-5" />
    </svg>
  );
}

function PanelOpenIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <path d="M8 3v14" />
      <path d="m11 10 3-3" />
      <path d="m11 10 3 3" />
    </svg>
  );
}

function PanelCloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <path d="M8 3v14" />
      <path d="m13 10-3-3" />
      <path d="m13 10-3 3" />
    </svg>
  );
}

function MenuIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 5h14" />
      <path d="M3 10h14" />
      <path d="M3 15h14" />
    </svg>
  );
}

function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 5 10 10" />
      <path d="M15 5 5 15" />
    </svg>
  );
}
