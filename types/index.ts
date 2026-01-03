export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  image?: string;
}

export interface Skill {
  category: string;
  skills: string[];
}

export interface NavLink {
  name: string;
  href: string;
  number: string;
}

