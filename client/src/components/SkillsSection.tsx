import React from "react";
import { useEffect, useRef } from "react";
import { designSkills, mathSkills, dataSkills } from "@/lib/constants";
import { MdOutlineDesignServices } from "react-icons/md";
import { TbMathFunction } from "react-icons/tb";
import { GoDatabase } from "react-icons/go";
import { SiDatadog, SiPython, SiJavascript, SiReact, SiFigma, SiAdobephotoshop, 
         SiAdobeillustrator, SiTensorflow, SiScikitlearn, SiTableau, SiMysql, 
         SiPostgresql, SiMongodb, SiGithub, SiTypescript, SiNextdotjs, SiTailwindcss,
         SiNodedotjs, SiExpress, SiPrisma, SiRedux, SiFirebase } from "react-icons/si";
import { FaRProject, FaBrain, FaServer } from "react-icons/fa";

const webDevSkills = [
  { name: "React.js", percentage: 90, icon: SiReact },
  { name: "Next.js", percentage: 85, icon: SiNextdotjs },
  { name: "TypeScript", percentage: 85, icon: SiTypescript },
  { name: "Node.js", percentage: 80, icon: SiNodedotjs },
  { name: "Express.js", percentage: 80, icon: SiExpress },
  { name: "Prisma", percentage: 75, icon: SiPrisma },
  { name: "Redux", percentage: 85, icon: SiRedux },
  { name: "Tailwind CSS", percentage: 90, icon: SiTailwindcss },
  { name: "Firebase", percentage: 80, icon: SiFirebase },
];

const floatingIcons = [
  { Icon: SiPython, size: 35, color: '#3776AB', name: 'Python' },
  { Icon: SiJavascript, size: 35, color: '#F7DF1E', name: 'JavaScript' },
  { Icon: SiReact, size: 40, color: '#61DAFB', name: 'React' },
  { Icon: SiFigma, size: 30, color: '#F24E1E', name: 'Figma' },
  { Icon: SiAdobephotoshop, size: 35, color: '#31A8FF', name: 'Photoshop' },
  { Icon: SiAdobeillustrator, size: 35, color: '#FF9A00', name: 'Illustrator' },
  { Icon: SiTensorflow, size: 35, color: '#FF6F00', name: 'TensorFlow' },
  { Icon: SiScikitlearn, size: 35, color: '#F7931E', name: 'Scikit-learn' },
  { Icon: SiTableau, size: 30, color: '#E97627', name: 'Tableau' },
  { Icon: SiMysql, size: 35, color: '#4479A1', name: 'MySQL' },
  { Icon: SiPostgresql, size: 35, color: '#4169E1', name: 'PostgreSQL' },
  { Icon: SiMongodb, size: 35, color: '#47A248', name: 'MongoDB' },
  { Icon: FaRProject, size: 30, color: '#276DC3', name: 'R' },
  { Icon: FaBrain, size: 35, color: '#FF5252', name: 'Machine Learning' },
  { Icon: SiGithub, size: 40, color: '#181717', name: 'GitHub' },
];

const skillCategories = [
  {
    title: "Full Stack Development",
    icon: <FaServer />,
    color: "#6366F1",
    description: "Building modern web applications with cutting-edge technologies",
    skills: webDevSkills
  },
  {
    title: "Graphic Design",
    icon: <MdOutlineDesignServices />,
    color: "#EC4899",
    description: "Creating visually appealing designs and user interfaces",
    skills: designSkills.map(skill => ({
      ...skill,
      icon: skill.name === "Adobe Photoshop" ? SiAdobephotoshop :
            skill.name === "Adobe Illustrator" ? SiAdobeillustrator :
            skill.name === "Figma" ? SiFigma : MdOutlineDesignServices
    }))
  },
  {
    title: "Math Education",
    icon: <TbMathFunction />,
    color: "#10B981",
    description: "Teaching advanced mathematics and developing educational content",
    skills: mathSkills
  },
  {
    title: "Data Science",
    icon: <GoDatabase />,
    color: "#3B82F6",
    description: "Analyzing data and building machine learning models",
    skills: dataSkills.map(skill => ({
      ...skill,
      icon: skill.name === "Python" ? SiPython :
            skill.name === "R" ? FaRProject :
            skill.name === "Machine Learning" ? FaBrain :
            skill.name === "TensorFlow" ? SiTensorflow :
            skill.name === "Scikit-learn" ? SiScikitlearn : GoDatabase
    }))
  }
];

