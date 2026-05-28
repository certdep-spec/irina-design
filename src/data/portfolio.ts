export interface PortfolioCase {
  id: string
  title: string
  meta: string
  category: 'interior' | 'furniture'
  coverImage: string
  gallery: string[]
  description?: string
  task?: string
  solution?: string
}

export const portfolioCases: PortfolioCase[] = [
  {
    id: '1',
    title: 'Житловий інтер\'єр',
    meta: '120 м² • мінімалізм',
    category: 'interior',
    coverImage: '/archives/living/001.webp',
    gallery: [
      '/archives/living/001.webp',
      '/archives/living/4200d396-0e13-4b59-9a8c-759f17e28669.webp',
      '/archives/living/7305e93e-7380-4095-8d4d-22183c01824e.webp',
      '/archives/living/����ࠦ����_viber_2026-04-30_11-17-45-342.webp'
    ],
    task: 'розробити ергономічний простір без зайвих деталей',
    solution: 'використання натуральних текстур, прихованих дверей та продуманого освітлення'
  }
]