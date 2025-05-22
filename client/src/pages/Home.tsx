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

export default function Home() {
  return (
    <div className="font-sans antialiased">
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
    </div>
  );
}
