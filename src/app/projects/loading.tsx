export default function ProjectsLoading() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-24 relative">
      <div className="absolute inset-0 bg-surface-container/30 -skew-y-1 transform origin-top-left z-0"></div>
      <div className="relative z-10 max-w-6xl mx-auto animate-pulse">
        {/* Header */}
        <div className="mb-16">
          <div className="h-3 bg-surface-container-high rounded w-20 mb-4"></div>
          <div className="h-14 bg-surface-container-high rounded-lg w-80 mb-4"></div>
          <div className="h-5 bg-surface-container-high rounded w-96 max-w-full"></div>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-12">
          {[1, 2].map(i => (
            <div key={i} className="bg-surface-container border border-outline-variant/10 rounded-xl p-8 md:p-10">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-surface-container-high rounded-2xl shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-7 bg-surface-container-high rounded w-48"></div>
                  <div className="h-4 bg-surface-container-high rounded w-32"></div>
                  <div className="h-4 bg-surface-container-high rounded w-full"></div>
                  <div className="h-4 bg-surface-container-high rounded w-4/5"></div>
                </div>
              </div>
              <div className="mt-6 ml-0 md:ml-[88px] space-y-3">
                <div className="h-5 bg-surface-container-high rounded w-28"></div>
                <div className="grid grid-cols-2 gap-3">
                  {[1,2,3,4].map(j => (
                    <div key={j} className="h-4 bg-surface-container-high rounded"></div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  {[1,2,3,4,5].map(j => (
                    <div key={j} className="h-7 bg-surface-container-high rounded-md w-16"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
