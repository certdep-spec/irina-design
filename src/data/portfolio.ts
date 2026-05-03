export type PortfolioCase = {
  id: string
  title: string
  category: 'interior' | 'furniture'
  meta: string
  task?: string
  solution?: string
  description?: string
  coverImage: string
  gallery: string[]
}

export const portfolioCases: PortfolioCase[] = [
  {
    id: 'i1',
    title: 'Житловий інтер\'єр',
    category: 'interior',
    meta: '120 м² • мінімалізм',
    task: 'розробити ергономічний простір без зайвих деталей.',
    solution: 'використання натуральних текстур, прихованих дверей та продуманого освітлення.',
    coverImage: '/archives/residential-interior.jpg',
    gallery: [
      '/archives/living/Enscape_2025-07-03-15-57-14.webp',
      '/archives/living/Enscape_2025-07-13-21-51-40.webp',
      '/archives/living/Enscape_2025-09-02-12-09-32.webp',
      '/archives/living/Enscape_2025-11-04-15-31-33.webp',
      '/archives/living/Enscape_2025-12-09-10-14-08.webp',
      '/archives/living/Enscape_2026-01-13-14-41-01.webp',
      '/archives/living/Enscape_2026-02-19-09-38-02.webp',
      '/archives/living/Enscape_2026-03-03-14-54-28.webp',
      '/archives/living/Enscape_2026-03-05-10-49-18.webp',
      '/archives/living/Enscape_2026-03-05-11-34-19.webp',
      '/archives/living/Enscape_2026-03-05-12-20-45.webp',
      '/archives/living/Enscape_2026-03-18-13-12-36.webp',
      '/archives/living/Enscape_2026-04-22-15-42-51.webp',
      '/archives/living/Enscape_2026-04-29-16-02-18.webp'
    ]
  },
  {
    id: 'i2',
    title: 'Комерційний простір',
    category: 'interior',
    meta: 'кафе • 85 м²',
    description: 'Створення стильного та затишного закладу, що привертає увагу та запам\'ятовується клієнтам.',
    coverImage: '/archives/commercial-interior.jpg',
    gallery: [
      '/archives/comercial/004.webp',
      '/archives/comercial/006.webp',
      '/archives/comercial/008.webp',
      '/archives/comercial/020.webp',
      '/archives/comercial/034.webp',
      '/archives/comercial/19.webp',
      '/archives/comercial/4.webp',
      '/archives/comercial/Enscape_2025-07-01-13-50-25.webp',
      '/archives/comercial/Enscape_2026-04-29-15-04-54.webp',
      '/archives/comercial/cafe-image17.webp',
      '/archives/comercial/cafe-image4.webp'
    ]
  },
  {
    id: 'f1',
    title: 'Кухня-вітальня',
    category: 'furniture',
    meta: '65 м² • сучасний стиль',
    task: 'створити світлий та функціональний простір для сім\'ї.',
    solution: 'поєднання світлих матеріалів, прихованого зберігання та зручного зонування.',
    coverImage: '/archives/kitchen.jpg',
    gallery: [
      '/archives/kitchen/007.webp',
      '/archives/kitchen/014.webp',
      '/archives/kitchen/kitchen2.webp',
      '/archives/kitchen/Enscape_2025-07-11-15-51-12.webp',
      '/archives/kitchen/Enscape_2025-08-18-11-30-07.webp',
      '/archives/kitchen/Enscape_2025-08-26-12-35-53.webp',
      '/archives/kitchen/Enscape_2025-09-16-09-43-56.webp',
      '/archives/kitchen/Enscape_2026-02-11-16-35-47.webp',
      '/archives/kitchen/Enscape_2026-03-03-10-37-43.webp',
      '/archives/kitchen/Enscape_2026-03-05-10-26-52.webp',
      '/archives/kitchen/apartment-image18.webp'
    ]
  },
  {
    id: 'f2',
    title: 'Гардеробна система',
    category: 'furniture',
    meta: 'квартира • індивідуальний проєкт',
    description: 'Максимально ефективне використання простору з продуманими системами зберігання.',
    coverImage: '/archives/wardrobe.jpg',
    gallery: [
      '/archives/wardrobe/007.webp',
      '/archives/wardrobe/077.webp',
      '/archives/wardrobe/Enscape_2025-09-17-14-49-34.webp',
      '/archives/wardrobe/Enscape_2025-12-11-18-23-52.webp',
      '/archives/wardrobe/apartment-image3.webp'
    ]
  },
  {
    id: 'f3',
    title: 'Дитяча кімната',
    category: 'furniture',
    meta: 'нестандартне планування',
    description: 'Багаторівневе рішення зі спальними зонами, місцем для навчання та ігровим простором.',
    coverImage: '/archives/kids-room.jpg',
    gallery: [
      '/archives/kids/Enscape_2025-08-08-22-00-55.webp',
      '/archives/kids/Enscape_2026-03-05-13-25-35.webp',
      '/archives/kids/Enscape_2026-04-22-14-15-25.webp',
      '/archives/kids/Enscape_2026-04-28-23-16-59.webp'
    ]
  }
]
