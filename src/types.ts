export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  link?: string;
}

export type Projects = Project[];

export interface NavLink {
  path: string;
  label: string;
}

export interface Service {
  title: string;
  description: string;
}