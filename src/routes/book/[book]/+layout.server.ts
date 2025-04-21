import type { LayoutServerLoad } from './contents/$types';
import { error } from '@sveltejs/kit';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

export const load: LayoutServerLoad = async ({ params }) => {
  try {
    const { book } = params;
    const baseDir = `src/content/books/${book}`;
    const frontmatterDir = join(process.cwd(), baseDir, 'frontmatter');
    const chaptersDir = join(process.cwd(), baseDir, 'chapters');
    
    // Read frontmatter files
    let frontMatter = [];
    if (existsSync(frontmatterDir)) {
      const files = readdirSync(frontmatterDir).filter(f => f.endsWith('.mdx'));
      frontMatter = files.map(file => {
        const slug = file.replace(/\.mdx$/, '');
        const content = readFileSync(join(frontmatterDir, file), 'utf-8');
        return { title: slug.replace(/-/g, ' '), slug, content };
      });
    }

    // Read chapter files
    let chapters = [];
    if (existsSync(chaptersDir)) {
      const files = readdirSync(chaptersDir).filter(f => f.endsWith('.mdx'));
      chapters = files.map(file => {
        const slug = file.replace(/\.mdx$/, '');
        const content = readFileSync(join(chaptersDir, file), 'utf-8');
        return { title: slug.replace(/-/g, ' '), slug, content };
      });
    }

    return {
      books: [], // Populate if you want a list of books
      frontMatter,
      chapters
    };
  } catch (e) {
    throw error(404, 'Book not found');
  }
};
