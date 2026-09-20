import {
  BarChart3,
  Braces,
  Code2,
  Database,
  Globe,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Section, Reveal } from "./Section";
import { SKILL_GROUPS } from "./data";

const ICONS: Record<string, LucideIcon> = {
  Programming: Code2,
  "Data Science": Braces,
  "Data Analytics & Visualization": BarChart3,
  Database: Database,
  "Web Technologies": Globe,
  Tools: Wrench,
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technical toolkit"
      description="Foundational and growing capabilities across programming, data science, analytics and web technologies."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, i) => {
          const Icon = ICONS[group.category] ?? Code2;
          return (
            <Reveal key={group.category} delay={i * 70}>
              <div className="glass card-glow h-full rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-base font-semibold">{group.category}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
