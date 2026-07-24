import Link from 'next/link';
import React from 'react';

type LessonCardProps = {
  lesson: {
    slug: string;
    title: string;
    excerpt: string;
    level?: string;
    topic?: string;
  };
};

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-colors bg-white"
    >
      <h3 className="text-xl font-semibold text-gray-900">{lesson.title}</h3>
      <p className="text-sm text-gray-600 mt-2">{lesson.excerpt}</p>
      <div className="mt-3 text-xs text-gray-500">{lesson.level} • {lesson.topic}</div>
    </Link>
  );
}
