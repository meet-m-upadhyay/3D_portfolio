export default function ContactLoading() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-24 relative">
      <div className="absolute inset-0 bg-surface-container/20 -skew-y-1 transform origin-bottom-left z-0"></div>
      <div className="relative z-10 max-w-6xl mx-auto animate-pulse">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="h-3 bg-surface-container-high rounded w-20 mx-auto mb-4"></div>
          <div className="h-14 bg-surface-container-high rounded-lg w-64 mx-auto mb-4"></div>
          <div className="h-5 bg-surface-container-high rounded w-80 mx-auto max-w-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-surface-container border border-outline-variant/10 rounded-xl p-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-high rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-surface-container-high rounded w-14"></div>
                    <div className="h-4 bg-surface-container-high rounded w-40"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-surface-container border border-outline-variant/10 rounded-xl p-8 md:p-12">
              <div className="h-7 bg-surface-container-high rounded w-40 mb-2"></div>
              <div className="h-4 bg-surface-container-high rounded w-64 mb-8"></div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-14 bg-surface-container-high rounded-md"></div>
                  <div className="h-14 bg-surface-container-high rounded-md"></div>
                </div>
                <div className="h-40 bg-surface-container-high rounded-md"></div>
                <div className="h-14 bg-surface-container-high rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
