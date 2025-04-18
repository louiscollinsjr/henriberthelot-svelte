<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  const props = $props<{
    data: {
      book: string
      books: string[]
      frontMatter: {title: string, slug: string}[]
      chapters: {title: string, slug: string}[]
    }
  }>();
  
  // Redirect to first front matter item when directly accessing /book/[book]
  onMount(() => {
    // Console log for debugging
    console.log('Book layout mounted for book:', props.data.book);
    console.log('Current pathname:', $page.url.pathname);
    console.log('Front matter items:', props.data.frontMatter);
    console.log('Chapters:', props.data.chapters);
    
    // Check if we're at the exact book path without subpath
    const exactBookPath = `/book/${props.data.book}`;
    const isExactBookPath = $page.url.pathname === exactBookPath || 
                          $page.url.pathname === `${exactBookPath}/`;
    
    console.log('Is exact book path:', isExactBookPath);
    
    if (isExactBookPath) {
      // If front matter exists, redirect to the first item
      if (props.data.frontMatter && props.data.frontMatter.length > 0) {
        const firstItem = props.data.frontMatter[0];
        console.log('Redirecting to front matter:', firstItem);
        
        // Use SvelteKit's goto instead of window.location for smoother navigation
        const targetUrl = `/book/${props.data.book}/frontmatter/${firstItem.slug}`;
        console.log('Redirecting to:', targetUrl);
        goto(targetUrl);
      } 
      // If no front matter but chapters exist, redirect to first chapter
      else if (props.data.chapters && props.data.chapters.length > 0) {
        const firstChapter = props.data.chapters[0];
        console.log('Redirecting to chapter:', firstChapter);
        
        const targetUrl = `/book/${props.data.book}/chapters/${firstChapter.slug}`;
        console.log('Redirecting to:', targetUrl);
        goto(targetUrl);
      }
    }
  });
</script>

<!-- Book specific layout -->
<div class="grid grid-cols-5 gap-x-2 gap-y-4 max-w-[980px] w-5xl mx-auto">
  <div class="col-span-2"></div>
  <aside class="row-start-2">
    <Sidebar 
      books={props.data.books}
      frontMatter={props.data.frontMatter}
      chapters={props.data.chapters}
    />
  </aside>
  <main class="row-start-2 col-span-4 p-4 pt-12 rounded-lg bg-gray-50/50">
    <slot />
  </main>
  <div class="col-span-2 row-start-3"></div>
</div>
