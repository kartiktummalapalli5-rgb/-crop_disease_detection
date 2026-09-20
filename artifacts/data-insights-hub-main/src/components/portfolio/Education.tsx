import { GraduationCap } from "lucide-react";
import { Section, Reveal } from "./Section";
import { EDUCATION } from "./data";

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic journey">
      <div className="relative pl-6 sm:pl-8">
        <span
          className="absolute top-2 bottom-2 left-[9px] w-px sm:left-[13px]"
          style={{ background: "var(--gradient-brand)", opacity: 0.5 }}
          aria-hidden
        />
        <ol className="space-y-6">
          {EDUCATION.map((e, i) => (
            <li key={e.school} className="relative">
              <span className="absolute top-7 -left-6 flex size-[19px] items-center justify-center rounded-full border border-primary/50 bg-background sm:-left-8">
                <span className="size-2 rounded-full bg-primary" />
              </span>
              <Reveal delay={i * 90}>
                <div className="glass card-glow rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold">
                        <GraduationCap className="size-5 text-primary" />
                        {e.school}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{e.place}</p>
                    </div>
                    <span className="rounded-full border border-primary/40 px-3 py-1 font-mono text-xs text-primary">
                      {e.score}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-base">{e.degree}</p>
                  {e.meta.length ? (
                    <p className="mt-1 text-sm text-muted-foreground">{e.meta.join(" · ")}</p>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
