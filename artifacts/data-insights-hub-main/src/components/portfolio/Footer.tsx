import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "./data";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            © 2026 Tummalapalli Kartik. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Built with passion for Data &amp; Technology.
          </p>
        </div>
        <div className="flex items-center gap-3">
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
              className="glass card-glow flex size-10 items-center justify-center rounded-full text-muted-foreground hover:text-primary"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
