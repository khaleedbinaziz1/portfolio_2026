export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Khaled Bin Aziz',
    jobTitle: 'Full-Stack Developer',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://khaledbinaziz.dev',
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://khaledbinaziz.dev'}/khaled_bin_aziz.jpg`,
    sameAs: [
      'https://github.com/khaleedbinaziz1',
      'https://www.linkedin.com/in/khaledbinaziz/',
    ],
    email: 'khaleedbinaziz@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chittagong',
      addressCountry: 'Bangladesh',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'East Delta University',
    },
    knowsAbout: [
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'MongoDB',
      'Express.js',
      'Web Development',
      'Full-Stack Development',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
