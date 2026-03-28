"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { SkeletonCard } from "@/components/ui/Skeleton";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  technologies: string[];
  impact: string;
  source_url: string | null;
  project_url: string | null;
  accent_color: string;
  display_order: number;
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadProjects() {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      if (data) setProjects(data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-24 relative">
      <div className="absolute inset-0 bg-surface-container/30 -skew-y-1 transform origin-top-left z-0"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-16">
            <p className="font-label text-xs text-primary uppercase tracking-[0.2em] mb-3">Portfolio</p>
            <h2 className="font-display text-5xl md:text-6xl text-on-surface font-bold tracking-tight mb-4">
              Featured <span className="text-transparent bg-clip-text bg-primary-gradient drop-shadow-glow">Projects</span>
            </h2>
            <p className="font-body text-on-surface-variant text-lg max-w-2xl">
              Production systems I&apos;ve architected and shipped — from personal AI applications to enterprise-scale platforms.
            </p>
          </div>
        </FadeIn>

        {loading && (
          <div className="flex flex-col gap-8">
            <SkeletonCard className="h-64" />
            <SkeletonCard className="h-64" />
          </div>
        )}

        <div className="flex flex-col gap-12">
          {projects.map((p, index) => {
            const color = p.accent_color || "#00E5FF";
            return (
              <FadeIn key={p.id} delay={index * 150}>
                <GlassCard className="p-8 md:p-10 group relative overflow-visible">
                  <div className="absolute top-0 left-10 w-24 h-[2px] rounded-full blur-sm" style={{ backgroundColor: color }}></div>
                  <div className="absolute top-0 left-10 w-12 h-[2px] rounded-full" style={{ backgroundColor: color }}></div>

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border group-hover:scale-110 transition-all duration-500" style={{ backgroundColor: `${color}15`, borderColor: `${color}40` }}>
                        <span className="font-display text-2xl font-bold" style={{ color }}>0{index + 1}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                          <h3 className="font-display text-2xl md:text-3xl text-on-surface font-bold group-hover:text-primary transition-colors">{p.title}</h3>
                          {p.impact && (
                            <span className="shrink-0 border font-label text-xs px-3 py-1 rounded-full" style={{ backgroundColor: `${color}15`, borderColor: `${color}40`, color }}>
                              {p.impact}
                            </span>
                          )}
                        </div>
                        {p.subtitle && <p className="font-label text-sm uppercase tracking-wider mb-4" style={{ color }}>{p.subtitle}</p>}
                        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed">{p.description}</p>
                      </div>
                    </div>

                    {p.features && p.features.length > 0 && (
                      <div className="ml-0 md:ml-[88px]">
                        <h4 className="font-display text-lg text-on-surface font-medium mb-4 flex items-center gap-2">
                          <span className="w-1.5 h-5 rounded-full inline-block" style={{ backgroundColor: color }}></span>
                          Key Features
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {p.features.map((feat, j) => (
                            <li key={j} className="font-body text-on-surface-variant text-sm flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }}></span>
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="ml-0 md:ml-[88px] flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex flex-wrap gap-2 flex-1">
                        {p.technologies?.map(tech => (
                          <span key={tech} className="bg-surface-container-high border border-outline-variant/30 text-primary font-label text-xs px-3 py-1.5 rounded-md hover:border-primary/50 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        {p.source_url && (
                          <a href={p.source_url} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-label text-sm border border-outline-variant/30 px-4 py-2 rounded-md hover:border-primary/40">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            <span>View Source</span>
                          </a>
                        )}
                        {p.project_url && (
                          <a href={p.project_url} target="_blank" rel="noopener noreferrer" className="text-white bg-primary-gradient font-label text-sm px-4 py-2 rounded-md shadow-button-glow hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 border border-white/10">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            <span>View Project</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
