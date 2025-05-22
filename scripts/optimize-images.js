import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../client/public');
const outputDir = path.join(__dirname, '../client/public/optimized');

// Ensure output directory exists
async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

// Process a single image
async function processImage(filePath, outputPath, options = {}) {
  const { width, format = 'webp', quality = 80 } = options;
  
  try {
    let image = sharp(filePath);
    
    // Resize if width is specified
    if (width) {
      image = image.resize(width);
    }
    
    // Convert to specified format
    if (format === 'jpg') {
      image = image.webp({ quality });
    } else if (format === 'avif') {
      image = image.avif({ quality });
    } else if (format === 'jpeg' || format === 'jpg') {
      image = image.jpeg({ quality });
    } else if (format === 'png') {
      image = image.png({ quality });
    }
    
    await image.toFile(outputPath);
    console.log(`✅ Optimized: ${path.relative(publicDir, filePath)} -> ${path.relative(outputDir, outputPath)}`);
    
    return outputPath;
  } catch (err) {
    console.error(`❌ Error processing ${filePath}:`, err.message);
    return null;
  }
}

// Find all images in a directory
async function findImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  const files = await Promise.all(entries.map(async (entry) => {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      return findImages(res);
    } else {
      const ext = path.extname(res).toLowerCase();
      // Only include image files
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
        return res;
      }
      return null;
    }
  }));
  
  return files.flat().filter(Boolean);
}

// Main function
async function optimizeImages() {
  try {
    await ensureDir(outputDir);
    
    // Get all image files
    const imageFiles = await findImages(publicDir);
    
    // Skip already optimized images
    const filesToProcess = imageFiles.filter(file => !file.includes('/optimized/'));
    
    console.log(`Found ${filesToProcess.length} images to optimize`);
    
    // Process all images to WebP
    const results = await Promise.all(
      filesToProcess.map(async (file) => {
        const relPath = path.relative(publicDir, file);
        const fileName = path.basename(file, path.extname(file));
        const outputPath = path.join(outputDir, `${fileName}.webp`);
        
        return processImage(file, outputPath, { 
          format: 'webp',
          quality: 80,
          // Resize large images (leave small ones as is)
          width: (await sharp(file).metadata()).width > 1920 ? 1920 : undefined
        });
      })
    );
    
    const successCount = results.filter(Boolean).length;
    console.log(`\n✨ Optimization complete: ${successCount}/${filesToProcess.length} images processed`);
  } catch (err) {
    console.error('Error in image optimization:', err);
  }
}

// Run the main function
optimizeImages(); 