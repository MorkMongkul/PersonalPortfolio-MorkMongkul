import { useState } from "react";
import { projects as fallbackProjects } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Project } from "@shared/schema";

type FilterType = "all" | "design" | "education" | "data";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Fetch projects from the database
  const { data: projects, isLoading, isError } = useQuery<Project[]>({
    queryKey: ['/api/projects', activeFilter],
    queryFn: async () => {
      const url = activeFilter === 'all' 
        ? '/api/projects' 
        : `/api/projects?category=${activeFilter}`;
      return await apiRequest<Project[]>(url);
    }
  });

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  // Use database projects if available, otherwise use fallback
  const displayProjects = projects || fallbackProjects;

  return (
    <section id="projects" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-header text-3xl md:text-4xl font-bold mb-4 text-center dark:text-white">My Projects</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          A selection of my recent work across graphic design, educational content, and data analysis projects.
        </p>
        
        <div className="mb-8 flex justify-center">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeFilter === "all" 
                  ? "bg-white dark:bg-gray-700 shadow-sm" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeFilter === "design" 
                  ? "bg-[#EC4899]/10 text-[#EC4899] font-medium shadow-sm" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleFilterChange("design")}
            >
              Design
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeFilter === "education" 
                  ? "bg-[#10B981]/10 text-[#10B981] font-medium shadow-sm" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleFilterChange("education")}
            >
              Education
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeFilter === "data" 
                  ? "bg-primary/10 text-primary font-medium shadow-sm" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleFilterChange("data")}
            >
              Data Science
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Show loading placeholders
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="project-card animate-pulse">
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <div className="w-full h-64 bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
            ))
          ) : isError ? (
            // Show error message
            <div className="col-span-full text-center py-10">
              <p className="text-red-500">Failed to load projects. Please try again later.</p>
            </div>
          ) : displayProjects.length === 0 ? (
            // Show empty state
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No projects found in this category.</p>
            </div>
          ) : (
            // Display projects
            displayProjects.map((project) => (
              <div className="project-card group" key={project.id}>
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={
                      // Handle both database and fallback project image paths
                      'image_url' in project 
                        ? (project.image_url || '/placeholder-project.jpg')
                        : ('image' in project 
                            ? project.image 
                            : '/placeholder-project.jpg')
                    } 
                    alt={project.title} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="project-overlay absolute inset-0 bg-gradient-to-t from-dark/80 to-dark/20 opacity-0 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className={`text-xs font-medium ${
                      project.category === "design" 
                        ? "text-[#EC4899] bg-[#EC4899]/10" 
                        : project.category === "education" 
                          ? "text-[#10B981] bg-[#10B981]/10" 
                          : "text-primary bg-primary/10"
                    } px-2 py-1 rounded-full w-max mb-2`}>
                      {project.category === "design" 
                        ? "Graphic Design" 
                        : project.category === "education" 
                          ? "Education" 
                          : "Data Science"}
                    </span>
                    <h3 className="text-white text-xl font-medium mb-2">{project.title}</h3>
                    <p className="text-gray-200 text-sm mb-4">{project.description}</p>
                    <a 
                      href={
                        // Handle both database and fallback project URLs
                        'project_url' in project 
                          ? (project.project_url || '#')
                          : ('link' in project 
                              ? project.link 
                              : '#')
                      } 
                      className={`text-white text-sm ${
                        project.category === "design" 
                          ? "hover:text-[#EC4899]" 
                          : project.category === "education" 
                            ? "hover:text-[#10B981]" 
                            : "hover:text-primary"
                      } transition-colors`}
                    >
                      View Project <span className="ml-1">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline">
            View All Projects
          </Button>
        </div>
      </div>
      
      <style>{`
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
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        @media (prefers-color-scheme: dark) {
          .section-header::after {
            background-color: #60A5FA;
          }
        }
      `}</style>
    </section>
  );
}
