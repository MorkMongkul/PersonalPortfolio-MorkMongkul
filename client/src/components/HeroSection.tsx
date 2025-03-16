import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Spline from "@splinetool/react-spline";

export default function HeroSection() {
  const [professionIndex, setProfessionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const professions = ["Graphic Designer", "Math Educator", "Data Scientist"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setProfessionIndex((prevIndex) => (prevIndex + 1) % professions.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="text-dark dark:text-gray-200">Hi, I'm </span>
              <span className="text-primary">MORK Mongkul</span>
            </h1>
            <div className="relative mb-6">
              <div
                className={`text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 h-8 transition-opacity duration-500 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                {professions[professionIndex]}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              Bringing creativity, analytical thinking, and educational expertise
              to every project. I blend design aesthetics with data-driven insights.
            </p>
            <div className="flex space-x-4">
              <Button onClick={() => scrollToSection("projects")}>View My Work</Button>
              <Button variant="outline" onClick={() => scrollToSection("contact")}>
                Contact Me
              </Button>
            </div>
          </div>

          {/* Profile + Robot Container */}
          <div className="md:w-1/2 flex justify-center relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 profile-container group">
              <div className="absolute inset-0 bg-primary/10 rounded-full transition-all duration-300 group-hover:bg-primary/20"></div>
              <div className="absolute -top-3 -left-3 w-full h-full bg-[#EC4899]/10 rounded-full transition-all duration-500 group-hover:bg-[#EC4899]/30 group-hover:-top-4 group-hover:-left-4"></div>
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#10B981]/10 rounded-full transition-all duration-500 group-hover:bg-[#10B981]/30 group-hover:-bottom-4 group-hover:-right-4"></div>
              <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/profile.jpeg"
                  alt="MORK Mongkul"
                  className="rounded-full w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            {/* 3D Robot */}
            <div className="absolute -right-32 md:right-0 w-48 h-48 md:w-64 md:h-64">
              <Spline scene="https://prod.spline.design/gOKe4Vhy1Uijk9n8/scene.splinecode" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}