import { readdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

export const load = async ({ params, fetch }) => {
  const book = params.book;
  const baseDir = `src/routes/book/${book}`;
  
  console.log(`Loading book: ${book}`);
  
  // Get front matter WITH CONTENT
  let frontMatter = [];
  try {
    const frontMatterDir = join(baseDir, 'frontmatter');
    if (existsSync(frontMatterDir)) {
      frontMatter = readdirSync(frontMatterDir)
        .filter(file => file.endsWith('.mdx'))
        .map(file => {
          const filePath = join(frontMatterDir, file);
          let content = '';
          try {
            content = readFileSync(filePath, 'utf-8');
          } catch (err) {
            console.error('Error reading frontmatter file', filePath, err);
          }
          return {
            title: file.replace('.mdx', '').replace(/-/g, ' '),
            slug: file.replace('.mdx', ''),
            content
          };
        });
      console.log(`Loaded ${frontMatter.length} frontmatter items with content.`);
    } else {
      console.log('Front matter directory does not exist');
    }
  } catch (err) {
    console.error('Error loading frontmatter:', err);
  }
  
  // Get chapters WITH CONTENT
  let chapters = [];
  try {
    const chaptersDir = join(baseDir, 'chapters');
    if (existsSync(chaptersDir)) {
      chapters = readdirSync(chaptersDir)
        .filter(file => file.endsWith('.mdx'))
        .map(file => {
          const filePath = join(chaptersDir, file);
          let content = '';
          try {
            content = readFileSync(filePath, 'utf-8');
          } catch (err) {
            console.error('Error reading chapter file', filePath, err);
          }
          return {
            title: file.replace('.mdx', '').replace(/-/g, ' '),
            slug: file.replace('.mdx', ''),
            content
          };
        });
      console.log(`Loaded ${chapters.length} chapters with content.`);
    } else {
      console.log('Chapters directory does not exist');
    }
  } catch (err) {
    console.error('Error loading chapters:', err);
  }

  // Load books list from main layout
  const { books = [] } = await fetch('/')
    .then(r => r.json())
    .catch(() => ({ books: [] }));

  return {
    book,
    frontMatter,
    chapters,
    books
  };
};
