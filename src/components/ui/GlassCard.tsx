import { cn } from "@/lib/utils";

export function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "bg-surface-container-low/60 backdrop-blur-xl rounded-xl p-8",
      "border border-white/5 shadow-kinetic relative overflow-hidden group",
      "transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-kinetic-hover hover:border-primary/30",
      className
    )}>
      <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 w-full h-auto">
        {children}
      </div>
    </div>
  );
}
