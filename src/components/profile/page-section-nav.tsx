"use client";

type PageSectionItem = {
  id: string;
  label: string;
};

type PageSectionNavProps = {
  sections: PageSectionItem[];
  activeSection?: string | null;
  collapsed?: boolean;
  onNavigate?: () => void;
};

export function PageSectionNav({
  sections,
  activeSection,
  collapsed = false,
  onNavigate,
}: PageSectionNavProps) {
  if (collapsed || !sections.length) return null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    onNavigate?.();
  };

  return (
    <div className="space-y-1.5">
      {sections.map((section) => {
        const active = activeSection === section.id;

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            aria-current={active ? "true" : undefined}
            className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition ${
              active
                ? "bg-black/8 font-medium text-black dark:bg-white/8 dark:text-white"
                : "text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
            }`}
          >
            <span>{section.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export type { PageSectionItem };
