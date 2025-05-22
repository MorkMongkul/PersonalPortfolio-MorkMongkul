import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceDir = path.join(__dirname, '../client/public/GraphicDesign');
const outputDir = path.join(__dirname, '../client/public/optimized-graphics');

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
    image = image.webp({ quality });
    
    await image.toFile(outputPath);
    console.log(`✅ Optimized: ${path.basename(filePath)} -> ${path.basename(outputPath)}`);
    
    // Create thumbnail version
    const thumbImage = sharp(filePath);
    const thumbPath = path.join(
      path.dirname(outputPath),
      `thumb-${path.basename(outputPath)}`
    );
    
    await thumbImage
      .resize(400) // Smaller size for thumbnails
      .webp({ quality: 75 })
      .toFile(thumbPath);
    
    console.log(`✅ Created thumbnail: ${path.basename(thumbPath)}`);
    
    return outputPath;
  } catch (err) {
    console.error(`❌ Error processing ${filePath}:`, err.message);
    return null;
  }
}

// Main function
async function optimizeGraphicDesignImages() {
  try {
    await ensureDir(outputDir);
    
    // Get all image files from GraphicDesign folder
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });
    const imageFiles = entries
      .filter(entry => !entry.isDirectory())
      .filter(entry => {
        const ext = path.extname(entry.name).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map(entry => path.join(sourceDir, entry.name));
    
    console.log(`Found ${imageFiles.length} images to optimize in GraphicDesign folder`);
    
    // Process all images to WebP
    const results = await Promise.all(
      imageFiles.map(async (file) => {
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
    console.log(`\n✨ Optimization complete: ${successCount}/${imageFiles.length} images processed`);
  } catch (err) {
    console.error('Error in image optimization:', err);
  }
}

// Run the main function
optimizeGraphicDesignImages(); 