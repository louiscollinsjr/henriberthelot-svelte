<script lang="ts">
  import { onMount } from 'svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { marked } from 'marked';
  import { page } from '$app/stores';
  let data = $page.data;
  let activeSection = '';

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      activeSection = sectionId;
    }
  }

  $effect(() => {
    if ($page.url.hash) {
      const sectionId = $page.url.hash.substring(1);
      scrollToSection(sectionId);
    }
  });
</script>

<!-- Book Contents Layout -->
<div class="grid grid-cols-5 gap-x-2 gap-y-4 max-w-[980px] w-5xl mx-auto">
  <div class="col-span-2"></div>
  <aside class="row-start-2 sticky top-8 self-start h-fit z-10">
    <Sidebar 
      books={data.books}
      frontMatter={data.frontMatter}
      chapters={data.chapters}
      activeSection={activeSection}
      basePath={`/book/${$page.params.book}/contents`}
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
  </main>
  <div class="col-span-2 row-start-3"></div>
</div>