function SkillCard({ category, index }: { 
  category: typeof skillCategories[0];
  index: number;
}) {
  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-500"
      style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
    >
      {/* Front side - Always visible */}
      <div className="p-8 relative z-10 h-full flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:translate-y-[-100%]">
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-4 transition-all duration-500 group-hover:scale-90"
          style={{ 
            backgroundColor: `${category.color}20`,
            color: category.color
          }}
        >
          {category.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {category.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
          {category.description}
        </p>
      </div>

      {/* Back side - Visible on hover */}
      <div className="absolute inset-0 p-8 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/50 dark:to-gray-900/50 translate-y-full group-hover:translate-y-0 transition-all duration-500">
        <div className="h-full flex flex-col">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Stack
          </h4>
          <div className="grid grid-cols-3 gap-4 flex-grow">
            {category.skills.map((skill, idx) => {
              const Icon = skill.icon || MdOutlineDesignServices;
              return (
                <div 
                  key={skill.name}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 transition-all duration-300"
                  style={{ 
                    animationDelay: `${idx * 0.1}s`,
                    color: category.color
                  }}
                >
                  <Icon className="text-2xl mb-1" />
                  <span className="text-xs text-gray-700 dark:text-gray-300 text-center">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingIcon({ Icon, color, size, name, delay }: {
  Icon: React.ElementType;
  color: string;
  size: number;
  name: string;
  delay: number;
}) {
  return (
    <div className="group relative p-4">
      <div 
        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap"
        style={{ 
          transform: 'translateY(10px) translateX(-50%)',
          transition: 'all 0.3s ease'
        }}
      >
        {name}
        <div className="absolute bottom-[-4px] left-1/2 w-2 h-2 bg-black/80 -translate-x-1/2 rotate-45" />
      </div>
      <Icon 
        style={{ 
          color,
          fontSize: size,
          animation: `float${delay} 3s ease-in-out infinite`,
        }}
        className="opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-125 cursor-pointer hover:drop-shadow-[0_0_8px_currentColor]"
      />
    </div>
  );
}

function HexagonSkill({ skill, color, index }: { 
  skill: { name: string; percentage: number; icon?: React.ElementType }; 
  color: string;
  index: number;
}) {
  const Icon = skill.icon || MdOutlineDesignServices;
  
  return (
    <div 
      className="group hexagon-item"
      style={{ 
        '--delay': `${index * 0.1}s`,
        '--color': color
      } as React.CSSProperties}
    >
      <div className="hexagon-content">
        <div className="hexagon-inner">
          <Icon className="text-3xl mb-2" />
          <span className="text-sm font-medium">{skill.name}</span>
        </div>
      </div>
    </div>
  );
}

function SkillCategory({ category, index }: { 
  category: typeof skillCategories[0];
  index: number;
}) {
  return (
    <div className="skill-category p-6 rounded-2xl bg-white dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/20 transition-all duration-500 hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <div className="flex items-center mb-6 gap-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ 
            backgroundColor: `${category.color}20`,
            color: category.color
          }}
        >
          {category.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {category.title}
        </h3>
      </div>
      
      <div className="hexagon-grid">
        {category.skills.map((skill, idx) => (
          <HexagonSkill 
            key={skill.name} 
            skill={skill} 
            color={category.color}
            index={idx + (index * category.skills.length)}
          />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
          My Skills
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <SkillCard 
              key={category.title} 
              category={category}
              index={index}
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 py-8 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl">
          {floatingIcons.map((icon, index) => (
            <FloatingIcon
              key={index}
              Icon={icon.Icon}
              color={icon.color}
              size={icon.size}
              name={icon.name}
              delay={index}
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hexagon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
          gap: 1rem;
          padding: 1rem;
          justify-items: center;
          align-items: center;
        }

        .hexagon-item {
          position: relative;
          width: 90px;
          height: 103.92px; /* width * 1.1547 for perfect hexagon */
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
          animation-delay: var(--delay);
        }

        .hexagon-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.95);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          transition: all 0.3s ease-out;
        }

        .hexagon-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0.5rem;
          color: var(--color);
          transform: scale(0.9);
          transition: transform 0.3s ease-out;
        }

        .hexagon-inner span {
          font-size: 0.75rem;
          margin-top: 0.25rem;
          line-height: 1;
          color: var(--tw-text-opacity);
          font-weight: 500;
        }

        .hexagon-item:hover .hexagon-content {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .hexagon-item:hover .hexagon-inner {
          transform: scale(1);
        }

        @media (max-width: 640px) {
          .hexagon-grid {
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          }
          
          .hexagon-item {
            width: 80px;
            height: 92.38px;
          }
          
          .hexagon-inner span {
            font-size: 0.7rem;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        ${floatingIcons.map((_, i) => `
          @keyframes float${i} {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `).join('\n')}
      `}} />
    </section>
  );
}
