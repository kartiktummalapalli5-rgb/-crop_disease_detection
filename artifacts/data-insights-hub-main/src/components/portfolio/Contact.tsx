import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Section, Reveal } from "./Section";
import { PROFILE } from "./data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // No email backend is connected yet: this opens the visitor's mail client.
  // Swap this handler for a server function once an email service is added.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    toast("Opening your email app", {
      description: "No email service is connected yet, so the message is sent from your own inbox.",
    });
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Build Something Meaningful"
      description="I'm open to opportunities, collaborations, internships, and interesting data-driven projects."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="glass h-full rounded-3xl p-6 sm:p-8">
            <ul className="space-y-5">
              {[
                { Icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
                {
                  Icon: Phone,
                  label: "Phone",
                  value: PROFILE.phone,
                  href: `tel:${PROFILE.phone.replace(/\s/g, "")}`,
                },
                { Icon: MapPin, label: "Location", value: PROFILE.location, href: null },
              ].map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="block truncate text-sm hover:text-primary">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <a href={`mailto:${PROFILE.email}`}>
                  <Mail className="size-4" /> Email Me
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="size-4" /> LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href={PROFILE.github} target="_blank" rel="noreferrer">
                  <Github className="size-4" /> GitHub
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the opportunity or idea..."
              />
            </div>
            <Button type="submit" className="mt-5 w-full rounded-full sm:w-auto">
              <Send className="size-4" /> Send Message
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              No email service is connected yet — submitting opens your mail app with the message
              pre-filled.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
