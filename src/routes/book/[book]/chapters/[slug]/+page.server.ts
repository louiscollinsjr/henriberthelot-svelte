import { error } from '@sveltejs/kit';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function load({ params }) {
  try {
    const { book, slug } = params;
    
    // Construct the path to the chapter file
    const baseDir = `src/routes/book/${book}/chapters`;
    const mdxFileName = `${slug}.mdx`;
    const txtFileName = `${slug}.mdx.txt`; 
    
    let filePath = join(baseDir, mdxFileName);
    
    // Check if .mdx file exists, if not try .mdx.txt (for some files)
    if (!existsSync(filePath)) {
      filePath = join(baseDir, txtFileName);
      
      // If neither exists, throw error
      if (!existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        throw error(404, 'Content not found');
      }
    }
    
    // Log for debugging
    console.log(`Loading chapter content from: ${filePath}`);
    
    // Read the file content
    const content = readFileSync(filePath, 'utf-8');
    
    // Return the content for the page
    return {
      title: slug.replace(/-/g, ' '),
      slug,
      content
    };
  } catch (e) {
    console.error('Error loading chapter:', e);
    throw error(404, 'Chapter not found');
  }
}
