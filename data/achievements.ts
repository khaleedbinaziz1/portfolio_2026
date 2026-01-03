import { IconType } from 'react-icons';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: IconType;
  value: string;
  color: string;
}

import { 
  FiFolder, 
  FiUsers, 
  FiZap, 
  FiCheckCircle, 
  FiBarChart2, 
  FiCode 
} from 'react-icons/fi';

export const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Projects Completed',
    description: 'Successfully delivered projects',
    icon: FiFolder,
    value: '15+',
    color: '#006400',
  },
  {
    id: 2,
    title: 'Users Served',
    description: 'Active users across platforms',
    icon: FiUsers,
    value: '5,000+',
    color: '#008b8b',
  },
  {
    id: 3,
    title: 'Performance Boost',
    description: 'Average optimization improvement',
    icon: FiZap,
    value: '70%',
    color: '#cc6600',
  },
  {
    id: 4,
    title: 'Test Coverage',
    description: 'Code quality assurance',
    icon: FiCheckCircle,
    value: '85%',
    color: '#b8860b',
  },
  {
    id: 5,
    title: 'Daily Requests',
    description: 'Handled by microservices',
    icon: FiBarChart2,
    value: '50K+',
    color: '#6a5acd',
  },
  {
    id: 6,
    title: 'Years Experience',
    description: 'In production development',
    icon: FiCode,
    value: '2+',
    color: '#c71585',
  },
];

