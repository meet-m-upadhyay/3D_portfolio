export default function DashboardLoading() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-24 relative">
      <div className="absolute inset-0 bg-surface-container/20 skew-y-1 transform origin-bottom-right z-0"></div>
      <div className="relative z-10 max-w-6xl mx-auto animate-pulse">
        {/* Header */}
        <div className="mb-16">
          <div className="h-3 bg-surface-container-high rounded w-24 mb-4"></div>
          <div className="h-14 bg-surface-container-high rounded-lg w-72 mb-4"></div>
          <div className="h-5 bg-surface-container-high rounded w-96 max-w-full"></div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-surface-container border border-outline-variant/10 rounded-xl p-6 text-center">
              <div className="h-8 w-8 bg-surface-container-high rounded mx-auto mb-3"></div>
              <div className="h-10 bg-surface-container-high rounded w-14 mx-auto mb-2"></div>
              <div className="h-3 bg-surface-container-high rounded w-20 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mb-12 flex justify-center">
          <div className="h-14 bg-surface-container-high rounded-md w-56"></div>
        </div>

        {/* Two column cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[1,2].map(i => (
            <div key={i} className="bg-surface-container border border-outline-variant/10 rounded-xl p-8">
              <div className="h-6 bg-surface-container-high rounded w-40 mb-6"></div>
              <div className="space-y-4">
                {[1,2,3,4].map(j => (
                  <div key={j} className="h-5 bg-surface-container-high rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="bg-surface-container border border-outline-variant/10 rounded-xl p-8 md:p-12 mb-12">
          <div className="h-6 bg-surface-container-high rounded w-44 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1,2,3,4].map(i => (
              <div key={i}>
                <div className="h-5 bg-surface-container-high rounded w-20 mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  {[1,2,3,4,5].map(j => (
                    <div key={j} className="h-8 bg-surface-container-high rounded-md w-20"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
