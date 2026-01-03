export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  duration: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  description: string[];
  technologies: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Pixentix Web Agency',
    position: 'Full-Stack Developer',
    location: 'Remote',
    duration: 'Nov 2024 – Present',
    type: 'full-time',
    description: [
      'Built full-stack apps for e-commerce, website builder, and ticketing platforms',
      'Implemented secure auth with MFA and role-based access control',
      'Mentored junior developers on React, Next.js, and modern JavaScript',
      'Optimized performance achieving 70% faster load times',
      'Architected microservices handling 50K+ daily requests with 99.9% uptime',
    ],
    technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Tailwind CSS'],
    logo: '/images/pixentix.svg',
  },
  {
    id: 2,
    company: 'Better e-mart',
    position: 'Full-Stack Developer',
    location: 'On-site',
    duration: 'Apr 2024 – Sep 2024',
    type: 'full-time',
    description: [
      'Built e-commerce platform with product management and order processing',
      'Implemented responsive storefront with smart search and filtering',
      'Developed reusable UI components and analytics dashboard',
      'Collaborated with team on scalable retail solutions',
    ],
    technologies: ['Next.js', 'Redux', 'Node.js', 'MongoDB', 'Firebase Auth', 'Tailwind CSS'],
    logo: '/images/better.webp',
  },
];

