import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center selection:bg-primary selection:text-on-primary relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-tertiary/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="relative z-10 max-w-lg">
        <p className="font-display text-[10rem] md:text-[14rem] font-bold text-transparent bg-clip-text bg-primary-gradient leading-none drop-shadow-glow select-none">
          404
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-on-surface font-bold -mt-6 mb-4">
          Signal Lost
        </h1>
        <p className="font-body text-on-surface-variant text-lg mb-8 leading-relaxed">
          The coordinates you entered don&apos;t map to any known location in this system.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-primary-gradient text-white font-display font-medium px-8 py-4 rounded-md transition-all duration-300 shadow-button-glow hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:scale-[1.02] active:scale-[0.98] border border-white/10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Return Home
        </Link>
      </div>
    </main>
  );
}
