import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const GRAPHICS_DIR = './client/public/GraphicDesing';
const OUTPUT_DIR = './client/public/optimized-graphics';

async function optimizeImages() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Read all files in the graphics directory
    const files = await fs.readdir(GRAPHICS_DIR);

    for (const file of files) {
      if (file.endsWith('.png')) {
        console.log(`Optimizing ${file}...`);
        
        const inputPath = path.join(GRAPHICS_DIR, file);
        const outputPath = path.join(OUTPUT_DIR, file.replace('.png', '.webp'));

        await sharp(inputPath)
          .webp({ quality: 80 }) // Convert to WebP with 80% quality
          .resize(1200, 1200, { // Resize to max dimensions while maintaining aspect ratio
            fit: 'inside',
            withoutEnlargement: true
          })
          .toFile(outputPath);

        // Create thumbnail
        const thumbnailPath = path.join(OUTPUT_DIR, `thumb-${file.replace('.png', '.webp')}`);
        await sharp(inputPath)
          .webp({ quality: 80 })
          .resize(300, 300, { // Smaller size for thumbnails
            fit: 'inside',
            withoutEnlargement: true
          })
          .toFile(thumbnailPath);
      }
    }

    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages(); 