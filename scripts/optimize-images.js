import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, '../public/portfolio');
const outputDir = join(__dirname, '../public/portfolio-optimized');

// Create output directory if it doesn't exist
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const files = readdirSync(inputDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

console.log(`Found ${files.length} images to optimize...`);

async function optimizeImage(filename) {
  const inputPath = join(inputDir, filename);
  const baseName = filename.replace(/\.(jpg|jpeg|png)$/i, '');

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Calculate dimensions - max width 1200px for full quality, maintain aspect ratio
    const maxWidth = 1200;
    const width = metadata.width > maxWidth ? maxWidth : metadata.width;

    // Generate optimized JPG (80% quality - good balance)
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true })
      .toFile(join(outputDir, `${baseName}.jpg`));

    // Generate WebP (better compression)
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(outputDir, `${baseName}.webp`));

    // Generate small thumbnail for blur placeholder (20px width)
    await sharp(inputPath)
      .resize(20, null, { withoutEnlargement: true })
      .blur(2)
      .jpeg({ quality: 50 })
      .toFile(join(outputDir, `${baseName}-thumb.jpg`));

    console.log(`✓ ${filename}`);
  } catch (err) {
    console.error(`✗ ${filename}: ${err.message}`);
  }
}

// Process all images
(async () => {
  for (const file of files) {
    await optimizeImage(file);
  }
  console.log('\nDone! Optimized images are in public/portfolio-optimized/');
  console.log('Replace public/portfolio with public/portfolio-optimized contents');
})();
