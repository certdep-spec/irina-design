import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicArchivesDir = path.join(__dirname, 'public', 'archives');

// Створюємо папку archives в public, якщо її немає
if (!fs.existsSync(publicArchivesDir)) {
  fs.mkdirSync(publicArchivesDir, { recursive: true });
}

const filesToCopy = [
  'кухни.rar',
  'шкафы.rar',
  'инша мебель.rar',
  'кухні.jpg',
  'шафи.jpg',
  'інша.jpg',
  'Житловий інтерьер.jpg',
  'комерцйний інтерьеря.jpg'
];

filesToCopy.forEach(file => {
  try {
    if (fs.existsSync(path.join(__dirname, file))) {
      fs.copyFileSync(
        path.join(__dirname, file),
        path.join(publicArchivesDir, file)
      );
      console.log(`Скопійовано: ${file}`);
    } else {
      console.warn(`Файл не знайдено, пропущено: ${file}`);
    }
  } catch (error) {
    console.error(`Не вдалося скопіювати ${file}:`, error.message);
  }
});
console.log('Готово! Картинки скопійовано.');
