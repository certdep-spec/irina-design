const fs = require('fs');
const path = require('path');

const archivesPath = 'C:\\Site\\interior-designer-portfolio\\public\\archives';

// Get all files
const files = fs.readdirSync(archivesPath);

console.log('Files found:', files);

// Mapping for rename
const mapping = {
  'Житловий інтерєр.jpg': 'residential-interior.jpg',
  'Комерційний інтерєр.jpg': 'commercial-interior.jpg',
  'Кухні.jpg': 'kitchen-cover.jpg',
  'Шафи.jpg': 'wardrobe-cover.jpg',
  'Інша.jpg': 'kids-cover.jpg'
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
