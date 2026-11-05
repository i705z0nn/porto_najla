import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { Cursor } from "@/components/ui/cursor";
import { Loader } from "@/components/ui/loader";
import { Marquee } from "@/components/ui/marquee";
import { NavBar } from "@/components/ui/nav-bar";
import { SocialDock } from "@/components/ui/social-dock";

function App() {
  const [loading, setLoading] = useState(
    () => !new URLSearchParams(window.location.search).has("skip-loader"),
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading || !window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    window.requestAnimationFrame(() => target?.scrollIntoView({ behavior: "auto" }));
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <Loader visible={loading} />
      <Cursor />
      <NavBar />
      <main>
        <HeroSection ready={!loading} />
        <Marquee />
        <ProjectsSection />
        <ServicesSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
      </main>
      <Footer />
      <SocialDock />
    </MotionConfig>
  );
}

export default App;
