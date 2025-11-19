import { useRef, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";
import CertificationSection from "@/components/CertificationSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { LocomotiveScrollProvider, useLocomotiveScrollContext } from "@/contexts/LocomotiveScrollContext";

function HomeContent() {
  const { scroll } = useLocomotiveScrollContext();

  // Force scroll update after all content loads
  useEffect(() => {
    if (!scroll) return;

    // Update scroll multiple times to ensure proper height calculation
    const updateScroll = () => {
      scroll.update();
    };

    // Initial update
    updateScroll();

    // Update after images load
    window.addEventListener('load', updateScroll);
    
    // Update after a delay to ensure all content is rendered
    const timeoutId = setTimeout(updateScroll, 500);
    const timeoutId2 = setTimeout(updateScroll, 1000);

    return () => {
      window.removeEventListener('load', updateScroll);
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [scroll]);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <CertificationSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Debug: Check if container is set up correctly
    if (containerRef.current) {
      console.log('✅ Container element exists:', containerRef.current);
      console.log('✅ Container has data-scroll-container:', containerRef.current.hasAttribute('data-scroll-container'));
      console.log('✅ Container classes:', containerRef.current.className);
    } else {
      console.log('❌ Container element is null');
    }
  }, []);

  return (
    <LocomotiveScrollProvider containerRef={containerRef}>
      <div ref={containerRef} data-scroll-container className="font-sans antialiased">
        <HomeContent />
      </div>
    </LocomotiveScrollProvider>
  );
}
