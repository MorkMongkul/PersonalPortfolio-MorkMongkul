import { useState, useCallback } from "react";
import { projects as fallbackProjects } from "@/lib/constants";
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
  technologies?: string[];
  date?: string;
  githubLink?: string;
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {projects.map((project) => renderProjectCard(project))}
          </div>
        </div>
      ));
    }
    return displayProjects.map((project) => renderProjectCard(project as ProjectType));
  };

  const getDefaultTechnologies = (category: string): string[] => {
    switch (category) {
      case 'design':
        return ['Adobe Photoshop', 'Adobe Illustrator', 'Figma'];
      case 'data':
        return ['Python', 'Machine Learning', 'Data Visualization', 'SQL'];
      case 'education':
        return ['React', 'TypeScript', 'TailwindCSS'];
      default:
        return ['React', 'TypeScript', 'TailwindCSS'];
    }
  };

  const renderProjectCard = (project: ProjectType) => {
    const technologies = project.technologies || getDefaultTechnologies(project.category);
    const date = project.date || '2024';
    
    // Determine which link to use (prioritize githubLink, then link)
    const projectLink = project.githubLink || (project.link && project.link !== '#' ? project.link : null);
    
    const cardContent = (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col cursor-pointer">
        {/* Image Section with Border */}
        <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="w-full h-full p-2">
            <div className="w-full h-full border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h3>

          {/* Date */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {date}
          </p>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                +{technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    );

    // If there's a link, wrap in anchor tag, otherwise just return the card
    if (projectLink) {
      return (
        <a
          key={project.id}
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          data-project-id={project.id}
          data-scroll
          data-scroll-speed={`${0.3 + (project.id % 5) * 0.15}`}
          onClick={(e) => {
            // For design projects, still allow modal if needed
            if (project.category === 'design' && !projectLink) {
              e.preventDefault();
              setModalProject(project);
            }
          }}
        >
          {cardContent}
        </a>
      );
    }

    return (
      <div 
        className="group" 
        key={project.id}
        data-project-id={project.id}
        data-scroll
        data-scroll-speed={`${0.3 + (project.id % 5) * 0.15}`}
        onClick={() => project.category === 'design' ? setModalProject(project) : undefined}
      >
        {cardContent}
      </div>
    );
  };

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
    <section id="projects" data-scroll-section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 data-scroll data-scroll-speed="1.0" className="section-header text-3xl md:text-4xl font-bold mb-4 text-center dark:text-white">My Projects</h2>
        <p data-scroll data-scroll-speed="0.6" className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          A selection of my recent work across graphic design, educational content, and data analysis projects.
        </p>
        
        <div data-scroll data-scroll-speed="0.4" className="mb-8 flex justify-center">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          /* Fade-in animations now handled by Locomotive Scroll */
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
