import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type CardVariant = "surface" | "soft" | "chip";

type CardProps<T extends ElementType = "div"> = {
  as?: T;
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

const variantMap: Record<CardVariant, string> = {
  surface: "bg-[color:var(--surface)]",
  soft: "soft-card",
  chip: "bg-[color:var(--chip)]",
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Card<T extends ElementType = "div">({
  as,
  variant = "chip",
  hover = false,
  className,
  children,
  ...props
}: CardProps<T>) {
  const Component = (as || "div") as ElementType;

  return (
    <Component
      className={cx(
        "rounded-2xl border border-[color:var(--line)]",
        variantMap[variant],
        hover &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
