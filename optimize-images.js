import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const archivesDir = path.join(__dirname, 'public', 'archives');
const folders = ['kitchen', 'wardrobe', 'kids', 'living', 'comercial'];

async function optimizeImages() {
  console.log('Починаємо конвертацію картинок у WebP (це може зайняти хвилину)...');
  
  for (const folder of folders) {
    const folderPath = path.join(archivesDir, folder);
    if (!fs.existsSync(folderPath)) continue;

    const files = fs.readdirSync(folderPath);
    
    for (const file of files) {
      if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
        const inputPath = path.join(folderPath, file);
        const outputName = file.substring(0, file.lastIndexOf('.')) + '.webp';
        const outputPath = path.join(folderPath, outputName);

        try {
          await sharp(inputPath)
            .webp({ quality: 80 }) // 80% якість - ідеально для веб
            .toFile(outputPath);
          
          console.log(`✅ Конвертовано: ${folder}/${outputName}`);
          
          // Видаляємо старий JPG/PNG щоб не займав місце
          fs.unlinkSync(inputPath);
        } catch (error) {
          console.error(`❌ Помилка з файлом ${file}:`, error.message);
        }
      }
    }
  }
  
  console.log('🎉 Усі картинки успішно перетворені у формат WebP!');
}

optimizeImages();
