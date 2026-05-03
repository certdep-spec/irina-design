// Данные всех проектов с локальными изображениями
// Серия 1: Дизайн інтер'єру та меблів (1image1 - 1image8)
const project1Images = [
  '/Paint/1image1.webp',
  '/Paint/1image2.webp',
  '/Paint/1image3.webp',
  '/Paint/1image4.webp',
  '/Paint/1image5.webp',
  '/Paint/1image6.webp',
  '/Paint/1image7.webp',
  '/Paint/1image8.webp',
]

// Серия 2: Планування житла (2image1 - 2image8)
const project2Images = [
  '/Paint/2image1.webp',
  '/Paint/2image2.webp',
  '/Paint/2image3.webp',
  '/Paint/2image4.webp',
  '/Paint/2image5.webp',
  '/Paint/2image6.webp',
  '/Paint/2image7.webp',
  '/Paint/2image8.webp',
]

// Серия 3: Дизайн житла у Вінниці (3image1 - 3image7 + 3image.webp)
const project3Images = [
  '/Paint/3image1.webp',
  '/Paint/3image2.webp',
  '/Paint/3image3.webp',
  '/Paint/3image4.webp',
  '/Paint/3image5.webp',
  '/Paint/3image6.webp',
  '/Paint/3image7.webp',
  '/Paint/3image.webp',
]

// Серия 4: Дизайн кухонь (4image-1 - 4image-7 + 4image.webp)
const project4Images = [
  '/Paint/4image-1.webp',
  '/Paint/4image-2.webp',
  '/Paint/4image-3.webp',
  '/Paint/4image-4.webp',
  '/Paint/4image-5.webp',
  '/Paint/4image-6.webp',
  '/Paint/4image-7.webp',
  '/Paint/4image.webp',
]

export const projects = [
  {
    id: 1,
    title: "Дизайн інтер'єру та меблів",
    category: "Кухні",
    description: "Комплексні рішення для створення унікальних інтер'єрних проєктів. Розробка індивідуального дизайну інтер'єру, перепланування приміщення, проектування та розстановка меблів, 3D візуалізація.",
    images: project1Images,
  },
  {
    id: 2,
    title: 'Планування житла без помилок',
    category: 'Квартири та будинки',
    description: 'Професійне планування квартир, будинків та таунхаусів. Робота віддалено, щоб всі елементи вписалися ідеально без помилок.',
    images: project2Images,
  },
  {
    id: 3,
    title: 'Дизайн житла у Вінниці (онлайн)',
    category: 'Інші проекти',
    description: "Проектування квартир, будинків та таунхаусів онлайн. Досвід у дизайні інтер'єрів, врахування ергономіки та реального використання.",
    images: project3Images,
  },
  {
    id: 4,
    title: 'Дизайн кухонь та меблів під замовлення',
    category: 'Шафи та гардеробні',
    description: 'Дизайн меблів під замовлення без переробок і помилок. Ідеальне вписування у простір, зручність щодня, точні розміри та креслення.',
    images: project4Images,
  },
]

export const getAllImages = () => {
  return projects.flatMap(project => project.images)
}
