import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PROFILE } from "./data";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "var(--gradient-brand)" }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8">
        <div>
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase">
            Hello, I&apos;m
          </span>
          <h1 className="mt-5 text-4xl leading-[1.05] font-bold sm:text-5xl md:text-6xl">
            <span className="text-gradient">{PROFILE.name}</span>
          </h1>
          <p className="mt-4 font-display text-lg text-foreground/90 sm:text-xl">{PROFILE.title}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Motivated Data Science student with a strong foundation in Python, SQL, data analytics,
            and machine learning. I enjoy building practical, data-driven solutions and AI-powered
            applications.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group rounded-full">
              <a href="#projects">
                View My Projects
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to={PROFILE.resume}>
                <FileText className="size-4" /> View Resume
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {[
              { href: PROFILE.github, Icon: Github, label: "GitHub" },
              { href: PROFILE.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${PROFILE.email}`, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="glass card-glow flex size-11 items-center justify-center rounded-full text-muted-foreground hover:text-primary"
              >
                <Icon className="size-5" />
              </a>
            ))}
            <span className="ml-2 hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
              <MapPin className="size-4 text-primary" /> {PROFILE.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
