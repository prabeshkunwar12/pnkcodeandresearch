import Link from "next/link";

export type ProfileNavItem = {
  label: string;
  href: string;
  external?: boolean;
  icon: React.ReactNode;
};

export function CodeIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="m7 6-4 4 4 4" />
      <path d="m13 6 4 4-4 4" />
      <path d="m11.5 3.5-3 13" />
    </svg>
  );
}

export function FlaskIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="M8 3h4" />
      <path d="M9 3v5l-4 6a2 2 0 0 0 1.7 3h6.6A2 2 0 0 0 15 14l-4-6V3" />
      <path d="M6.5 13h7" />
    </svg>
  );
}

export function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="currentColor"
    >
      <path d="M10 .8a9.2 9.2 0 0 0-2.91 17.93c.46.08.63-.2.63-.45l-.01-1.58c-2.56.56-3.1-1.1-3.1-1.1-.42-1.07-1.03-1.36-1.03-1.36-.84-.57.06-.56.06-.56.93.07 1.42.96 1.42.96.83 1.42 2.17 1.01 2.7.77.08-.6.33-1 .6-1.24-2.05-.24-4.2-1.03-4.2-4.57 0-1.01.36-1.83.95-2.48-.1-.24-.41-1.22.09-2.55 0 0 .78-.25 2.56.95a8.9 8.9 0 0 1 4.66 0c1.78-1.2 2.56-.95 2.56-.95.5 1.33.19 2.31.09 2.55.59.65.95 1.47.95 2.48 0 3.55-2.15 4.33-4.21 4.56.34.29.64.85.64 1.72l-.01 2.55c0 .25.17.54.64.45A9.2 9.2 0 0 0 10 .8Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="currentColor"
    >
      <path d="M4.45 3.1A1.35 1.35 0 1 1 1.75 3.1a1.35 1.35 0 0 1 2.7 0ZM1.9 6.05h2.55v11.9H1.9V6.05Zm6.15 0H10.5v1.63h.04c.34-.64 1.19-1.32 2.45-1.32 2.62 0 3.11 1.72 3.11 3.96v7.63h-2.55v-6.77c0-1.62-.03-3.7-2.25-3.7-2.25 0-2.59 1.76-2.59 3.58v6.89H6.26V6.05h1.79Z" />
    </svg>
  );
}

export function getProfileNavItems({
  githubUrl,
  linkedinUrl,
}: {
  githubUrl?: string;
  linkedinUrl?: string;
}): ProfileNavItem[] {
  return [
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
      href: githubUrl ?? "https://github.com/",
      icon: <GitHubIcon />,
      external: true,
    },
    {
      label: "LinkedIn",
      href: linkedinUrl ?? "https://www.linkedin.com/",
      icon: <LinkedInIcon />,
      external: true,
    },
  ];
}

export function ProfileNavList({
  items,
  onItemClick,
}: {
  items: ProfileNavItem[];
  onItemClick?: () => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-2xl border border-[color:var(--line)] px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--chip)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground)]/20"
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          onClick={onItemClick}
        >
          <span className="h-5 w-5">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
