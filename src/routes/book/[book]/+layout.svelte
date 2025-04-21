<script lang="ts">
  import '@fontsource/estonia';
  import '@fontsource/mr-bedfort';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { marked } from 'marked';
  
  const props = $props<{
    data: {
      book: string
      books: string[]
      frontMatter: {title: string, slug: string, content: string}[]
      chapters: {title: string, slug: string, content: string}[]
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
  const scrollToSection = (sectionId) => {
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
      books={props.data.books}
      frontMatter={props.data.frontMatter}
      chapters={props.data.chapters}
      activeSection={activeSection}
    />
  </aside>
  <main class="row-start-2 col-span-4 p-4 pt-12 rounded-lg bg-gray-50/50 prose prose-lg dark:prose-invert max-w-none overflow-y-auto" style="max-height:90vh;">
    <!-- Front Matter Sections -->
    {#if props.data.frontMatter && props.data.frontMatter.length > 0}
      {#each props.data.frontMatter as item, i}
        <section
          id="frontmatter-{item.slug}"
          class="book-section mb-16 py-20 min-h-[80vh] flex flex-col justify-center items-center bg-white/80" style="font-family: Georgia, 'Times New Roman', Times, serif;"
        >
          <!-- <h1 class="text-3xl font-bold mb-8 text-center">{formatTitle(item.slug)}</h1> -->
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
    {#if props.data.chapters && props.data.chapters.length > 0}
      {#each props.data.chapters as chapter, i}
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
    {#if (!props.data.frontMatter || props.data.frontMatter.length === 0) && 
          (!props.data.chapters || props.data.chapters.length === 0)}
      <div class="text-center py-12">
        <p>Loading book content...</p>
      </div>
    {/if}
  </main>
  <div class="col-span-2 row-start-3"></div>
</div>
