export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  icon?: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024',
    credentialId: 'AWS-CSA-12345',
    link: '#',
  },
  {
    id: 2,
    title: 'Meta Front-End Developer',
    issuer: 'Meta (Coursera)',
    date: '2023',
    credentialId: 'META-FE-67890',
    link: '#',
  },
  {
    id: 3,
    title: 'Full Stack Web Development',
    issuer: 'freeCodeCamp',
    date: '2022',
    credentialId: 'FCC-FSWD-11111',
    link: '#',
  },
  {
    id: 4,
    title: 'React Advanced Patterns',
    issuer: 'Frontend Masters',
    date: '2023',
    credentialId: 'FEM-REACT-22222',
    link: '#',
  },
];

