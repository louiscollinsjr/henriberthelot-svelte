import { error } from '@sveltejs/kit';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function load({ params }) {
  try {
    const { book, slug } = params;
    console.log(`Server loading frontmatter content for book: ${book}, slug: ${slug}`);
    
    // Construct the path to the frontmatter file
    const baseDir = `src/content/books/${book}/frontmatter`;
    const mdxFileName = `${slug}.mdx`;
    const txtFileName = `${slug}.mdx.txt`; 
    
    let filePath = join(process.cwd(), baseDir, mdxFileName);
    console.log(`Checking for file at: ${filePath}`);
    
    // Check if .mdx file exists, if not try .mdx.txt (for some files)
    if (!existsSync(filePath)) {
      filePath = join(process.cwd(), baseDir, txtFileName);
      console.log(`Checking for alternate file at: ${filePath}`);
      
      // If neither exists, throw error
      if (!existsSync(filePath)) {
        console.error(`No content file found for ${slug} in ${book} frontmatter`);
        throw error(404, 'Content not found');
      }
    }
    
    // Log for debugging
    console.log(`Loading frontmatter content from: ${filePath}`);
    
    try {
      // Read the file content
      const content = readFileSync(filePath, 'utf-8');
      console.log(`Successfully loaded content, length: ${content.length} characters`);
      console.log(`First 100 chars: ${content.substring(0, 100)}`);
      
      // Return the content for the page
      return {
        title: slug.replace(/-/g, ' '),
        slug,
        content
      };
    } catch (e) {
      console.error(`Error reading file ${filePath}:`, e);
      throw error(404, 'Frontmatter not found');
    }
  } catch (e) {
    console.error('Error loading frontmatter:', e);
    throw error(404, 'Frontmatter not found');
  }
}
