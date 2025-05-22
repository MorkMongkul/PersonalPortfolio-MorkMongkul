import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaAward, FaCertificate, FaMedal } from "react-icons/fa";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const pulseEffect = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(236, 72, 153, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(236, 72, 153, 0);
  }
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

const CertificationCard = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  
  &:hover {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.05), rgba(139, 92, 246, 0.05));
    border-color: rgba(236, 72, 153, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  &:hover .icon-wrapper {
    animation: ${pulseEffect} 1.5s infinite;
    background: linear-gradient(135deg, #EC4899, #8B5CF6);
    color: white;
  }
  
  &:hover .cert-text {
    transform: translateX(8px);
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(236, 72, 153, 0.1);
  color: #EC4899;
  transition: all 0.3s ease-in-out;
`;

const CertificationSection = () => {
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

  const certifications = [
    {
      name: "Data Scientist Nanodegree Program",
      provider: "Udacity",
      icon: <FaAward className="h-4 w-4" />
    },
    {
      name: "Google Data Analytics",
      provider: "Coursera",
      icon: <FaCertificate className="h-4 w-4" />
    },
    {
      name: "SQL and Relational Databases 101",
      provider: "Conigtive",
      icon: <FaAward className="h-4 w-4" />
    },
    {
      name: "Microsoft Power BI Data Analyst",
      provider: "Coursera",
      icon: <FaCertificate className="h-4 w-4" />
    },
    {
      name: "Data Warehouse Concepts, Design, and Data Integration",
      provider: "Coursera",
      icon: <FaAward className="h-4 w-4" />
    },
    {
      name: "Machine Learning Specialization 2022",
      provider: "Coursera",
      icon: <FaMedal className="h-4 w-4" />
    },
    {
      name: "UNESCO UNITWIN Data Science Camp",
      provider: "UNECO UNITWIN and Handong Global University",
      icon: <FaMedal className="h-4 w-4" />
    },
    {
      name: "Career-Ready Web Developer",
      provider: "FrontendMaster",
      icon: <FaCertificate className="h-4 w-4" />
    },
    {
      name: "The Frontend Developer Career Path",
      provider: "Scrimba",
      icon: <FaAward className="h-4 w-4" />
    }
  ];

  return (
    <section 
      id="certifications" 
      className="py-16 md:py-24 bg-white dark:bg-gray-900 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-20 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-60 h-60 bg-purple-500/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <GradientText className="text-3xl md:text-4xl font-bold mb-4">Certification & Extra</GradientText>
          <GradientLine />
          <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional certifications and additional qualifications that enhance my expertise and skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certifications.map((certification, index) => (
            <CertificationCard
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                x: isVisible ? 0 : -20 
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800/50 shadow-md"
            >
              <div className="flex items-start group">
                <IconWrapper className="icon-wrapper mr-3 mt-1">
                  {certification.icon}
                </IconWrapper>
                <div className="cert-text transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {certification.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {certification.provider}
                  </p>
                </div>
              </div>
            </CertificationCard>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a 
            href="#" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Certificates
            <FaArrowRight className="h-3 w-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationSection; 