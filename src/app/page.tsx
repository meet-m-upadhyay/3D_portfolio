import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import DashboardSection from "@/components/sections/DashboardSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="w-full selection:bg-primary selection:text-on-primary">
      {/* Desktop: Hero only */}
      <div className="hidden md:block">
        <HeroSection />
      </div>

      {/* Mobile: Infinite scroll with all sections */}
      <div className="md:hidden">
        <div id="home">
          <HeroSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="dashboard">
          <DashboardSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
