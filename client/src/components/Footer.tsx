import { useLocomotiveScrollContext } from "@/contexts/LocomotiveScrollContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { scroll } = useLocomotiveScrollContext();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (scroll) {
      scroll.scrollTo(`#${id}`, {
        offset: -80,
        duration: 1000,
        easing: [0.25, 0.00, 0.35, 1.00],
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  
  return (
    <footer data-scroll-section className="py-8 bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-xl font-accent font-bold">MORK Mongkul</p>
            <p className="text-gray-400 mt-2">Design • Education • Data Science</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            <a href="#home" onClick={(e) => handleLinkClick(e, "home")} className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, "about")} className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#skills" onClick={(e) => handleLinkClick(e, "skills")} className="text-gray-300 hover:text-white transition-colors">Skills</a>
            <a href="#projects" onClick={(e) => handleLinkClick(e, "projects")} className="text-gray-300 hover:text-white transition-colors">Projects</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, "contact")} className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center text-gray-400">
          <p>© {currentYear} MORK Mongkul. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <p>Designed and built with <span className="text-red-500">❤</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
