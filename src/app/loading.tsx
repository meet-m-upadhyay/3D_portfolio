export default function Loading() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-on-primary overflow-x-hidden">
      <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col md:flex-row items-center justify-between px-6 md:px-24 overflow-hidden">
        <div className="z-10 w-full md:w-5/12 flex flex-col gap-5 md:gap-6 pt-8 md:pt-0 animate-pulse">
          {/* Status badge */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-surface-container-high"></div>
            <div className="h-3 bg-surface-container-high rounded w-40"></div>
          </div>
          {/* Name */}
          <div className="space-y-3">
            <div className="h-16 md:h-20 bg-surface-container-high rounded-lg w-48"></div>
            <div className="h-16 md:h-20 bg-surface-container-high rounded-lg w-64"></div>
          </div>
          {/* Title */}
          <div className="h-6 bg-surface-container-high rounded w-56"></div>
          {/* Description */}
          <div className="space-y-2 max-w-lg">
            <div className="h-4 bg-surface-container-high rounded w-full"></div>
            <div className="h-4 bg-surface-container-high rounded w-4/5"></div>
            <div className="h-4 bg-surface-container-high rounded w-3/5"></div>
          </div>
          {/* Skill tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-8 bg-surface-container-high rounded-md" style={{ width: `${60 + Math.random() * 40}px` }}></div>
            ))}
          </div>
          {/* CTAs */}
          <div className="flex gap-4 mt-4">
            <div className="h-14 bg-surface-container-high rounded-md w-44"></div>
            <div className="h-14 bg-surface-container-high rounded-md w-36 border border-outline-variant/20"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
