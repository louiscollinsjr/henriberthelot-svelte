<script lang="ts">
  const props = $props<{ 
    book: string, 
    chapters?: string[], 
    frontMatter?: { slug: string, title: string }[] 
  }>();
  
  // Debug info
  console.log('BookSidebar props:', props);
</script>

<aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
  {#if props.frontMatter?.length}
    <h2 class="text-lg font-semibold mt-2 mb-3 text-gray-700 dark:text-gray-300">Front Matter</h2>
    <nav class="mb-6">
      <ul>
        {#each props.frontMatter as item}
          <li class="mb-1">
            <a 
              href="/book/{props.book}/frontmatter/{item.slug}"
              class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {item.title}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
  
  {#if props.chapters?.length}
    <h2 class="text-lg font-semibold mt-6 mb-3 text-gray-700 dark:text-gray-300">Chapters</h2>
    <nav>
      <ul>
        {#each props.chapters as chapter}
          <li class="mb-1">
            <a 
              href="/book/{props.book}/chapters/{chapter}"
              class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {chapter.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</aside>

<style>
  .sidebar {
    width: 250px;
    padding: 1rem;
    background: #f8f8f8;
  }
</style>
