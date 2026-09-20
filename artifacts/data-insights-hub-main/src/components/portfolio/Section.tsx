import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", shown && "reveal-in", className)}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative px-5 py-20 sm:px-8 md:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mb-12 max-w-2xl">
          {eyebrow ? (
            <span className="font-mono text-xs tracking-[0.28em] text-primary uppercase">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl md:text-[2.6rem]">{title}</h2>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
