export type Resource = {
  slug: string;
  title: string;
  subject: string;
  level: string;
  topic: string;
  duration?: string;
  excerpt: string;
  contentHtml: string;
  pdfUrl?: string;
  videos?: Record<string, { title: string; url: string }[]>;
};

export const resources: Resource[] = [
  {
    slug: "topical-notes",
    title: "CS Topical Notes",
    subject: "Computer Science",
    level: "O Level",
    topic: "Notes",
    duration: "PDF",
    excerpt:
      "Chapter-wise CS notes covering every topic in the Cambridge O Level Computer Science syllabus.",
    pdfUrl: "/resources/topical_notes/",
    videos: {
      "chapter_1_data_representation.pdf": [
        {
          title: "Number Systems Explained",
          url: "https://www.youtube.com/watch?v=E-Sg2YsvZds",
        },
      ],
    },
    contentHtml: `
      <h2>CS Topical Notes</h2>
      <p>Structured notes for each major topic in the O Level Computer Science syllabus.</p>
      <ul>
        <li>Chapter-wise summaries</li>
        <li>Exam-friendly explanations</li>
        <li>Key terms and definitions</li>
      </ul>
    `,
  },

  {
    slug: "solved-past-papers",
    title: "CS Solved Past Papers",
    subject: "Computer Science",
    level: "O Level",
    topic: "Past Papers",
    duration: "PDF",
    excerpt:
      "Fully solved Cambridge CS past papers with clear explanations and model answers.",
    pdfUrl: "/resources/solved_papers/",
    contentHtml: `
      <h2>CS Solved Past Papers</h2>
      <p>Past-paper solutions designed to help students understand how to approach exam questions.</p>
    `,
  },

  {
    slug: "topical-question-papers",
    title: "CS Topical Question Papers",
    subject: "Computer Science",
    level: "O Level",
    topic: "Practice",
    duration: "PDF",
    excerpt:
      "Practice questions grouped by chapter and topic for focused CS revision.",
    pdfUrl: "/resources/topical_question_papers/",
    contentHtml: `
      <h2>CS Topical Question Papers</h2>
      <p>Targeted practice questions for revision and self-study.</p>
    `,
  },
];

export function getResourceBySlug(slug: string): Resource | null {
  return resources.find((resource) => resource.slug === slug) || null;
}

export function listresourceslugs(): string[] {
  return resources.map((resource) => resource.slug);
}