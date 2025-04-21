<script lang="ts">
  import '@fontsource/estonia';
  import '@fontsource/mr-bedfort';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { marked } from 'marked';
  
  const { data, children } = $props<{
    data: {
      book: string
      books: string[]
      frontMatter: {title: string, slug: string, content: string}[]
      chapters: {title: string, slug: string, content: string}[]
    },
    children: any
  }>();
  
  // Redirect to first front matter item when directly accessing /book/[book]
  onMount(() => {
    // Console log for debugging
    console.log('Book layout mounted for book:', data.book);
    console.log('Current pathname:', $page.url.pathname);
    console.log('Front matter items:', data.frontMatter);
    console.log('Chapters:', data.chapters);
    
    // Check if we're at the exact book path without subpath
    const exactBookPath = `/book/${data.book}`;
    const isExactBookPath = $page.url.pathname === exactBookPath || 
                          $page.url.pathname === `${exactBookPath}/`;
    
    console.log('Is exact book path:', isExactBookPath);
    
    if (isExactBookPath) {
      // If front matter exists, redirect to the first item
      if (data.frontMatter && data.frontMatter.length > 0) {
        const firstItem = data.frontMatter[0];
        console.log('Redirecting to front matter:', firstItem);
        
        // Use SvelteKit's goto instead of window.location for smoother navigation
        const targetUrl = `/book/${data.book}/frontmatter/${firstItem.slug}`;
        console.log('Redirecting to:', targetUrl);
        goto(targetUrl);
      } 
      // If no front matter but chapters exist, redirect to first chapter
      else if (data.chapters && data.chapters.length > 0) {
        const firstChapter = data.chapters[0];
        console.log('Redirecting to chapter:', firstChapter);
        
        const targetUrl = `/book/${data.book}/chapters/${firstChapter.slug}`;
        console.log('Redirecting to:', targetUrl);
        goto(targetUrl);
      }
    }
  });
  
  // Format the display title (remove numbering)
  const formatTitle = (slug: string) => {
    return slug ? slug.replace(/^\d+[-\s]*/g, '').replace(/-/g, ' ') : '';
  };
  
  // Track the active section for highlighting in sidebar
  let activeSection = $state('');
  
  // Intersection observer for active section
  onMount(() => {
    setTimeout(() => {
      const sectionElements = document.querySelectorAll('.book-section');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
            // Update URL hash for bookmarking
            const newUrl = new URL(window.location.href);
            newUrl.hash = entry.target.id;
            history.replaceState(null, '', newUrl.toString());
          }
        });
      }, { threshold: 0.3 });
      sectionElements.forEach(section => {
        observer.observe(section);
      });
    }, 500);
  });

  // Scroll to section when hash changes
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      activeSection = sectionId;
    }
  };
  
  // Handle URL hash on load
  $effect(() => {
    if ($page.url.hash) {
      const sectionId = $page.url.hash.substring(1);
      scrollToSection(sectionId);
    }
  });
</script>

<!-- Book specific layout -->
<div class="grid grid-cols-5 gap-x-2 gap-y-4 max-w-[980px] w-5xl mx-auto">
  <div class="col-span-2"></div>
  <aside class="row-start-2 sticky top-8 self-start h-fit z-10">
    <Sidebar 
      books={data.books}
      frontMatter={data.frontMatter}
      chapters={data.chapters}
      activeSection={activeSection}
    />
  </aside>
  <main class="row-start-2 col-span-4 p-4 pt-12 rounded-lg bg-gray-50/50 prose prose-lg dark:prose-invert max-w-none overflow-y-auto" style="max-height:90vh;">
   
    <!-- Front Matter Sections -->
    {#if data.frontMatter && data.frontMatter.length > 0}
      {#each data.frontMatter as item, i}
        <section
          id="frontmatter-{item.slug}"
          class="book-section mb-16 py-20 min-h-[80vh] flex flex-col justify-center items-center bg-white/80" style="font-family: Georgia, 'Times New Roman', Times, serif;"
        >
          {#if item.content}
            <div class="prose prose-lg prose-p:mb-6 prose-p:mt-0 dark:prose-invert" style="font-family: Georgia, 'Times New Roman', Times, serif;">
              {@html marked.parse(item.content)}
            </div>
          {:else}
            <p>Loading content...</p>
          {/if}
        </section>
      {/each}
    {/if}
    
    <!-- Chapter Sections -->
    {#if data.chapters && data.chapters.length > 0}
      {#each data.chapters as chapter, i}
        <section
          id="chapter-{chapter.slug}"
          class="book-section mb-16 py-20 px-20 min-h-[80vh] flex flex-col justify-center items-center bg-white/80" style="font-family: Georgia, 'Times New Roman', Times, serif;"
        >
          {#if chapter.content}
            <div class="prose prose-lg prose-p:mb-6 prose-p:mt-0 dark:prose-invert" style="font-family: Georgia, 'Times New Roman', Times, serif;">
              {@html marked.parse(chapter.content)}
            </div>
          {:else}
            <p>Loading content...</p>
          {/if}
        </section>
      {/each}
    {/if}
    
    <!-- If no content is loaded yet -->
    {#if (!data.frontMatter || data.frontMatter.length === 0) && 
          (!data.chapters || data.chapters.length === 0)}
      <div class="text-center py-12">
        <p>Loading book content...</p>
      </div>
    {/if}

    <!-- No {@render children()} here! -->
  
  </main>
  <div class="col-span-2 row-start-3"></div>
</div>
