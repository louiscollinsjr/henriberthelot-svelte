import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
  const book = params.book;
  console.log('[DEBUG] Book param:', book);
  // Use Vite's import.meta.glob to get all chapters and frontmatter, then filter by book
  const allChapterFiles = import.meta.glob('/src/routes/book/*/chapters/*.mdx', { query: '?raw', import: 'default' });
  const allFrontmatterFiles = import.meta.glob('/src/routes/book/*/frontmatter/*.mdx', { query: '?raw', import: 'default' });
  console.log('[DEBUG] Total chapter files found:', Object.keys(allChapterFiles).length);
  console.log('[DEBUG] Total frontmatter files found:', Object.keys(allFrontmatterFiles).length);

  // Load chapters for this book
  const filteredChapterEntries = Object.entries(allChapterFiles).filter(([path]) => path.includes(`/book/${book}/chapters/`));
  console.log('[DEBUG] Filtered chapter files for book:', filteredChapterEntries.map(([path]) => path));
  const chapters = await Promise.all(
    filteredChapterEntries.map(async ([path, importFn]) => {
      const content = await importFn();
      const slug = path.split('/').pop().replace('.mdx', '');
      return {
        title: slug.replace(/-/g, ' '),
        slug,
        content
      };
    })
  );

  // Load frontmatter for this book
  const filteredFrontmatterEntries = Object.entries(allFrontmatterFiles).filter(([path]) => path.includes(`/book/${book}/frontmatter/`));
  console.log('[DEBUG] Filtered frontmatter files for book:', filteredFrontmatterEntries.map(([path]) => path));
  const frontMatter = await Promise.all(
    filteredFrontmatterEntries.map(async ([path, importFn]) => {
      const content = await importFn();
      const slug = path.split('/').pop().replace('.mdx', '');
      return {
        title: slug.replace(/-/g, ' '),
        slug,
        content
      };
    })
  );

  // Use Vite's import.meta.glob to get all book directories for sidebar
  const bookDirs = import.meta.glob('/src/routes/book/*/', { query: '?raw', import: 'default' });
  const books = Object.keys(bookDirs)
    .map(path => path.split('/').slice(-2, -1)[0])
    .filter(name => name !== '[book]');
  console.log('[DEBUG] Books detected:', books);

  return { book, frontMatter, chapters, books };
};
