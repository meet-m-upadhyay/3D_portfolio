"use client";
import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { SkeletonCard, SkeletonStat } from "@/components/ui/Skeleton";
import { useCountUp } from "@/components/ui/CountUp";

type GitHubData = {
  profile: {
    name: string;
    bio: string;
    avatar: string;
    publicRepos: number;
    followers: number;
    following: number;
    profileUrl: string;
  };
  totalStars: number;
  languages: { name: string; percentage: number }[];
  recentRepos: {
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    url: string;
    updatedAt: string;
  }[];
};

const EXPERIENCE = [
  {
    company: "Axtria - Ingenious Insights",
    role: "Senior Software Engineer",
    location: "Bengaluru, India",
    period: "2022 – Present",
    highlights: [
      "Architected multi-agent AI orchestration platform using LangGraph",
      "Engineered hybrid RAG pipeline (ChromaDB + BM25)",
      "Built real-time AI streaming via WebSocket",
      "Led cross-functional team of 8+ members",
    ],
  },
  {
    company: "Tata Consultancy Services",
    role: "Software Developer",
    location: "Pune, India",
    period: "2021 – 2022",
    highlights: [
      "Built backend services using Python & Django serving 5,000+ users",
      "Achieved 35% latency reduction through schema optimization",
    ],
  },
];

const EDUCATION = {
  institution: "Biju Patnaik University of Technology",
  degree: "Bachelor of Technology in Computer Science",
  location: "Bhubaneswar, India",
  period: "2017 – 2021",
  highlights: [
    "Graduated with Honors, CGPA 8.7/10",
    "Top 10% in Computer Science department",
  ],
};

const SKILL_CATEGORIES = [
  { name: "AI / ML", skills: ["LangGraph", "LangChain", "Azure OpenAI", "RAG", "Prompt Engineering", "AutoGen", "Langfuse"] },
  { name: "Backend", skills: ["FastAPI", "Django", "WebSocket", "Pydantic", "REST APIs"] },
  { name: "Databases", skills: ["PostgreSQL", "Redis", "MongoDB", "ChromaDB", "pgvector", "Snowflake"] },
  { name: "DevOps", skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "GitHub Actions", "nginx"] },
];

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Shell: "#89E051",
  Jupyter: "#DA5B0B",
  Dockerfile: "#384D54",
};

function AnimatedStat({ label, value, icon, suffix = "" }: { label: string; value: string | number; icon: string; suffix?: string }) {
  const isNumber = typeof value === 'number';
  const numValue = isNumber ? (value as number) : 0;
  const { ref, count } = useCountUp(numValue, 1500);

  return (
    <GlassCard className="p-6 text-center group">
      <span className="text-2xl mb-2 block">{icon}</span>
      <p ref={ref} className="font-display text-3xl md:text-4xl text-primary font-bold group-hover:drop-shadow-glow transition-all">
        {isNumber ? count : value}{suffix}
      </p>
      <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider mt-2">{label}</p>
    </GlassCard>
  );
}

