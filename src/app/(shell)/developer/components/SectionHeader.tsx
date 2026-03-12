type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl text-black sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-3xl text-sm text-black/60 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
