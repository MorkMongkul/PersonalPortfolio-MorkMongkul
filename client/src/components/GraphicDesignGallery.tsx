import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ImageData {
  thumbnail: string;
  fullImage: string;
  alt: string;
}

export default function GraphicDesignGallery() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Load image data
    const loadImages = async () => {
      try {
        const imageNumbers = Array.from({ length: 52 }, (_, i) => i + 3);
        const imageData: ImageData[] = imageNumbers.map(num => ({
          thumbnail: `/optimized-graphics/thumb-portfolio-cover [Recovered]-${String(num).padStart(2, '0')}.webp`,
          fullImage: `/optimized-graphics/portfolio-cover [Recovered]-${String(num).padStart(2, '0')}.webp`,
          alt: `Portfolio Design ${num}`
        }));
        setImages(imageData);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setSelectedImage(image.fullImage)}
          >
            <img
              src={image.thumbnail}
              alt={image.alt}
              className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImage}
            alt="Full size"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
} 