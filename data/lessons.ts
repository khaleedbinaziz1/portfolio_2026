export type Lesson = {
  slug: string;
  title: string;
  level: string;
  topic: string;
  duration?: string;
  excerpt: string;
  contentHtml: string;
};

export const lessons: Lesson[] = [
  {
    slug: 'intro-programming',
    title: 'Introduction to Programming',
    level: 'O Level',
    topic: 'Fundamentals',
    duration: '30m',
    excerpt: 'An introductory lesson covering basic programming concepts for O Level students.',
    contentHtml: `
      <h2>What is Programming?</h2>
      <p>Programming is the process of giving instructions to a computer to perform tasks. We express these instructions using a programming language.</p>

      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Variables</strong> — store values like numbers and text.</li>
        <li><strong>Expressions</strong> — compute values using operators.</li>
        <li><strong>Control flow</strong> — make decisions using conditions.</li>
      </ul>

      <h3>Simple Exercise</h3>
      <p>Write a program that prints "Hello, World!". Try changing the message and running it again.</p>

      <h3>Next Steps</h3>
      <p>Practice by creating small programs that use variables and conditions.</p>
    `,
  },
];

export function getLessonBySlug(slug: string) {
  return lessons.find((l) => l.slug === slug) || null;
}

export function listLessonSlugs() {
  return lessons.map((l) => l.slug);
}
