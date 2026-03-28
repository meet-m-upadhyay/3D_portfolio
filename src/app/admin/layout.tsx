export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen text-on-surface">
      <nav className="p-6 border-b border-surface-container-high flex justify-between">
        <span className="font-display text-primary text-xl">Admin Terminal</span>
      </nav>
      {children}
    </div>
  );
}
