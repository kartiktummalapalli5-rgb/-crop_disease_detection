import { Trophy } from "lucide-react";
import { Section, Reveal } from "./Section";

export function Achievements() {
  return (
    <Section id="achievements" eyebrow="Achievements" title="Hackathon participation">
      <Reveal>
        <div className="glass card-glow relative overflow-hidden rounded-3xl p-8 sm:p-10">
          <div
            className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--gradient-brand)" }}
          />
          <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
            <Trophy className="size-6" />
          </span>
          <h3 className="mt-5 text-xl font-semibold">Andhra University Hackathon</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Participated in a Hackathon at Andhra University (AU), gaining experience in
            collaborative problem-solving and developing technology-based solutions.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
