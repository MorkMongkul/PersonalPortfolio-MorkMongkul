import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

export default function AboutSection() {
  const text = "About Me";
  const [displayText, setDisplayText] = useState("_");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1) + text[index] + "_");
        setIndex((prevIndex) => prevIndex + 1);
      }, Math.random() * 200 + 50);
      return () => clearTimeout(timeout);
    } else {
      setDisplayText(text);
    }
  }, [index]);

  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-900 relative"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-gray-100">
          {displayText}
        </h2>

        <div className="flex flex-col md:flex-row gap-12 relative">
          <div className="md:w-1/2 relative">
            <p className="text-gray-700 mb-6 leading-relaxed dark:text-gray-300"> 
              I am a <span className="text-[#EC4899] font-medium dark:text-pink-400">Senior Graphic Designer</span> with nearly five years of experience,
              specializing in branding, marketing visuals, and motion design. Proficient in Adobe Photoshop, Illustrator, Premiere Pro, and Cinema 4D.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed dark:text-gray-300">
              Beyond design, I am pursuing a degree in <span className="text-[#10B981] font-medium dark:text-green-400">Data Science and Engineering</span>,
              focusing on Python, data analysis, visualization, and machine learning. My ability to blend creativity with data-driven insights allows
              me to craft impactful and strategic designs. Passionate about teaching and inspiring future designers.
            </p>
            <a
              href="#"
              className="mt-4 inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl glow-effect"
            >
              Download CV
            </a>
          </div>

          <div className="md:w-1/2 grid grid-cols-2 gap-6">
            {[
              { name: "Graphic Design", color: "from-pink-500 to-red-500", icon: "paint-brush" },
              { name: "Math Education", color: "from-green-500 to-teal-500", icon: "chalkboard-teacher" },
              { name: "Data Science", color: "from-blue-500 to-indigo-500", icon: "chart-line" },
              { name: "Web Development", color: "from-gray-700 to-black", icon: "laptop-code" },
            ].map((skill, idx) => (
              <div
                key={idx}
                className={`relative p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 border-2 border-transparent bg-gradient-to-br ${skill.color} animate-gradient`}
              >
                <div className="text-gray-100 mb-2 text-2xl">
                  <i className={`fas fa-${skill.icon}`}></i>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-100">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Robot Following Cursor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <Spline scene="https://prod.spline.design/gOKe4Vhy1Uijk9n8/scene.splinecode" />
      </div>

      <style jsx>{`
        .glow-effect {
          box-shadow: 0px 0px 15px rgba(59, 130, 246, 0.8);
        }

        @keyframes gradientBorder {
          0% { border-color: #ff00ff; }
          25% { border-color: #00ffff; }
          50% { border-color: #00ff00; }
          75% { border-color: #ffff00; }
          100% { border-color: #ff00ff; }
        }
        .animate-gradient {
          animation: gradientBorder 3s infinite alternate;
          border-width: 3px;
        }
      `}</style>
    </section>
  );
}