export default function DashboardSection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-24 relative">
      <div className="absolute inset-0 bg-surface-container/20 skew-y-1 transform origin-bottom-right z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-16">
            <p className="font-label text-xs text-primary uppercase tracking-[0.2em] mb-3">Live Dashboard</p>
            <h2 className="font-display text-5xl md:text-6xl text-on-surface font-bold tracking-tight mb-4">
              Engineering <span className="text-transparent bg-clip-text bg-primary-gradient drop-shadow-glow">Metrics</span>
            </h2>
            <p className="font-body text-on-surface-variant text-lg max-w-2xl">
              Real-time data pulled from GitHub. Career timeline and technical expertise breakdown.
            </p>
          </div>
        </FadeIn>

        {/* GitHub Stats Row */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {loading ? (
              <>
                <SkeletonStat /><SkeletonStat /><SkeletonStat /><SkeletonStat />
              </>
            ) : (
              [
                { label: "Public Repos", value: data?.profile.publicRepos ?? "—", icon: "📦" },
                { label: "GitHub Stars", value: data?.totalStars ?? "—", icon: "⭐" },
                { label: "Followers", value: data?.profile.followers ?? "—", icon: "👥" },
                { label: "Years Experience", value: new Date().getFullYear() - 2021, icon: "🚀", suffix: "+" },
              ].map(stat => (
                <AnimatedStat key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} suffix={stat.suffix} />
              ))
            )}
          </div>
        </FadeIn>

        {/* GitHub Profile CTA */}
        <FadeIn delay={200}>
          <div className="mb-12 flex justify-center">
            <a 
              href="https://github.com/meet-m-upadhyay" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary-gradient text-white font-display font-medium px-8 py-4 rounded-md transition-all duration-300 shadow-button-glow hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:scale-[1.02] active:scale-[0.98] border border-white/10 flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View Full GitHub Profile
            </a>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Language Breakdown */}
          <FadeIn delay={100}>
            <GlassCard className="p-8">
              <h3 className="font-display text-2xl text-on-surface font-bold mb-6">Language Distribution</h3>
              <div className="space-y-4">
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    {[1,2,3,4].map(i => <div key={i} className="h-6 bg-surface-container-high rounded"></div>)}
                  </div>
                ) : (data?.languages || []).map(lang => (
                  <div key={lang.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-label text-sm text-on-surface flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: LANG_COLORS[lang.name] || '#00E5FF' }}></span>
                        {lang.name}
                      </span>
                      <span className="font-label text-sm text-on-surface-variant">{lang.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${lang.percentage}%`, backgroundColor: LANG_COLORS[lang.name] || '#00E5FF' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeIn>

          {/* Recent Repos */}
          <FadeIn delay={200}>
            <GlassCard className="p-8">
              <h3 className="font-display text-2xl text-on-surface font-bold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {loading ? (
                  <div className="space-y-3 animate-pulse">
                    {[1,2,3].map(i => <div key={i} className="h-16 bg-surface-container-high rounded-lg"></div>)}
                  </div>
                ) : (data?.recentRepos || []).map(repo => (
                  <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg bg-surface-container-highest/50 border border-outline-variant/20 hover:border-primary/40 transition-all duration-300 group">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-display text-base text-on-surface font-medium group-hover:text-primary truncate transition-colors">{repo.name}</h4>
                        <p className="font-body text-xs text-on-surface-variant mt-1 line-clamp-1">{repo.description}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 text-on-surface-variant font-label text-xs">
                        {repo.stars > 0 && <span className="flex items-center gap-1">⭐ {repo.stars}</span>}
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: LANG_COLORS[repo.language] || '#00E5FF' }}></span>
                          {repo.language}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        {/* Skills Matrix */}
        <FadeIn>
          <GlassCard className="p-8 md:p-12 mb-12">
            <h3 className="font-display text-2xl text-on-surface font-bold mb-8">Technical Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SKILL_CATEGORIES.map(cat => (
                <div key={cat.name}>
                  <h4 className="font-display text-lg text-primary mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary-gradient rounded-full inline-block"></span>
                    {cat.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map(skill => (
                      <span key={skill} className="bg-surface-container-high border border-outline-variant/30 text-on-surface font-label text-sm px-3 py-1.5 rounded-md hover:border-primary/50 hover:text-primary transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Experience Timeline */}
        <FadeIn>
          <h3 className="font-display text-3xl text-on-surface font-bold mb-8">
            Career <span className="text-transparent bg-clip-text bg-primary-gradient">Timeline</span>
          </h3>
        </FadeIn>
        <div className="space-y-6 relative mb-12">
          <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-primary/20 hidden md:block"></div>
          
          {EXPERIENCE.map((exp, i) => (
            <FadeIn key={i} delay={i * 150}>
              <GlassCard className="p-8 md:p-10 md:ml-12 relative">
                <div className="hidden md:block absolute -left-[calc(3rem+11px)] top-10 w-5 h-5 rounded-full bg-primary shadow-glow border-4 border-background"></div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                  <h4 className="font-display text-2xl text-on-surface font-bold">{exp.company}</h4>
                  <span className="bg-primary/10 border border-primary/30 text-primary font-label text-xs px-3 py-1 rounded-full">{exp.period}</span>
                </div>
                <p className="font-body text-primary/80 text-base mb-1">{exp.role}</p>
                <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider mb-4">{exp.location}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="font-body text-on-surface-variant text-base flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                      {h}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        {/* Education */}
        <FadeIn>
          <h3 className="font-display text-3xl text-on-surface font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-primary-gradient">Education</span>
          </h3>
        </FadeIn>
        <FadeIn delay={100}>
          <GlassCard className="p-8 md:p-10 relative">
            <div className="absolute top-0 left-10 w-24 h-[1px] bg-primary-gradient blur-sm"></div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
              <h4 className="font-display text-2xl text-on-surface font-bold">{EDUCATION.institution}</h4>
              <span className="bg-tertiary/10 border border-tertiary/30 text-tertiary font-label text-xs px-3 py-1 rounded-full">{EDUCATION.period}</span>
            </div>
            <p className="font-body text-primary/80 text-base mb-1">{EDUCATION.degree}</p>
            <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider mb-4">{EDUCATION.location}</p>
            <ul className="space-y-2">
              {EDUCATION.highlights.map((h, j) => (
                <li key={j} className="font-body text-on-surface-variant text-base flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 shrink-0"></span>
                  {h}
                </li>
              ))}
            </ul>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}
