'use client';

import React from 'react';
import { getLessonBySlug } from '@/data/lessons';
import LessonPage from '@/components/LessonPage';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function LessonRoute({ params }: Props) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Lesson not found</h2>
          <p className="mt-4 text-gray-600">The lesson you requested does not exist.</p>
        </div>
      </div>
    );
  }

  return <LessonPage title={lesson.title} html={lesson.contentHtml} />;
}
