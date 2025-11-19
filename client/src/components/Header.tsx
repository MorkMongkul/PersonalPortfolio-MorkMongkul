import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { HiMenuAlt3 } from "react-icons/hi";
import { useLocomotiveScrollContext } from "@/contexts/LocomotiveScrollContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scroll } = useLocomotiveScrollContext();
  
  // Handle scroll event to highlight active section in navigation
  useEffect(() => {
    if (!scroll) return;

    const handleScroll = (args: any) => {
      // Get current scroll position
      const scrollPosition = args.scroll.y;
      const sections = document.querySelectorAll("section[id]");

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition + 100 >= sectionTop && scrollPosition + 100 < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    scroll.on("scroll", handleScroll);
    return () => {
      scroll.off("scroll", handleScroll);
    };
  }, [scroll]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "certifications", label: "Certifications" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    // Close mobile menu when a nav item is clicked
    setMobileMenuOpen(false);
    
    // Scroll to the section using Locomotive Scroll
    if (scroll) {
      scroll.scrollTo(`#${id}`, {
        offset: -80,
        duration: 1000,
        easing: [0.25, 0.00, 0.35, 1.00],
      });
    } else {
      // Fallback to native scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 shadow-sm dark:shadow-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-xl font-accent font-bold text-primary">MORK Mongkul</span>
            <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-500 dark:text-gray-300">Portfolio</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <nav className="flex space-x-8 mr-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors relative ${
                    activeSection === item.id ? "active" : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <ThemeToggle />
          </div>
          
          {/* Mobile Navigation Toggle & Theme */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              aria-label="Toggle mobile menu"
              className="ml-2 text-gray-500 dark:text-gray-300 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <HiMenuAlt3 className="text-xl" />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden pb-4 ${mobileMenuOpen ? "" : "hidden"}`}>
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-2 py-1 rounded transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      

    </header>
  );
}
