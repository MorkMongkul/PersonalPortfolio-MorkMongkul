import { useState, useEffect } from "react";
import { projects as fallbackProjects } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Project } from "@shared/schema";

type FilterType = "all" | "design" | "education" | "data";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Fetch projects from the database
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['/api/projects', activeFilter],
    queryFn: () => {
      const url = activeFilter === 'all' 
        ? '/api/projects' 
        : `/api/projects?category=${activeFilter}`;
      return apiRequest<Project[]>(url);
    }
  });

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  // Use database projects if available, otherwise use fallback
  const displayProjects = projects || fallbackProjects;

  return (
    <section id="projects" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-header text-3xl md:text-4xl font-bold mb-4 text-center">My Projects</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          A selection of my recent work across graphic design, educational content, and data analysis projects.
        </p>
        
        <div className="mb-8 flex justify-center">
          <div className="inline-flex p-1 bg-gray-100 rounded-lg">
            <button 
              className={`px-4 py-2 rounded-lg ${
                activeFilter === "all" 
                  ? "bg-primary text-white" 
                  : "text-gray-700 hover:text-primary"
              }`}
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${
                activeFilter === "design" 
                  ? "bg-primary text-white" 
                  : "text-gray-700 hover:text-primary"
              }`}
              onClick={() => handleFilterChange("design")}
            >
              Design
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${
                activeFilter === "education" 
                  ? "bg-primary text-white" 
                  : "text-gray-700 hover:text-primary"
              }`}
              onClick={() => handleFilterChange("education")}
            >
              Education
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${
                activeFilter === "data" 
                  ? "bg-primary text-white" 
                  : "text-gray-700 hover:text-primary"
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
                  <div className="w-full h-64 bg-gray-200"></div>
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
              <p className="text-gray-500">No projects found in this category.</p>
            </div>
          ) : (
            // Display projects
            displayProjects.map((project) => (
              <div className="project-card group" key={project.id}>
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={project.image || project.image_url || '/placeholder-project.jpg'} 
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
                      href={project.link || project.project_url || '#'} 
                      className={`text-white text-sm ${
                        project.category === "design" 
                          ? "hover:text-[#EC4899]" 
                          : project.category === "education" 
                            ? "hover:text-[#10B981]" 
                            : "hover:text-primary"
                      } transition-colors`}
                    >
                      View Project <i className="fas fa-arrow-right ml-1"></i>
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
      
      <style jsx>{`
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
      `}</style>
    </section>
  );
}
