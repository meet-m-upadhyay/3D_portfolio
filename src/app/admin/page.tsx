"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/GlassCard";
import { useRouter } from "next/navigation";
import { uploadResumeAction } from "./actions";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  replied: boolean;
  reply_text: string | null;
};

export default function AdminDashboard() {
  const [uploading, setUploading] = useState(false);
  const [loadingGuard, setLoadingGuard] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const router = useRouter();
  
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setLoadingGuard(false);
        loadMessages();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  async function loadMessages() {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setMessages(data);
  }

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed currently.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadResumeAction(formData);
      if (!result.success) {
        if (result.error?.includes("Unauthorized")) router.push("/admin/login");
        throw new Error(result.error);
      }
      alert("Resume deployed and activated successfully.");
    } catch (err: any) {
      console.error("Upload Flow Error:", err);
      alert("Error: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleReply(msg: ContactMessage) {
    if (!replyText.trim()) return;
    setSendingReply(true);
    try {
      const res = await fetch('/api/contact/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: msg.id,
          replyText: replyText,
          toEmail: msg.email,
          toName: msg.name,
        }),
      });
      if (!res.ok) throw new Error('Failed to send reply');
      
      alert(`Reply sent to ${msg.email}`);
      setReplyingTo(null);
      setReplyText("");
      loadMessages();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSendingReply(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  }

  if (loadingGuard) {
    return <div className="p-12 text-center text-primary font-display flex items-center justify-center min-h-[50vh]">Verifying protocol...</div>;
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)]">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full pointer-events-none blur-[100px] -z-10 mix-blend-screen"></div>

      <div className="p-6 md:p-16 max-w-5xl mx-auto space-y-12 relative z-10 pt-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="font-display text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-primary-gradient drop-shadow-glow">Control Center</h1>
            <p className="font-body text-on-surface-variant text-lg mt-2 font-light">Authenticated. Secure uplink established.</p>
          </div>
          <button onClick={handleLogout} className="self-start border border-red-500/30 text-red-400 font-label text-sm px-5 py-2.5 rounded-md transition-all duration-300 hover:bg-red-500/10 hover:border-red-500/50 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
        
        {/* Resume Upload */}
        <GlassCard className="p-8 md:p-12 relative overflow-visible border-outline-variant/30">
          <div className="absolute top-0 left-10 w-24 h-[1px] bg-primary-gradient blur-sm"></div>
          <div className="absolute top-0 left-10 w-12 h-[1px] bg-white"></div>
          <h2 className="font-display text-3xl text-on-surface font-bold mb-4">Resume Deployment</h2>
          <p className="font-body text-on-surface-variant mb-8 text-lg max-w-2xl leading-relaxed">Upload a new PDF to instantly set it as the active resume.</p>
          <div className="flex items-center gap-6">
            <label className="bg-primary-gradient text-white font-display font-medium px-8 py-4 rounded-md cursor-pointer transition-all duration-300 shadow-button-glow hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] hover:scale-[1.02] active:scale-[0.98] border border-white/10 flex items-center justify-center gap-3">
              {uploading ? (
                <><div className="w-5 h-5 rounded-full border-t-2 border-white animate-spin"></div><span>Uploading...</span></>
              ) : (
                <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg><span>Select & Deploy PDF</span></>
              )}
              <input type="file" accept="application/pdf" className="hidden" onChange={handleResumeUpload} disabled={uploading}/>
            </label>
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider">Format: PDF only</span>
          </div>
        </GlassCard>

        {/* Messages Inbox */}
        <GlassCard className="p-8 md:p-12 relative overflow-visible border-outline-variant/30">
          <div className="absolute top-0 left-10 w-24 h-[1px] bg-primary-gradient blur-sm"></div>
          <div className="absolute top-0 left-10 w-12 h-[1px] bg-white"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl text-on-surface font-bold">Inbox</h2>
              <p className="font-body text-on-surface-variant text-sm mt-1">{messages.length} message{messages.length !== 1 ? 's' : ''} received</p>
            </div>
            <button onClick={loadMessages} className="border border-primary/30 text-primary font-label text-sm px-4 py-2 rounded-md hover:bg-primary/10 transition-all flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Refresh
            </button>
          </div>

          {messages.length === 0 ? (
            <div className="p-8 text-center border border-outline-variant/20 rounded-xl bg-surface-container-lowest">
              <p className="text-on-surface-variant font-label">No messages yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`p-6 rounded-xl border transition-all ${msg.replied ? 'bg-surface-container-lowest/50 border-green-500/20' : 'bg-surface-container-lowest border-outline-variant/20 hover:border-primary/30'}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${msg.replied ? 'bg-green-400' : 'bg-primary shadow-glow'}`}></div>
                      <span className="font-display text-on-surface font-bold text-lg">{msg.name}</span>
                      <span className="text-on-surface-variant font-label text-xs">{msg.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {msg.replied && <span className="font-label text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">Replied</span>}
                      <span className="font-label text-xs text-on-surface-variant">{formatDate(msg.created_at)}</span>
                    </div>
                  </div>
                  
                  <p className="font-body text-on-surface-variant mb-4 leading-relaxed whitespace-pre-wrap">{msg.message}</p>

                  {msg.replied && msg.reply_text && (
                    <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="font-label text-xs text-primary mb-2">Your reply:</p>
                      <p className="font-body text-on-surface-variant text-sm whitespace-pre-wrap">{msg.reply_text}</p>
                    </div>
                  )}

                  {/* Reply Section */}
                  {!msg.replied && replyingTo !== msg.id && (
                    <button onClick={() => { setReplyingTo(msg.id); setReplyText(""); }} className="border border-primary/30 text-primary font-label text-sm px-4 py-2 rounded-md hover:bg-primary/10 transition-all flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                      Reply
                    </button>
                  )}

                  {replyingTo === msg.id && (
                    <div className="mt-4 space-y-3">
                      <textarea
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        placeholder={`Reply to ${msg.name}...`}
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/40 text-on-surface font-body h-32 resize-none"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleReply(msg)}
                          disabled={sendingReply || !replyText.trim()}
                          className="bg-primary-gradient text-white font-label text-sm px-6 py-2.5 rounded-md shadow-button-glow hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                          {sendingReply ? <><div className="w-4 h-4 rounded-full border-t-2 border-white animate-spin"></div> Sending...</> : <>Send Reply to {msg.email}</>}
                        </button>
                        <button onClick={() => setReplyingTo(null)} className="border border-outline-variant/30 text-on-surface-variant font-label text-sm px-4 py-2.5 rounded-md hover:bg-white/5 transition-all">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
