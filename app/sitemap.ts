import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khaledbinaziz.dev';

  // Get all case study routes
  const caseStudies = projects
    .filter(project => project.caseStudy)
    .map(project => ({
      url: `${baseUrl}${project.caseStudy}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...caseStudies,
  ];
}
