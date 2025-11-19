import React, { useRef, useEffect, useState } from "react";
import { FaAward, FaCertificate, FaMedal, FaTimes } from "react-icons/fa";
import styled from "@emotion/styled";
import { useLocomotiveScrollContext } from "@/contexts/LocomotiveScrollContext";

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

// Animations now handled by Locomotive Scroll via data-scroll-class

interface Certificate {
  id: number;
  name: string;
  provider: string;
  icon: React.ReactNode;
  imagePath: string;
  category: 'technical' | 'design' | 'business';
  date: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    name: "Data Scientist Nanodegree Program",
    provider: "Udacity",
    icon: <FaAward className="h-4 w-4" />,
    imagePath: "/nano_degree.png",
    category: 'technical',
    date: '2024'
  },
  {
    id: 2,
    name: "SAP Analytics Training",
    provider: "ASEAN Data Sciece Explorer",
    icon: <FaCertificate className="h-4 w-4" />,
    imagePath: "SAP_certificates.png",
    category: 'technical',
    date: '2025'
  },
  {
    id: 3,
    name: "Google Data Analytics Professional Certificate",
    provider: "Coursera",
    icon: <FaAward className="h-4 w-4" />,
    imagePath: "/Coursera_Certificate.jpg",
    category: 'technical',
    date: '2024'
  },
  {
    id: 4,
    name: "Data Warehouse Concept Design and Data Integration",
    provider: "Coursera",
    icon: <FaCertificate className="h-4 w-4" />,
    imagePath: "/certificate_data_warehouse.jpg",
    category: 'technical',
    date: '2025'
  },
  {
    id: 5,
    name: "Machine Learning",
    provider: "Coursera",
    icon: <FaCertificate className="h-4 w-4" />,
    imagePath: "/Machine_Learning.png",
    category: 'technical',
    date: '2022'
  },
  {
    id: 6,
    name: "Database for Developers",
    provider: "Coursera",
    icon: <FaCertificate className="h-4 w-4" />,
    imagePath: "/Oracle_Database_dev_gym.png",
    category: 'technical',
    date: '2025'
  },
  {
    id: 7,
    name: "Microsoft Power BI Data Analyst",
    provider: "Coursera",
    icon: <FaCertificate className="h-4 w-4" />,
    imagePath: "/PowerBI_Certificate.png",
    category: 'technical',
    date: '2025'
  },
  {
    id: 8,
    name: "The Frontend Developer Career Path",
    provider: "Coursera",
    icon: <FaCertificate className="h-4 w-4" />,
    imagePath: "/Scrimba_certificate.png",
    category: 'technical',
    date: '2025'
  },

  
];

const CertificationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
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

  const renderCertificateCard = (certificate: Certificate) => (
    <div
      key={certificate.id}
      data-scroll
      data-scroll-speed={`${0.3 + (certificate.id % 4) * 0.15}`}
      className="group cursor-pointer"
      onClick={() => setSelectedCert(selectedCert?.id === certificate.id ? null : certificate)}
    >
      <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-500 hover:shadow-2xl dark:shadow-gray-800/30">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500">
                {certificate.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {certificate.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {certificate.provider}
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {certificate.date}
            </span>
          </div>
          
          {selectedCert?.id === certificate.id && (
              <div
                className="mt-4 animate-in fade-in duration-300"
              >
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                  <img
                    src={certificate.imagePath}
                    alt={`${certificate.name} Certificate`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );

  return (
    <section 
        id="certifications" 
        data-scroll-section
        className="py-16 md:py-24 bg-white dark:bg-gray-900 relative overflow-hidden"
        ref={sectionRef}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-40 -left-20 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-60 h-60 bg-purple-500/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            data-scroll
            data-scroll-speed="1.0"
            className="mb-12 text-center"
          >
            <GradientText className="text-3xl md:text-4xl font-bold mb-4">
              Certifications & Achievements
            </GradientText>
            <GradientLine />
            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Professional certifications and qualifications that showcase my expertise and continuous learning journey.
            </p>
          </div>

          <div data-scroll data-scroll-speed="0.3" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {certificates.map(renderCertificateCard)}
          </div>
        </div>
      </section>
  );
};

export default CertificationSection; 