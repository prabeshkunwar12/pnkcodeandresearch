import Link from "next/link";
import type { ProfileNavItem } from "./profile-nav-items";
import { getProfileNavItems } from "./profile-nav-items";

type ProfileNavProps = {
  githubUrl?: string;
  linkedinUrl?: string;
};

export function ProfileNav({
  githubUrl = "https://github.com/",
  linkedinUrl = "https://www.linkedin.com/",
}: ProfileNavProps) {
  const navItems = getProfileNavItems({ githubUrl, linkedinUrl });

  return (
    <nav className="flex w-full items-center justify-between gap-6 text-sm">
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

      <div className="hidden items-center gap-2 sm:flex">
        {navItems.map((item) => (
          <InlineNavItem key={item.label} item={item} />
        ))}
      </div>
      <div className="flex items-center gap-2 sm:hidden">
        {navItems.map((item) => (
          <InlineNavIcon key={item.label} item={item} />
        ))}
      </div>
    </nav>
  );
}

function InlineNavItem({ item }: { item: ProfileNavItem }) {
  return (
    <Link
      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--chip)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground)]/20"
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
    >
      <span className="h-4 w-4">{item.icon}</span>
      {item.label}
    </Link>
  );
}

function InlineNavIcon({ item }: { item: ProfileNavItem }) {
  return (
    <Link
      aria-label={item.label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--foreground)] transition hover:bg-[color:var(--chip)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground)]/20"
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
    >
      <span className="h-5 w-5">{item.icon}</span>
    </Link>
  );
}
