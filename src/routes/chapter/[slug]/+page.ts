import type { PageLoad } from './$types';

interface ChapterModule {
  default: ConstructorOfATypedSvelteComponent;
  metadata?: {
    title?: string;
  };
}

const chapters: Record<string, ChapterModule> = import.meta.glob('/src/lib/chapters/*.md', { eager: true });

export const load: PageLoad = async ({ params }) => {
  console.log('[DEBUG] Loader running with slug:', params.slug);
  if (!params.slug) {
    return { status: 404 };
  }
  const chapterPath = `/src/lib/chapters/${params.slug}.md`;
  const chapter = chapters[chapterPath];
  if (!chapter) {
    return { status: 404 };
  }
  return {
    Content: chapter.default,
    metadata: chapter.metadata ?? {},
    params: { slug: params.slug },
    availableChapters: Object.keys(chapters)
      .map((p) => p.split('/').pop()?.replace('.md', ''))
      .filter(Boolean)
  };
};
