import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Education } from "@/components/portfolio/Education";
import { Certifications } from "@/components/portfolio/Certifications";
import { Achievements } from "@/components/portfolio/Achievements";
import { SoftSkills } from "@/components/portfolio/SoftSkills";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const TITLE = "Tummalapalli Kartik | Data Science Student & Aspiring Data Analyst";
const DESCRIPTION =
  "Portfolio of Tummalapalli Kartik, a Data Science student and aspiring Data Analyst specializing in Python, SQL, data analytics, machine learning, Power BI, and AI-powered applications.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Tummalapalli Kartik",
          jobTitle: "Data Science Student | Aspiring Data Analyst",
          email: "mailto:karthiktummalapalli5@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Visakhapatnam",
            addressRegion: "Andhra Pradesh",
            addressCountry: "IN",
          },
          alumniOf: "Vignan's Institute of Information Technology",
          sameAs: [
            "https://linkedin.com/in/kartik-tummalapalli-1aab60348",
            "https://github.com/kartiktummalapalli5-rgb",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Achievements />
        <SoftSkills />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
