import { useEffect, useRef } from "react";
import { designSkills, mathSkills, dataSkills } from "@/lib/constants";

type SkillCardProps = {
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  skills: Array<{ name: string; percentage: number }>;
};

function SkillCard({ title, icon, color, bgColor, skills }: SkillCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-8">
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center ${color} mr-4`}>
          <i className={`${icon} text-xl`}></i>
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div className="skill-item" key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 font-medium">{skill.name}</span>
              <span className="text-gray-500 text-sm">{skill.percentage}%</span>
            </div>
            <div className="skill-bar">
              <div 
                className={`skill-progress ${color.replace('text-', 'bg-')}`} 
                style={{ width: "0%" }}
                data-width={`${skill.percentage}%`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBars = document.querySelectorAll('.skill-progress');
          skillBars.forEach((bar) => {
            const width = (bar as HTMLElement).dataset.width || "0%";
            setTimeout(() => {
              (bar as HTMLElement).style.width = width;
            }, 200);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="py-16 md:py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-header text-3xl md:text-4xl font-bold mb-12 text-center">My Skills</h2>
        
        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <SkillCard 
            title="Graphic Design" 
            icon="fas fa-palette" 
            color="text-[#EC4899]" 
            bgColor="bg-[#EC4899]/10" 
            skills={designSkills}
          />
          
          <SkillCard 
            title="Math Education" 
            icon="fas fa-square-root-alt" 
            color="text-[#10B981]" 
            bgColor="bg-[#10B981]/10" 
            skills={mathSkills}
          />
          
          <SkillCard 
            title="Data Science" 
            icon="fas fa-database" 
            color="text-primary" 
            bgColor="bg-primary/10" 
            skills={dataSkills}
          />
        </div>
      </div>
      
      <style jsx>{`
        .section-header::after {
          content: '';
          display: block;
          width: 50px;
          height: 3px;
          background-color: #3B82F6;
          margin-top: 8px;
          margin-left: auto;
          margin-right: auto;
        }
        .skill-bar {
          position: relative;
          height: 6px;
          background-color: #E5E7EB;
          border-radius: 999px;
          overflow: hidden;
        }
        .skill-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 999px;
          transition: width 1s ease-in-out;
        }
      `}</style>
    </section>
  );
}
