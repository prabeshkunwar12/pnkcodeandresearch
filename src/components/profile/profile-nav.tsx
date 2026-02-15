import Link from "next/link";

type ProfileNavProps = {
  githubUrl?: string;
  linkedinUrl?: string;
};

function CodeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7 6-4 4 4 4" />
      <path d="m13 6 4 4-4 4" />
      <path d="m11.5 3.5-3 13" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3h4" />
      <path d="M9 3v5l-4 6a2 2 0 0 0 1.7 3h6.6A2 2 0 0 0 15 14l-4-6V3" />
      <path d="M6.5 13h7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
      <path d="M10 .8a9.2 9.2 0 0 0-2.91 17.93c.46.08.63-.2.63-.45l-.01-1.58c-2.56.56-3.1-1.1-3.1-1.1-.42-1.07-1.03-1.36-1.03-1.36-.84-.57.06-.56.06-.56.93.07 1.42.96 1.42.96.83 1.42 2.17 1.01 2.7.77.08-.6.33-1 .6-1.24-2.05-.24-4.2-1.03-4.2-4.57 0-1.01.36-1.83.95-2.48-.1-.24-.41-1.22.09-2.55 0 0 .78-.25 2.56.95a8.9 8.9 0 0 1 4.66 0c1.78-1.2 2.56-.95 2.56-.95.5 1.33.19 2.31.09 2.55.59.65.95 1.47.95 2.48 0 3.55-2.15 4.33-4.21 4.56.34.29.64.85.64 1.72l-.01 2.55c0 .25.17.54.64.45A9.2 9.2 0 0 0 10 .8Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
      <path d="M4.45 3.1A1.35 1.35 0 1 1 1.75 3.1a1.35 1.35 0 0 1 2.7 0ZM1.9 6.05h2.55v11.9H1.9V6.05Zm6.15 0H10.5v1.63h.04c.34-.64 1.19-1.32 2.45-1.32 2.62 0 3.11 1.72 3.11 3.96v7.63h-2.55v-6.77c0-1.62-.03-3.7-2.25-3.7-2.25 0-2.59 1.76-2.59 3.58v6.89H6.26V6.05h1.79Z" />
    </svg>
  );
}

export function ProfileNav({
  githubUrl = "https://github.com/prabeshkunwar12",
  linkedinUrl = "https://www.linkedin.com/in/prabesh-kunwar/",
}: ProfileNavProps) {
  const navItems = [
    {
      label: "Developer",
      href: "/developer",
      icon: <CodeIcon />,
      external: false,
    },
    {
      label: "Research",
      href: "/researcher",
      icon: <FlaskIcon />,
      external: false,
    },
    {
      label: "GitHub",
      href: githubUrl,
      icon: <GitHubIcon />,
      external: true,
    },
    {
      label: "LinkedIn",
      href: linkedinUrl,
      icon: <LinkedInIcon />,
      external: true,
    },
  ] as const;

  return (
    <nav className="flex w-full flex-wrap items-center justify-between gap-4 border-b border-[color:var(--line)] pb-4 text-sm">
      <Link
        className="inline-flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-[color:var(--chip)]"
        href="/"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--line)] text-xs font-semibold tracking-[0.08em] text-[color:var(--foreground)]">
          PNK
        </span>
        <span className="font-display text-base tracking-[0.02em] sm:text-lg">
          Prabesh Kunwar
        </span>
      </Link>

      <div className="ml-auto flex items-center text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
        {navItems.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="mx-1.5 h-5 w-px bg-[color:var(--line)]"
              />
            ) : null}
            <Link
              className="group relative rounded-full p-2.5 transition hover:bg-[color:var(--chip)] hover:text-[color:var(--foreground)]"
              href={item.href}
              aria-label={item.label}
              title={item.label}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              <span className="block h-5 w-5">{item.icon}</span>
              <span className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] hidden -translate-x-1/2 rounded-md border border-[color:var(--line)] bg-[color:var(--chip)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[color:var(--foreground)] shadow-sm group-hover:block group-focus-visible:block">
                {item.label}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
