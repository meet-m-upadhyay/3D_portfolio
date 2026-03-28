"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import HeroCanvas from "@/components/3d/HeroCanvas";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { TerminalExperience } from "@/components/ui/Terminal";

const SKILLS = [
  "Python", "FastAPI", "LangGraph", "LangChain", "Azure OpenAI",
  "RAG Pipelines", "Agentic AI", "PostgreSQL", "Docker", "Kubernetes",
  "TypeScript", "Redis", "WebSocket"
];

export default function HeroSection() {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchActiveResume() {
      const { data } = await supabase
        .from("resumes")
        .select("file_url")
        .eq("is_active", true)
        .maybeSingle();
      
      if (data) {
        const { data: publicUrl } = supabase.storage.from("resumes").getPublicUrl(data.file_url);
        setResumeUrl(publicUrl.publicUrl);
      }
    }
    fetchActiveResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col md:flex-row items-center justify-between px-6 md:px-24 bg-transparent overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-tertiary/20 rounded-full pointer-events-none blur-[100px] opacity-40 z-0 hidden md:block mix-blend-screen animate-pulse-glow"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full pointer-events-none blur-[100px] opacity-40 z-0 hidden md:block mix-blend-screen animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      {/* Typography Column */}
      <div className="z-10 w-full md:w-5/12 flex flex-col gap-5 md:gap-6 relative pt-8 md:pt-0">
        {/* Status badge */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.6)] animate-pulse"></div>
          <span className="font-label text-xs text-on-surface-variant uppercase tracking-[0.2em]">Available for opportunities</span>
        </div>

        <h1 className="font-display text-5xl md:text-[5.5rem] text-on-surface leading-[1.05] tracking-tight font-bold">
          Meet <br/> <span className="text-transparent bg-clip-text bg-primary-gradient drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">Upadhyay</span>
        </h1>
        
        <p className="font-display text-xl md:text-2xl text-primary/80 font-medium tracking-tight h-8">
          <TypeWriter />
        </p>

        <p className="font-body text-on-surface-variant text-base md:text-lg max-w-lg leading-relaxed font-light">
          {new Date().getFullYear() - 2021}+ years building scalable backend systems & production-grade <span className="text-primary">Generative AI</span> applications. 
          Architecting multi-agent LLM orchestration platforms, hybrid RAG pipelines, and real-time streaming systems.
        </p>

        {/* Philosophy */}
        <div className="border-l-2 border-primary/40 pl-4 mt-1">
          <p className="font-body text-on-surface-variant/80 text-sm italic leading-relaxed">
            &ldquo;I believe the best systems are the ones you forget are there — invisible, reliable, and impossibly fast.&rdquo;
          </p>
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {SKILLS.map((skill, i) => (
            <span 
              key={skill}
              className="bg-surface-container-high/80 border border-outline-variant/30 text-primary font-label text-xs px-3 py-1.5 rounded-md hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-default animate-stagger-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mt-4">
          {resumeUrl && (
             <a href={resumeUrl} target="_blank" rel="noopener noreferrer" 
                className="bg-primary-gradient text-white font-display font-medium px-8 py-4 rounded-md transition-all duration-300 shadow-button-glow hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:scale-[1.02] active:scale-[0.98] border border-white/10">
                Download Resume
             </a>
          )}
          <a href="/projects" className="border border-primary/30 text-primary font-display font-medium px-8 py-4 rounded-md transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 shadow-kinetic">
            View Projects
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5 mt-4">
          <a href="https://github.com/meet-m-upadhyay" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors duration-300 group" aria-label="GitHub">
            <svg className="w-6 h-6 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/meet-m-upadhyay/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors duration-300 group" aria-label="LinkedIn">
            <svg className="w-6 h-6 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="mailto:meet.m.upadhyay@gmail.com" className="text-on-surface-variant hover:text-primary transition-colors duration-300 group" aria-label="Email">
            <svg className="w-6 h-6 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </a>
        </div>
      </div>
      
      {/* 3D Viewport Column */}
      <div className="relative md:absolute md:inset-0 z-0 w-full md:w-7/12 h-[50vh] min-h-[350px] md:h-screen md:left-[41.666%] flex items-center justify-center opacity-90 mix-blend-lighten mt-8 md:mt-0">
         <div className="w-full h-full animate-float">
           <HeroCanvas />
         </div>
         
         {/* Floating Terminal Overlay (Desktop Only) */}
         <div className="absolute hidden lg:block bottom-16 right-12 z-20 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 ease-out origin-bottom">
           <TerminalExperience />
         </div>
      </div>
    </section>
  );
}
