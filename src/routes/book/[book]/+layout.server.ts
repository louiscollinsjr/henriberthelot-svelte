import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
  const book = params.book;
  // Use Vite's import.meta.glob to get all chapters and frontmatter, then filter by book
  const allChapterFiles = import.meta.glob('/src/routes/book/*/chapters/*.mdx', { query: '?raw', import: 'default' });
  const allFrontmatterFiles = import.meta.glob('/src/routes/book/*/frontmatter/*.mdx', { query: '?raw', import: 'default' });

  // Load chapters for this book
  const chapters = await Promise.all(
    Object.entries(allChapterFiles)
      .filter(([path]) => path.includes(`/book/${book}/chapters/`))
      .map(async ([path, importFn]) => {
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
  const frontMatter = await Promise.all(
    Object.entries(allFrontmatterFiles)
      .filter(([path]) => path.includes(`/book/${book}/frontmatter/`))
      .map(async ([path, importFn]) => {
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

  return { book, frontMatter, chapters, books };
};
