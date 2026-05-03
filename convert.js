import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  fs.copyFileSync(
    path.join(__dirname, 'portfolio', 'dc9.png'),
    path.join(__dirname, 'public', 'Paint', 'hero-main.png')
  );
  console.log('Готово! Картинка dc9.png успішно встановлена як головна.');
} catch (error) {
  console.error('Помилка копіювання:', error);
}
