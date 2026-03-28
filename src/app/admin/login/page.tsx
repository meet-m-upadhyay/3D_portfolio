"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      router.push("/admin");
    } else {
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tertiary/10 rounded-full pointer-events-none blur-[100px] -z-10"></div>
      
      <GlassCard className="p-8 md:p-12 w-full max-w-md relative overflow-visible border-outline-variant/30 hover:border-primary/40">
        <div className="absolute top-0 right-10 w-24 h-[1px] bg-primary-gradient blur-sm"></div>
        <div className="absolute top-0 right-10 w-12 h-[1px] bg-white"></div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6 relative z-10 w-full">
          <div className="mb-4">
            <h1 className="font-display text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-primary-gradient mb-2 drop-shadow-glow">Admin Protocol</h1>
            <p className="font-body text-on-surface-variant text-sm">Authentication required required for terminal access.</p>
          </div>
          
          <div className="space-y-2">
            <label className="font-label text-xs text-primary uppercase tracking-widest pl-1">Identifier</label>
            <input type="email" placeholder="name@domain.com" className="w-full bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-button-glow transition-all duration-300 placeholder:text-on-surface-variant/40 text-on-surface font-body" onChange={e => setEmail(e.target.value)} required/>
          </div>

          <div className="space-y-2">
            <label className="font-label text-xs text-primary uppercase tracking-widest pl-1">Passcode</label>
            <input type="password" placeholder="••••••••" className="w-full bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-button-glow transition-all duration-300 placeholder:text-on-surface-variant/40 text-on-surface font-body" onChange={e => setPassword(e.target.value)} required/>
          </div>

          <button type="submit" className="mt-4 bg-primary-gradient text-white font-display font-bold p-4 rounded-md transition-all duration-300 shadow-button-glow hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] hover:scale-[1.02] active:scale-[0.98] border border-white/10 flex items-center justify-center gap-3">
            <span>Authenticate</span>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </form>
      </GlassCard>
    </div>
  );
}
