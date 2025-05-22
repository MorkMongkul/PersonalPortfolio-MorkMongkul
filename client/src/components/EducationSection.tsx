import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { FaGraduationCap, FaSchool, FaCertificate } from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const EducationCard = styled(motion.div)`
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

  const educationItems = [
    {
      degree: "Bachelor of Data Science in Engineering",
      institution: "Institute of Technology of Cambodia",
      period: "2021-2026",
      icon: <FaGraduationCap />,
      color: "#3B82F6"
    },
    {
      degree: "Graphic Design and Media",
      institution: "Instinct Institute",
      period: "2022-2023 (Graduate)",
      icon: <FaCertificate />,
      color: "#EC4899"
    },
    {
      degree: "BAC II (National Exam)",
      institution: "Hunsen Kransramor High School",
      period: "2018-2021",
      icon: <FaSchool />,
      color: "#10B981"
    },
  ];

  return (
    <section 
      id="education" 
      className="py-16 md:py-24 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Decorative floating elements */}
      <div className="absolute top-40 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <GradientText className="text-3xl md:text-4xl font-bold mb-4">Education</GradientText>
          <GradientLine />
          <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My academic journey and educational qualifications that have shaped my knowledge and expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {educationItems.map((item, index) => (
            <EducationCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : 30 
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800/50 shadow-lg"
            >
              <IconContainer className="icon-container">
                {item.icon}
              </IconContainer>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {item.degree}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2 font-medium">
                {item.institution}
              </p>
              <div className="flex items-center mt-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                  {item.period}
                </span>
              </div>
            </EducationCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection; 