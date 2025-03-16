
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const [professionIndex, setProfessionIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const professions = ["Graphic Designer", "Math Educator", "Data Scientist"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const currentProfession = professions[professionIndex];
    let timer;
    if (isDeleting) {
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
      }, 100);
    } else {
      timer = setTimeout(() => {
        setText((prev) => currentProfession.slice(0, prev.length + 1));
      }, 150);
    }

    if (!isDeleting && text === currentProfession) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setProfessionIndex((prev) => (prev + 1) % professions.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, professionIndex]);

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
            <div className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 h-8 flex">
              {text}
              <span className={cursorVisible ? "inline-block w-2 bg-gray-600 dark:bg-gray-300" : "opacity-0 w-2"}>
                |
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              Bringing creativity, analytical thinking, and educational expertise 
              to every project. I blend design aesthetics with data-driven insights.
            </p>
            <div className="flex space-x-4">
              <Button onClick={() => scrollToSection("projects")}>View My Work</Button>
              <Button variant="outline" onClick={() => scrollToSection("contact")}>Contact Me</Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <div className="absolute inset-0 animate-glow rounded-full"></div>
              <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/profile.jpeg" 
                  alt="MORK Mongkul" 
                  className="rounded-full w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes glow {
          0% { box-shadow: 0 0 20px #ff0000; }
          25% { box-shadow: 0 0 20px #00ff00; }
          50% { box-shadow: 0 0 20px #0000ff; }
          75% { box-shadow: 0 0 20px #ff00ff; }
          100% { box-shadow: 0 0 20px #ff0000; }
        }
        .animate-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%);
          animation: glow 5s infinite alternate;
        }
      `}</style>
    </section>
  );
}
