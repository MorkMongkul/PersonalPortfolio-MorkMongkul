
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  const professions = ["Graphic Designer", "Math Educator", "Data Scientist"];
  const [professionIndex, setProfessionIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
      if (charIndex > 0) {
        setTimeout(() => setCharIndex(charIndex - 1), 50);
      } else {
        setIsDeleting(false);
        setProfessionIndex((prev) => (prev + 1) % professions.length);
      }
    } else {
      if (charIndex < currentProfession.length) {
        setTimeout(() => setCharIndex(charIndex + 1), 100);
      } else {
        setTimeout(() => setIsDeleting(true), 1000);
      }
    }
    setDisplayText(currentProfession.slice(0, charIndex));
  }, [charIndex, isDeleting, professionIndex, professions]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="text-dark dark:text-gray-200">Hi, I'm </span>
              <span className="text-primary">MORK Mongkul</span>
            </h1>
            <div className="relative mb-6 text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 h-8">
              {displayText}
              <span className="animate-blink">|</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              Bringing creativity, analytical thinking, and educational expertise to every project. I blend design aesthetics with data-driven insights.
            </p>
            <div className="flex space-x-4">
              <Button onClick={() => scrollToSection("projects")}>
                View My Work
              </Button>
              <Button variant="outline" onClick={() => scrollToSection("contact")}>
                Contact Me
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.1 }}
              initial={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(255,0,0,0.3) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(0,255,0,0.3) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(0,0,255,0.3) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(255,0,0,0.3) 0%, transparent 70%)"
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              <img 
                src="/profile.jpeg" 
                alt="MORK Mongkul" 
                className="rounded-full w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
