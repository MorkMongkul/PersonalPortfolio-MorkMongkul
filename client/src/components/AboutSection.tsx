import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SkillBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-top: 8px;
`;

interface SkillProgressProps {
  width: number;
}

const SkillProgress = styled.div<SkillProgressProps>`
  width: ${(props: SkillProgressProps) => props.width}%;
  height: 100%;
  background: linear-gradient(90deg, #ff00ff, #00ffff);
  border-radius: 4px;
  transition: width 1.5s ease-in-out;
`;

const SkillCard = styled.div`
  position: relative;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease-in-out;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;

  h3 {
    color: var(--tw-text-opacity);
    font-weight: bold;
  }

  p {
    color: var(--tw-text-opacity);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 0px 20px rgba(255, 0, 255, 0.6),
                0px 0px 30px rgba(0, 255, 255, 0.6);
    background: linear-gradient(135deg,
                rgba(255, 0, 255, 0.2),
                rgba(0, 255, 255, 0.2));
  }
`;

export default function AboutSection() {
  const text = "About Me";
  const [displayText, setDisplayText] = useState("_");
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const skills = [
    { name: "Data Science", icon: "chart-line", description: "Analyzing, Visualizing, and Modeling data to provide actionable insights using Python,Power BI, and Machine Learning tools.", proficiency: 80 },
    { name: "Mathematics Educator", icon: "chalkboard-teacher", description: "Teaching mathematical concepts to high school students in simple ways with providing high quality class materials.", proficiency: 85 },
    { name: "Graphic Design", icon: "paint-brush", description: "Creative designs for branding, marketing, and visuals.", proficiency: 90 },
    { name: "Web Development", icon: "laptop-code", description: "Building intuitive and responsive websites with modern tools.", proficiency: 70 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <section
      ref={sectionRef}
      id="about"
      className="py-16 md:py-24 bg-white dark:bg-gray-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : '20px'})`,
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          {displayText}
        </h2>

        <div className="flex flex-col md:flex-row gap-12 relative">
          <div 
            className="md:w-1/2 relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateX(${isVisible ? 0 : '-20px'})`,
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            <p className="text-gray-700 mb-6 leading-relaxed dark:text-gray-300">
              I am a <span className="text-[#EC4899] font-medium dark:text-pink-400">Senior Graphic Designer</span> with nearly five years of experience,
              specializing in branding, marketing,visuals design. Proficient in Adobe Photoshop, Illustrator, Premiere Pro and After Effects.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed dark:text-gray-300">
              Beyond design, I am pursuing a degree in <span className="text-[#10B981] font-medium dark:text-green-400">Data Science and Engineering</span>,
              focusing on Python, data analysis, visualization, and machine learning. My ability to blend creativity with data-driven insights allows
              me to craft impactful and strategic designs. Passionate about teaching and inspiring future designers.
            </p>
            <a
              href="/mork_mongkul_me.pdf"
              download="mork_mongkul_me.pdf"
              className="mt-4 inline-block px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-pink-600 hover:to-cyan-600"
            >
              Download CV
            </a>
          </div>

          <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, idx) => (
              <SkillCard
                key={idx}
                style={{
                  animationDelay: `${idx * 0.2}s`,
                  opacity: isVisible ? 1 : 0
                }}
              >
                <div className="text-gray-700 dark:text-gray-100 mb-2 text-2xl">
                  <i className={`fas fa-${skill.icon}`}></i>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{skill.name}</h3>
                <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">{skill.description}</p>
                <SkillBar>
                  <SkillProgress
                    width={isVisible ? skill.proficiency : 0}
                  />
                </SkillBar>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                  {skill.proficiency}%
                </span>
              </SkillCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
