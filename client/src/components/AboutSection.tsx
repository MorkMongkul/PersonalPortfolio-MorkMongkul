export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-header text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <p className="text-gray-700 mb-6 leading-relaxed">
              With over 8 years of professional experience, I've developed a unique interdisciplinary approach that combines 
              <span className="text-[#EC4899] font-medium"> graphic design</span>, 
              <span className="text-[#10B981] font-medium"> mathematics education</span>, and 
              <span className="text-primary font-medium"> data science</span> expertise.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              My journey began in design, creating visual identities for brands that tell compelling stories. This creative 
              foundation later complemented my passion for education, where I taught advanced mathematics and developed 
              innovative teaching methodologies.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              In recent years, I've expanded into data science, using analytical skills to extract meaningful insights 
              and create data visualizations that are both informative and visually engaging.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <i className="fab fa-behance text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
            <a href="#" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
              Download Resume <i className="fas fa-download ml-2"></i>
            </a>
          </div>
          
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-light p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#EC4899] mb-2">
                  <i className="fas fa-paint-brush text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium mb-2">Graphic Design</h3>
                <p className="text-gray-600 text-sm">
                  Creating visual identities, UI/UX design, and print materials with a focus on aesthetics and usability.
                </p>
              </div>
              
              <div className="bg-light p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#10B981] mb-2">
                  <i className="fas fa-chalkboard-teacher text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium mb-2">Math Education</h3>
                <p className="text-gray-600 text-sm">
                  Developing engaging curriculum and teaching methodologies for advanced mathematics.
                </p>
              </div>
              
              <div className="bg-light p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary mb-2">
                  <i className="fas fa-chart-line text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium mb-2">Data Science</h3>
                <p className="text-gray-600 text-sm">
                  Extracting insights from complex datasets and creating informative visualizations.
                </p>
              </div>
              
              <div className="bg-light p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-gray-700 mb-2">
                  <i className="fas fa-laptop-code text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium mb-2">Web Development</h3>
                <p className="text-gray-600 text-sm">
                  Building responsive and interactive web experiences with modern technologies.
                </p>
              </div>
            </div>
          </div>
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
      `}</style>
    </section>
  );
}
