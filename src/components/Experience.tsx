import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    company: "BackSpace International Ltd.",
    role: "Video Editor & Motion Designer",
    period: "2024 - Present",
    description:
      "Leading motion design projects for major brands, creating compelling animations and interactive experiences.",
    skills: ["Premiere Pro", "After Effects", "Photoshop", "CapCut"],
  },
  {
    company: "Child & Old Age Care",
    role: "Video Editor",
    period: "2023 - 2024",
    description:
      "Developed Social content for social media campaigns, explainer videos, and brand identity animations.",
    skills: ["Animation", "Graphic Design", "Video Editing"],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            2+ years of professional experience in motion design and animation
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="bg-card border-border hover-lift cursor-pointer group animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                </div>

                <p className="text-foreground/80 mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
