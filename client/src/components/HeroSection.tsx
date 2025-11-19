import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useLocomotiveScrollContext } from "@/contexts/LocomotiveScrollContext";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 20px #ff0000; }
  25% { box-shadow: 0 0 20px #00ff00; }
  50% { box-shadow: 0 0 20px #0000ff; }
  75% { box-shadow: 0 0 20px #ff00ff; }
  100% { box-shadow: 0 0 20px #ff0000; }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const ProfileContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 6s ease-in-out infinite;
`;

const GlowEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%);
  animation: ${glow} 5s infinite alternate;
  border-radius: 50%;
`;

const ProfileImage = styled.div`
  position: absolute;
  inset: 16px;
  background: white;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  a {
    color: #6B7280;
    transition: all 0.3s ease;
    font-size: 1.5rem;
    
    &:hover {
      color: #EC4899;
      transform: translateY(-3px);
    }
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: ${bounce} 2s infinite;
  cursor: pointer;
  color: #6B7280;
  transition: color 0.3s ease;
  
  &:hover {
    color: #EC4899;
  }
`;

export default function HeroSection() {
  const [professionIndex, setProfessionIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const professions = ["Graphic Designer", "Math Educator", "Data Scientist"];
  const { scroll } = useLocomotiveScrollContext();

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
    if (scroll) {
      scroll.scrollTo(`#${id}`, {
        offset: -80,
        duration: 1000,
        easing: [0.25, 0.00, 0.35, 1.00],
      });
    } else {
      // Fallback to native scroll
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      data-scroll-section
      className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1
              data-scroll
              data-scroll-speed="1.2"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            >
              <span className="text-dark dark:text-gray-200">Hi, I'm </span>
              <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
                MORK Mongkul
              </span>
            </h1>
            <div
              data-scroll
              data-scroll-speed="0.8"
              className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 h-8 flex"
            >
              {text}
              <span
                className={
                  cursorVisible ? "inline-block w-2 bg-gray-600 dark:bg-gray-300" : "opacity-0 w-2"
                }
              >
                |
              </span>
            </div>
            <p
              data-scroll
              data-scroll-speed="0.6"
              className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg"
            >
              Bringing creativity, analytical thinking, and educational expertise to every project. I
              blend design aesthetics with data-driven insights.
            </p>
            <div data-scroll data-scroll-speed="0.4" className="flex space-x-4">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 transition-all duration-300"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-2 hover:bg-gradient-to-r hover:from-pink-500 hover:to-cyan-500 hover:border-transparent transition-all duration-300"
              >
                Contact Me
              </Button>
            </div>
            <SocialLinks data-scroll data-scroll-speed="0.3">
              <a href="https://github.com/MORKMongkul" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/mork-mongkul-2b622620b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://t.me/morkmongkul" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-telegram"></i>
              </a>
            </SocialLinks>
          </div>
          <div data-scroll data-scroll-speed="-0.8" className="md:w-1/2 flex justify-center">
            <ProfileContainer>
              <GlowEffect />
              <ProfileImage>
                <img
                  src="/official_me.png"
                  alt="MORK Mongkul"
                  className="w-full h-full object-cover"
                />
              </ProfileImage>
            </ProfileContainer>
          </div>
        </div>
      </div>
      <ScrollIndicator onClick={() => scrollToSection("about")}>
        <i className="fas fa-chevron-down text-2xl"></i>
      </ScrollIndicator>
    </section>
  );
}
