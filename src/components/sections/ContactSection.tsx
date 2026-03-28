"use client";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error('Failed to send');
      
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <section className="py-24 md:py-32 px-6 md:px-24 relative">
      <div className="absolute inset-0 bg-surface-container/20 -skew-y-1 transform origin-bottom-left z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="font-label text-xs text-primary uppercase tracking-[0.2em] mb-3">Get In Touch</p>
            <h2 className="font-display text-5xl md:text-6xl text-on-surface font-bold tracking-tight mb-4">
              Let&apos;s <span className="text-transparent bg-clip-text bg-primary-gradient drop-shadow-glow">Connect</span>
            </h2>
            <p className="font-body text-on-surface-variant text-lg max-w-xl mx-auto">
              Interested in collaborating or have an opportunity? Send me a message and I&apos;ll get back to you.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Contact Info Column */}
          <FadeIn direction="left" className="lg:col-span-2 space-y-6">
            
            {/* Response Time Indicator */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/30 relative">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
                <div className="absolute inset-0 rounded-full border border-green-500/20 animate-ping" style={{ animationDuration: '3s' }}></div>
              </div>
              <div>
                <h4 className="font-display text-sm text-on-surface font-semibold mb-0.5">Response Time</h4>
                <p className="font-body text-xs text-on-surface-variant">Typically replies within <span className="text-primary font-medium">12 hours</span></p>
              </div>
            </div>

            <a href="mailto:meet.m.upadhyay@gmail.com" className="block">
              <GlassCard className="p-8 group cursor-pointer hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:shadow-glow transition-all">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider">Email</p>
                    <p className="font-body text-on-surface group-hover:text-primary transition-colors text-sm">meet.m.upadhyay@gmail.com</p>
                  </div>
                </div>
              </GlassCard>
            </a>

            <a href="https://www.linkedin.com/in/meet-m-upadhyay/" target="_blank" rel="noopener noreferrer" className="block">
              <GlassCard className="p-8 group cursor-pointer hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:shadow-glow transition-all">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </div>
                  <div>
                    <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider">LinkedIn</p>
                    <p className="font-body text-on-surface group-hover:text-primary transition-colors text-sm">meet-m-upadhyay</p>
                  </div>
                </div>
              </GlassCard>
            </a>

            <a href="https://github.com/meet-m-upadhyay" target="_blank" rel="noopener noreferrer" className="block">
              <GlassCard className="p-8 group cursor-pointer hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:shadow-glow transition-all">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </div>
                  <div>
                    <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider">GitHub</p>
                    <p className="font-body text-on-surface group-hover:text-primary transition-colors text-sm">meet-m-upadhyay</p>
                  </div>
                </div>
              </GlassCard>
            </a>

            <GlassCard className="p-8 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:shadow-glow transition-all">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider">Location</p>
                  <p className="font-body text-on-surface text-sm">Bengaluru, India</p>
                </div>
              </div>
            </GlassCard>
          </FadeIn>

          {/* Contact Form Column */}
          <FadeIn direction="right" delay={200} className="lg:col-span-3">
            <GlassCard className="p-8 md:p-12 relative overflow-visible">
              <div className="absolute top-0 right-10 w-24 h-[1px] bg-primary-gradient blur-sm"></div>
              <div className="absolute top-0 right-10 w-12 h-[1px] bg-white"></div>

              <h3 className="font-display text-2xl text-on-surface font-bold mb-2">Send a Message</h3>
              <p className="font-body text-on-surface-variant text-sm mb-8">Your message will be delivered directly to my inbox.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-on-surface font-body relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label text-xs text-primary uppercase tracking-widest pl-1">Full Name</label>
                    <input name="name" placeholder="Your name" className="w-full bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-button-glow transition-all duration-300 placeholder:text-on-surface-variant/40" required />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-xs text-primary uppercase tracking-widest pl-1">Email</label>
                    <input name="email" type="email" placeholder="name@company.com" className="w-full bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-button-glow transition-all duration-300 placeholder:text-on-surface-variant/40" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label text-xs text-primary uppercase tracking-widest pl-1">Message</label>
                  <textarea name="message" placeholder="Tell me about the opportunity or project..." className="w-full bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-button-glow transition-all duration-300 placeholder:text-on-surface-variant/40 h-40 resize-none" required />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 bg-primary-gradient text-white font-display font-bold p-4 rounded-md transition-all duration-300 shadow-button-glow hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] hover:scale-[1.02] active:scale-[0.98] border border-white/10 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <><div className="w-5 h-5 rounded-full border-t-2 border-white animate-spin"></div> Sending...</>
                  ) : (
                    <><span>Send Message</span><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></>
                  )}
                </button>

                {status === "sent" && (
                  <div className="p-4 border border-green-500/30 bg-green-500/10 rounded-md flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.6)]"></div>
                    <p className="font-label text-sm text-green-400">Message sent successfully! I&apos;ll get back to you soon.</p>
                  </div>
                )}
                {status === "error" && (
                  <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-md flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <p className="font-label text-sm text-red-400">Failed to send. Please try again or email me directly.</p>
                  </div>
                )}
              </form>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
