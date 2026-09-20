import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "./data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      let current = "home";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 140) current = link.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-[0_10px_40px_-30px_black]" : "bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#home" className="font-display text-lg font-bold tracking-tight">
          <span className="text-gradient">Kartik</span>
          <span className="ml-1 text-primary">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={cn(
                  "rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  active === l.id && "bg-secondary text-foreground",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
            <a href={PROFILE.resume} download>
              <Download className="size-4" /> Resume
            </a>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border p-2 text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="glass border-t border-border lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="px-3 pt-2 pb-3">
              <Button asChild className="w-full rounded-full">
                <a href={PROFILE.resume} download>
                  <Download className="size-4" /> Resume
                </a>
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
