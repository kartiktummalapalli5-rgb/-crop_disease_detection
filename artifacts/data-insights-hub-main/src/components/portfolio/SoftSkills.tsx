import { Brain, Languages as LanguagesIcon, MessageCircle, Puzzle, RefreshCw, Users } from "lucide-react";
import { Section, Reveal } from "./Section";
import { SOFT_SKILLS, LANGUAGES } from "./data";

const ICONS = [MessageCircle, Users, Puzzle, RefreshCw, Brain];

export function SoftSkills() {
  return (
    <Section id="soft-skills" eyebrow="Beyond code" title="Soft skills & languages">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {SOFT_SKILLS.map((s, i) => {
          const Icon = ICONS[i] ?? Brain;
          return (
            <Reveal key={s} delay={i * 60}>
              <div className="glass card-glow flex h-full flex-col items-start gap-3 rounded-2xl p-5">
                <Icon className="size-5 text-primary" />
                <p className="text-sm font-medium">{s}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120}>
        <div className="glass mt-6 flex flex-wrap items-center gap-3 rounded-2xl p-5">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <LanguagesIcon className="size-4 text-primary" /> Languages
          </span>
          {LANGUAGES.map((l) => (
            <span
              key={l}
              className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-sm"
            >
              {l}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
