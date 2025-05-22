import { useState, useCallback } from "react";
import { projects as fallbackProjects } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Project } from "@shared/schema";
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

type FilterType = "all" | "design" | "education" | "data";
type DesignSubcategory = "branding" | "print" | "social";
type DataScienceSubcategory = "machine_learning" | "database" | "data_viz";

interface ProjectType {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory?: DesignSubcategory | DataScienceSubcategory;
  image: string;
  thumbnailImage?: string;
  link: string;
  featured?: boolean;
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [modalProject, setModalProject] = useState<ProjectType | null>(null);

  // Filter projects based on active filter
  const displayProjects = activeFilter === 'all'
    ? fallbackProjects.filter(project => project.featured)
    : fallbackProjects.filter(project => project.category === activeFilter);

  // Group design projects by subcategory
  const groupedDesignProjects = displayProjects.reduce((acc, project) => {
    if (project.category === 'design' && project.subcategory) {
      const subcategory = project.subcategory as DesignSubcategory;
      if (!acc[subcategory]) {
        acc[subcategory] = [];
      }
      acc[subcategory].push(project as ProjectType);
    }
    return acc;
  }, {} as Record<DesignSubcategory, ProjectType[]>);

  // Group data science projects by subcategory
  const groupedDataProjects = displayProjects.reduce((acc, project) => {
    if (project.category === 'data' && project.subcategory) {
      const subcategory = project.subcategory as DataScienceSubcategory;
      if (!acc[subcategory]) {
        acc[subcategory] = [];
      }
      acc[subcategory].push(project as ProjectType);
    }
    return acc;
  }, {} as Record<DataScienceSubcategory, ProjectType[]>);

  const handleFilterChange = (filter: FilterType) => {
    if (filter === activeFilter) return; // Prevent unnecessary re-render
    setActiveFilter(filter);
  };

  const renderProjects = () => {
    if (activeFilter === 'design') {
      return Object.entries(groupedDesignProjects).map(([subcategory, projects]) => (
        <div key={subcategory} className="col-span-full">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white capitalize">
            {subcategory === 'branding' ? 'Branding' :
             subcategory === 'print' ? 'Print Ads' :
             'Social Media'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project) => renderProjectCard(project))}
          </div>
        </div>
      ));
    }
    if (activeFilter === 'data') {
      return Object.entries(groupedDataProjects).map(([subcategory, projects]) => (
        <div key={subcategory} className="col-span-full">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white capitalize">
            {subcategory === 'machine_learning' ? 'Machine Learning' :
             subcategory === 'database' ? 'Database' :
             'Data Visualization'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project) => renderProjectCard(project))}
          </div>
        </div>
      ));
    }
    return displayProjects.map((project) => renderProjectCard(project as ProjectType));
  };

  const renderProjectCard = (project: ProjectType) => (
    <div 
      className="project-card group" 
      key={project.id}
      data-project-id={project.id}
      style={{ 
        opacity: 0,
        animation: 'fadeIn 0.6s ease-out forwards',
        animationDelay: `${project.id * 0.1}s`
      }}
      onClick={() => project.category === 'design' ? setModalProject(project) : undefined}
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl dark:shadow-gray-800/30">
        <div className="relative h-72">
          {/* Simple image display */}
          <img 
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-3 ${
                project.category === "design" 
                  ? "text-[#EC4899] bg-[#EC4899]/10" 
                  : project.category === "education" 
                    ? "text-[#10B981] bg-[#10B981]/10" 
                    : "text-primary bg-primary/10"
              }`}>
                {project.category === "design" 
                  ? "Graphic Design" 
                  : project.category === "education" 
                    ? "Education" 
                    : "Data Science"}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {project.description}
              </p>
              {project.category === 'data' ? (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View on GitHub
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ) : (
                <a 
                  href={project.link}
                  className={`inline-flex items-center text-sm font-medium ${
                    project.category === "design" 
                      ? "text-[#EC4899] hover:text-[#EC4899]/80" 
                      : project.category === "education" 
                        ? "text-[#10B981] hover:text-[#10B981]/80" 
                        : "text-primary hover:text-primary/80"
                  } transition-colors`}
                >
                  View Project
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Modal for Design Project Full View
  const renderModal = () => modalProject && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setModalProject(null)}>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-lg w-full p-8 relative" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white" onClick={() => setModalProject(null)}>&times;</button>
        
        {/* Simple image display */}
        <img 
          src={modalProject.image} 
          alt={modalProject.title} 
          className="w-full h-64 object-cover rounded mb-4"
        />
        
        <h2 className="text-2xl font-bold mb-2">{modalProject.title}</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{modalProject.description}</p>
        <a href={modalProject.link} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View Project</a>
      </div>
    </div>
  );

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
        
        <div className="grid grid-cols-1 gap-8">
          {displayProjects.length === 0 ? (
            // Show empty state
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No projects found in this category.</p>
            </div>
          ) : (
            // Display projects
            renderProjects()
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline"
            className="px-8 py-3 text-lg font-medium border-2 hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500 hover:border-transparent hover:text-white transition-all duration-300"
          >
            View All Projects
          </Button>
        </div>
      </div>
      {renderModal()}
      
      <style>
        {`
          .section-header::after {
            content: '';
            display: block;
            width: 50px;
            height: 3px;
            background: linear-gradient(to right, #EC4899, #8B5CF6);
            margin-top: 8px;
            margin-left: auto;
            margin-right: auto;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .project-card:hover .project-overlay {
            opacity: 1;
          }
          @media (prefers-color-scheme: dark) {
            .section-header::after {
              background: linear-gradient(to right, #EC4899, #8B5CF6);
            }
          }
        `}
      </style>
    </section>
  );
}
