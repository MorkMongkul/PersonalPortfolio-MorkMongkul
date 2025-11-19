import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FaGraduationCap, FaSchool, FaCertificate } from "react-icons/fa";
import { useLocomotiveScrollContext } from "@/contexts/LocomotiveScrollContext";
import Timeline, { TimelineEntry } from "./Timeline";

const EducationCard = styled.div`
  position: relative;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease-in-out;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    z-index: -1;
  }

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
    background: linear-gradient(135deg,
                rgba(99, 102, 241, 0.1),
                rgba(236, 72, 153, 0.1));
  }

  &:hover .icon-container {
    transform: translateY(-5px);
    background: linear-gradient(135deg, #6366F1, #EC4899);
    color: white;
  }
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  background: rgba(99, 102, 241, 0.1);
  color: #6366F1;
  transition: all 0.3s ease-in-out;
`;

const GradientText = styled.h2`
  background: linear-gradient(to right, #EC4899, #8B5CF6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
`;

const GradientLine = styled.div`
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, #EC4899, #8B5CF6);
  margin: 0 auto;
  border-radius: 2px;
`;

const EducationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { scroll } = useLocomotiveScrollContext();

  // Use Locomotive Scroll events instead of Intersection Observer
  useEffect(() => {
    if (!scroll || !sectionRef.current) return;

    const handleScroll = (args: any) => {
      const section = sectionRef.current as HTMLElement;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = args.scroll.y;
      const windowHeight = window.innerHeight;

      if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
        setIsVisible(true);
      }
    };

    scroll.on("scroll", handleScroll);
    
    if (scroll.scroll) {
      handleScroll({ scroll: scroll.scroll });
    }

    return () => {
      scroll.off("scroll", handleScroll);
    };
  }, [scroll]);

  const educationItems = [
    {
      degree: "Bachelor of Data Science in Engineering",
      institution: "Institute of Technology of Cambodia",
      period: "2021-2026",
      description: "Pursuing a comprehensive degree in data science and engineering, focusing on machine learning, data analysis, and software development. Gaining expertise in Python, statistical analysis, and building data-driven solutions.",
      icon: <FaGraduationCap />,
      color: "#3B82F6"
    },
    {
      degree: "Graphic Design and Media",
      institution: "Instinct Institute",
      period: "2022-2023 (Graduate)",
      description: "Completed a professional certification program in graphic design and media, specializing in digital design, branding, and visual communication. Mastered Adobe Creative Suite and developed skills in creating compelling visual narratives.",
      icon: <FaCertificate />,
      color: "#EC4899"
    },
    {
      degree: "BAC II (National Exam)",
      institution: "Hunsen Kransramor High School",
      period: "2018-2021",
      description: "Successfully completed high school education and passed the national examination with excellent results. Developed strong foundation in mathematics, sciences, and critical thinking skills.",
      icon: <FaSchool />,
      color: "#10B981"
    },
  ];

  const timelineData: TimelineEntry[] = educationItems.map((item) => ({
    title: item.period,
    badge: item.period,
    content: (
      <div>
        {/* Year Badge */}
        {item.period && (
          <div className="mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 whitespace-nowrap shadow-sm">
              {item.period}
            </span>
          </div>
        )}
        
        {/* Icon and Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl">
            {item.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {item.degree}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {item.institution}
            </p>
          </div>
        </div>
        
        {/* Description */}
        {item.description && (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    ),
  }));

  return (
    <section 
      id="education" 
      data-scroll-section
      className="py-16 md:py-24 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Decorative floating elements */}
      <div className="absolute top-40 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-scroll
          data-scroll-speed="1.0"
          className="mb-12 text-center"
        >
          <GradientText className="text-3xl md:text-4xl font-bold mb-4">Education</GradientText>
          <GradientLine />
          <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My academic journey and educational qualifications that have shaped my knowledge and expertise.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
};

export default EducationSection; 