import { Section, Reveal } from "./Section";

const STATS = [
  { value: "8.5/10", label: "CGPA" },
  { value: "3rd Year", label: "B.Tech Data Science" },
  { value: "2+", label: "Major Projects" },
  { value: "2028", label: "Expected Graduation" },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Turning data into meaningful decisions">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            I am a B.Tech Data Science student at Vignan&apos;s Institute of Information Technology,
            currently in my 3rd year. I have developed a strong foundation in Python, SQL, data
            analytics, machine learning, and data visualization.
          </p>
          <p>
            I am particularly interested in transforming data into meaningful insights and building
            practical AI-powered applications. Through academic projects, personal projects,
            certifications, and hackathon participation, I continue to develop both my technical and
            problem-solving abilities.
          </p>
          <p>
            My goal is to build a career in Data Analytics/Data Science and work on real-world
            data-driven problems.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="glass card-glow h-full rounded-2xl p-5">
                <p className="font-display text-2xl font-bold text-gradient">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
