import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found | Mork Mongkul';
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="text-9xl font-bold text-primary mb-4"
        >
          404
        </motion.h1>
        
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Oops! Page not found
        </h2>
        
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't seem to exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 inline-block"
            >
              Return to Home
            </motion.a>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </motion.div>
      
      {/* Animated particles for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFound; 