import { useState, useEffect } from "react";
import { useLocomotiveScrollContext } from "@/contexts/LocomotiveScrollContext";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scroll } = useLocomotiveScrollContext();
  
  // Show button when user scrolls down 300px
  useEffect(() => {
    if (!scroll) return;

    const handleScroll = (args: any) => {
      if (args.scroll.y > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    scroll.on("scroll", handleScroll);
    return () => {
      scroll.off("scroll", handleScroll);
    };
  }, [scroll]);
  
  const scrollToTop = () => {
    if (scroll) {
      scroll.scrollTo("top", {
        duration: 1000,
        easing: [0.25, 0.00, 0.35, 1.00],
      });
    } else {
      // Fallback to native scroll
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  
  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 bg-primary hover:bg-primary/90 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all z-40 ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}
