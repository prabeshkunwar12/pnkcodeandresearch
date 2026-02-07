type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-3xl text-black">{title}</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-black/60">
        {description}
      </p>
    </div>
  );
}
