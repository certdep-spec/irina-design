import portfolioData from './portfolio.json';

export type PortfolioCase = {
  id: string
  slug: string
  title: string
  category: 'interior' | 'furniture'
  meta: string
  task?: string
  solution?: string
  description?: string
  coverImage: string
  gallery: string[]
}

export const portfolioCases = portfolioData as PortfolioCase[];
