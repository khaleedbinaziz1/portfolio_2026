import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Kumira - Boat Ticketing Platform',
    description: 'Full-stack boat ticket booking platform with payment processing and management',
    longDescription: 'Boat ticketing platform with real-time availability, role-based dashboards, and Aamar Pay integration.',
    tech: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Aamar Pay API'],
    live: 'https://kumiraguptachara.com/',
    github: '#',
    featured: true,
    image: '/images/kumira.png',
  },
  {
    id: 2,
    title: 'Better-e-mart - E-commerce Platform',
    description: 'Complete e-commerce solution with product management, user accounts, and order processing',
    longDescription: 'E-commerce platform with responsive storefront, smart search, reusable components, analytics dashboard, and order management.',
    tech: ['Next.js', 'Redux', 'Node.js', 'MongoDB', 'Firebase Auth', 'Tailwind CSS'],
    live: 'https://betteremart.com/',
    github: '#',
    featured: true,
    image: '/images/better.png',
  },
  {
    id: 3,
    title: 'TakaSphere - Gamified Financial Literacy',
    description: 'Built the complete web platform with interactive dashboards, gamification, and user tracking',
    longDescription: 'Financial literacy platform with gamified learning, interactive dashboards, progress tracking, and Clerk authentication.',
    tech: ['Next.js', 'React.js', 'Tailwind CSS', 'Clerk'],
    live: 'https://www.takasphere.com/',
    github: '#',
    featured: true,
    image: '/images/takasphere.png',
  },
  {
    id: 4,
    title: 'Pixentix Auto Pilot - E-commerce Website Builder',
    description: 'Website builder with prebuilt Next.js components for instant website creation',
    longDescription: 'E-commerce website builder using prebuilt Next.js components. Create functional stores in under 10 minutes with drag-and-drop selection, payment integration, and responsive templates.',
    tech: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Tailwind CSS'],
    live: 'https://www.pixentix.com/',
    github: '#',
    featured: true,
    image: '/images/website_builder.png',
  },
];

