import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
  head: () => ({
    meta: [
      { title: "Resume - Tummalapalli Kartik" },
    ],
  }),
});

function ResumePage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-12 font-sans">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between print:hidden">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 size-4" /> Back to Portfolio
            </Link>
          </Button>
          <Button onClick={() => window.print()}>
            <Printer className="mr-2 size-4" /> Print / Save as PDF
          </Button>
        </div>

        {/* Resume Document */}
        <div className="rounded-xl border bg-card p-8 shadow-sm md:p-12 print:border-none print:shadow-none print:p-0">
          <header className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              TUMMALAPALLI KARTIK
            </h1>
            <h2 className="mt-2 text-xl font-medium text-primary">
              Data Science / Data Analyst Aspirant
            </h2>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
              <span>karthiktummalapalli5@gmail.com</span>
              <span className="hidden sm:inline">•</span>
              <span>+91 9618824887</span>
              <span className="hidden sm:inline">•</span>
              <span>Visakhapatnam, Andhra Pradesh</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
              <a href="https://linkedin.com/in/kartik-tummalapalli-1aab60348" target="_blank" rel="noreferrer" className="hover:text-primary">
                LinkedIn
              </a>
              <span>•</span>
              <a href="https://github.com/kartiktummalapalli5-rgb" target="_blank" rel="noreferrer" className="hover:text-primary">
                GitHub
              </a>
            </div>
          </header>

          <div className="space-y-8">
            <section>
              <h3 className="mb-3 border-b pb-2 text-lg font-semibold uppercase tracking-wider text-foreground">
                Professional Summary
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Motivated B.Tech Data Science student with a strong foundation in Python, SQL, data analytics, data visualization, and machine learning. Hands-on experience developing data-driven projects, AI-powered web applications, and analytical dashboards using Python, Pandas, NumPy, Excel, and Power BI. Familiar with data cleaning, exploratory analysis, visualization, database querying, and building practical solutions from real-world datasets. Strong problem-solving and communication skills with a keen interest in Data Analytics, Data Science, and AI. Seeking an entry-level internship or opportunity to apply technical skills, gain industry experience, and contribute to meaningful data-driven projects.
              </p>
            </section>

            <section>
              <h3 className="mb-3 border-b pb-2 text-lg font-semibold uppercase tracking-wider text-foreground">
                Technical Skills
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="font-medium text-foreground">Programming:</span> Python, Java, C</li>
                <li><span className="font-medium text-foreground">Data Science:</span> Machine Learning, Pandas, NumPy</li>
                <li><span className="font-medium text-foreground">Data Analytics & Visualization:</span> Excel, Power BI</li>
                <li><span className="font-medium text-foreground">Database:</span> SQL</li>
                <li><span className="font-medium text-foreground">Web Technologies:</span> HTML, CSS, JavaScript</li>
                <li><span className="font-medium text-foreground">Tools:</span> Git, GitHub</li>
              </ul>
            </section>

            <section>
              <h3 className="mb-3 border-b pb-2 text-lg font-semibold uppercase tracking-wider text-foreground">
                Projects
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground">EcoBot – AI Chatbot for E-Waste Awareness</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Developed a full-stack web application promoting responsible e-waste disposal through an interactive chatbot, educational dashboard, sustainability quiz, articles, and recycling-center information.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Crop Disease Detection Website</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Developed an AI-powered application that analyzes uploaded crop-leaf images to identify possible diseases and provide useful information for farmers and agricultural users.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-3 border-b pb-2 text-lg font-semibold uppercase tracking-wider text-foreground">
                Education
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground">Vignan's Institute of Information Technology <span className="font-normal text-muted-foreground">— Visakhapatnam, Andhra Pradesh</span></h4>
                  <p className="text-sm text-muted-foreground">B.Tech – Data Science | 3rd Year | Expected Graduation: 2028 | CGPA: 8.5/10</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Sri Chaitanya Junior College <span className="font-normal text-muted-foreground">— Visakhapatnam</span></h4>
                  <p className="text-sm text-muted-foreground">Intermediate | Percentage: 94%</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Sri Chaitanya Techno School <span className="font-normal text-muted-foreground">— Rajam</span></h4>
                  <p className="text-sm text-muted-foreground">10th | Percentage: 95%</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-3 border-b pb-2 text-lg font-semibold uppercase tracking-wider text-foreground">
                Certifications & Achievements
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li><span className="font-medium text-foreground">AI & Generative AI:</span> Prompt Engineering for Artificial Intelligence; Generative AI & Retrieval-Augmented Generation (RAG)</li>
                <li><span className="font-medium text-foreground">Cloud & Database:</span> AWS Cloud Computing / AWS Fundamentals; Amazon DynamoDB</li>
                <li><span className="font-medium text-foreground">Data & Analytics:</span> Data Analytics – Microsoft; Data Analytics with Generative AI; Data Analytics with Python & Pandas; Power BI & Business Intelligence</li>
                <li><span className="font-medium text-foreground">Hackathon:</span> Participated in a Hackathon at Andhra University (AU).</li>
              </ul>
            </section>

            <section>
              <h3 className="mb-3 border-b pb-2 text-lg font-semibold uppercase tracking-wider text-foreground">
                Soft Skills
              </h3>
              <p className="text-sm text-muted-foreground">
                Communication • Teamwork • Problem-Solving • Adaptability • Critical Thinking
              </p>
            </section>

            <section>
              <h3 className="mb-3 border-b pb-2 text-lg font-semibold uppercase tracking-wider text-foreground">
                Languages & Personal Details
              </h3>
              <p className="text-sm text-muted-foreground">
                Languages: Telugu • English • Hindi | Date of Birth: 06 January 2007 | Nationality: Indian
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
