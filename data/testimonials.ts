export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO',
    company: 'Tech Startup Inc.',
    content: 'Khaled delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Product Manager',
    company: 'Digital Solutions',
    content: 'Working with Khaled was a pleasure. He transformed our complex requirements into a beautiful, functional application. Highly recommended!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Founder',
    company: 'StartupXYZ',
    content: 'Khaled\'s code quality and problem-solving skills are outstanding. He delivered our project on time and within budget. Will definitely work with him again.',
    rating: 5,
  },
];

