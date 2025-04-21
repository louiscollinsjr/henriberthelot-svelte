<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  const props = $props<{
    books?: string[]
    frontMatter?: {title: string, slug: string}[]
    chapters?: {title: string, slug: string}[]
    darkMode?: boolean
    toggleDarkMode?: () => void
    activeSection?: string
  }>();

  $effect(() => {
    // Debug logging
    console.log('Sidebar data:', {
      book: $page.params.book,
      frontMatter: props.frontMatter,
      chapters: props.chapters
    });
  });

  function goBack() {
    // Navigate directly to root instead of using browser history
    window.location.href = '/';
  }

  const formatBookName = (name: string) => {
    return name.replace('henri-berthelot-no-', 'Henri Berthelot No. ').replace(/-/g, ' ');
  }
  
  // Format chapter titles to remove number prefixes
  const formatChapterTitle = (title: string) => {
    // Remove chapter numbers like "01 - ", "1. ", "Chapter 1:", etc.
    return title.replace(/^(\d+[\s\-\.]+|\s*chapter\s+\d+[\s:]*\s*)/i, '').trim();
  }
  
  // Format front matter titles to remove number prefixes
  const formatFrontMatterTitle = (title: string) => {
    // Remove numbering like "01 - ", "1. ", etc.
    return title.replace(/^(\d+[\s\-\.]+)/i, '').trim();
  }

  const basePath = `/book/${$page.params.book}/contents`;
</script>

<aside class="w-full h-fit dark:bg-gray-800 py-8 px-4 flex flex-col items-start bg-zinc-50 rounded-lg">
  <!-- Back button at top when viewing a book -->
  {#if $page.params.book}
    <button 
      onclick={goBack}
      class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
    >
      ← Back to books
    </button>
  {/if}
  
  <!-- Title area -->
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-lg font-bold capitalize w-40">
      {$page.params.book ? formatBookName($page.params.book) : 'Books'}
    </h2>
  </div>

  <!-- Content area that switches based on context -->
  {#if !$page.params.book}
    <!-- BOOKS LIST VIEW -->
    {#each props.books || [] as book}
      <a 
        href="/book/{book}" 
        class="block capitalize rounded mb-1 text-xs"
      >
        {formatBookName(book)}
      </a>
    {/each}
  {:else}
    <!-- BOOK CONTENT VIEW -->
    <!-- Front Matter Section -->
    {#if props.frontMatter && props.frontMatter.length > 0}
      <div class="mb-6 text-xs font-roboto">
        <h3 class="font-bold text-[11px] text-gray-500 dark:text-gray-900 pb-1">Front Matter</h3>
        {#each props.frontMatter as item}
          <a 
            href="#frontmatter-{item.slug}"
            class="block capitalize rounded mb-1 px-2 py-1 transition-colors
              {props.activeSection === `frontmatter-${item.slug}` 
                ? 'bg-blue-200 text-blue-900 font-bold dark:bg-blue-700 dark:text-white' 
                : 'text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'}"
          >
            {formatFrontMatterTitle(item.title)}
          </a>
        {/each}
      </div>
    {:else}
      <div class="mb-6 text-gray-500">No front matter available</div>
    {/if}

    <!-- Chapters Section -->
    {#if props.chapters && props.chapters.length > 0}
      <div class="mb-2 text-xs font-roboto">
        <h3 class="font-bold text-[11px] text-gray-500 dark:text-gray-900 pb-1">Chapters</h3>
        {#each props.chapters as chapter}
          <a 
            href="#chapter-{chapter.slug}"
            class="block capitalize rounded mb-1 px-2 py-1 transition-colors
              {props.activeSection === `chapter-${chapter.slug}` 
                ? 'bg-blue-200 text-blue-900 font-bold dark:bg-blue-700 dark:text-white' 
                : 'text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'}"
          >
            {formatChapterTitle(chapter.title)}
          </a>
        {/each}
      </div>
    {:else}
      <div class="text-gray-500">No chapters available</div>
    {/if}
  {/if}
</aside>
