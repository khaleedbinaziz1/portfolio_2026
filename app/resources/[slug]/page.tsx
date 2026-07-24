import fs from 'fs';
import path from 'path';
import { getResourceBySlug } from '@/data/resources';
import ResourcePage, { type PdfFile } from '@/components/ResourcePage';

type Props = {
  params: Promise<{ slug: string }>;
};

// A pdfUrl ending in "/" points at a folder under public/ (e.g. "/resources/topical_notes/").
// Everything else is treated as a single PDF file (e.g. "/resources/worksheets/chapter_2.pdf").
function isFolderUrl(pdfUrl: string) {
  return pdfUrl.endsWith('/');
}

function getPdfFilesInFolder(
  pdfUrl: string,
  videos?: Record<string, { title: string; url: string }[]>
): PdfFile[] {
  const relativeDir = pdfUrl.replace(/^\/+/, '').replace(/\/+$/, ''); // "resources/topical_notes"
  const dir = path.join(process.cwd(), 'public', relativeDir);

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.pdf'))
      .map((entry) => {
        const stats = fs.statSync(path.join(dir, entry.name));
        return {
          name: entry.name,
          href: `/${relativeDir}/${encodeURIComponent(entry.name)}`,
          sizeKB: Math.max(1, Math.round(stats.size / 1024)),
          videos: videos?.[entry.name],
        };
      })
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
      );
  } catch (err) {
    // Folder missing or unreadable — show an empty state instead of crashing the page
    console.error('[resources] could not read pdf folder:', dir, err);
    return [];
  }
}

export default async function LessonRoute({ params }: Props) {
  const { slug } = await params;
  const lesson = getResourceBySlug(slug);

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

  const folderMode = !!lesson.pdfUrl && isFolderUrl(lesson.pdfUrl);
  const pdfFiles = folderMode ? getPdfFilesInFolder(lesson.pdfUrl!, lesson.videos) : undefined;

  return (
    <ResourcePage
      title={lesson.title}
      html={lesson.contentHtml}
      pdfUrl={folderMode ? undefined : lesson.pdfUrl}
      pdfFiles={pdfFiles}
    />
  );
}