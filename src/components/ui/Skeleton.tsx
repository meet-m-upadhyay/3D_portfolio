export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-surface-container border border-outline-variant/10 rounded-xl overflow-hidden ${className}`}>
      <div className="animate-pulse p-8 space-y-4">
        <div className="h-4 bg-surface-container-high rounded w-1/3"></div>
        <div className="h-3 bg-surface-container-high rounded w-full"></div>
        <div className="h-3 bg-surface-container-high rounded w-4/5"></div>
        <div className="flex gap-2 mt-4">
          <div className="h-6 bg-surface-container-high rounded-md w-16"></div>
          <div className="h-6 bg-surface-container-high rounded-md w-20"></div>
          <div className="h-6 bg-surface-container-high rounded-md w-14"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonStat() {
  return (
    <div className="bg-surface-container border border-outline-variant/10 rounded-xl p-6 text-center animate-pulse">
      <div className="h-8 w-8 bg-surface-container-high rounded mx-auto mb-3"></div>
      <div className="h-8 bg-surface-container-high rounded w-12 mx-auto mb-2"></div>
      <div className="h-3 bg-surface-container-high rounded w-20 mx-auto"></div>
    </div>
  );
}
