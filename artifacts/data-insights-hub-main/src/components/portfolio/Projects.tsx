import { ArrowUpRight, Github, Leaf, Bot, Sparkles } from "lucide-react";
import { Section, Reveal } from "./Section";
import { PROJECTS } from "./data";
import { Button } from "@/components/ui/button";

const ICONS = [Bot, Leaf];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="Practical, data-driven applications built while learning and experimenting."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {PROJECTS.map((p, i) => {
          const Icon = ICONS[i] ?? Bot;
          return (
            <Reveal key={p.title} delay={i * 90}>
              <article className="glass card-glow group flex h-full flex-col overflow-hidden rounded-3xl">
                <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-border">
                  <div className="grid-bg absolute inset-0 opacity-50" />
                  <div
                    className="absolute inset-0 opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-35"
                    style={{ background: "var(--gradient-brand)" }}
                  />
                  <Icon className="relative size-14 text-primary transition-transform duration-500 group-hover:scale-110" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3 pt-2">
                    <Button asChild size="sm" className="rounded-full">
                      <a href={p.demo} target="_blank" rel="noreferrer">
                        View Project <ArrowUpRight className="size-4" />
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="rounded-full">
                      <a href={p.github} target="_blank" rel="noreferrer">
                        <Github className="size-4" /> GitHub
                      </a>
                    </Button>
                  </div>
                  <p className="mt-3 text-[11px] text-muted-foreground/70">
                    Links are placeholders — update them anytime.
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={140}>
        <div className="mt-6 flex items-center justify-center gap-3 rounded-3xl border border-dashed border-border p-8 text-muted-foreground">
          <Sparkles className="size-5 text-primary" />
          <p className="text-sm">More projects coming soon</p>
        </div>
      </Reveal>
    </Section>
  );
}
