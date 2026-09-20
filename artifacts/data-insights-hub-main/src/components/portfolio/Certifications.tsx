import { Award, ExternalLink } from "lucide-react";
import { Section, Reveal } from "./Section";
import { CERTIFICATION_GROUPS } from "./data";

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Courses & certifications"
      description="Certificate links are placeholders and can be updated later."
    >
      <div className="space-y-10">
        {CERTIFICATION_GROUPS.map((group, gi) => (
          <div key={group.category}>
            <Reveal>
              <h3 className="font-mono text-xs tracking-[0.24em] text-primary uppercase">
                {group.category}
              </h3>
            </Reveal>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item, i) => (
                <Reveal key={item} delay={(gi + i) * 60}>
                  <div className="glass card-glow flex h-full flex-col rounded-2xl p-5">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Award className="size-5" />
                    </span>
                    <h4 className="mt-4 text-sm leading-snug font-semibold">{item}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{group.category}</p>
                    <a
                      href="#certifications"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                    >
                      View Certificate <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
