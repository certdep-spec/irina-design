const fs = require('fs');
const path = require('path');

const archivesPath = 'C:\\Site\\interior-designer-portfolio\\public\\archives';

// Get all files
const files = fs.readdirSync(archivesPath);
console.log('Files found:', files);

// Mapping for rename (Cyrillic to ASCII)
const mapping = {
  'інша.jpg': 'kids-room.jpg',
  'Житловий інтерьер.jpg': 'residential-interior.jpg',
  'комерційний інтерьеря.jpg': 'commercial-interior.jpg',
  'кухні.jpg': 'kitchen.jpg',
  'шафи.jpg': 'wardrobe.jpg'
};

files.forEach(file => {
  if (mapping[file]) {
    const oldPath = path.join(archivesPath, file);
    const newPath = path.join(archivesPath, mapping[file]);    
    
    try {
      if (!fs.existsSync(newPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${file} -> ${mapping[file]}`);
      } else {
        console.log(`Already exists: ${mapping[file]}`);
      }
    } catch (err) {
      console.error(`Error renaming ${file}:`, err.message);
    }
  }
});

console.log('Done!');
