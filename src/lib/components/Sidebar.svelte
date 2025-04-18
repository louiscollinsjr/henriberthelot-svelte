<script lang="ts">
  import '@fontsource/roboto/400.css'; // Regular
  import '@fontsource/roboto/700.css'; // Bold

  // Destructure props (regular values only)
  const { 
    chapters = [], 
    frontMatter = [], 
    current: initialCurrent = "", 
    darkMode: initialDarkMode = false, 
    toggleDarkMode = () => {} 
  } = $props<{
    chapters?: string[],
    frontMatter?: { slug: string, title: string }[],
    current?: string,
    darkMode?: boolean,
    toggleDarkMode?: () => void
  }>();

  // Use $state() for reactivity, initialized from props
  let current = $state(initialCurrent);
  let darkMode = $state(initialDarkMode);
</script>

<aside class="sidebar h-screen w-56 flex flex-col justify-between p-3 pt-6 pr-6 select-none text-xs">
  <nav class="text-xs">
    <div class="mb-4 tracking-widest text-gray-500 dark:text-gray-400 text-xs font-roboto pt-10">Front Matter</div>
    
      {#each frontMatter as page}
     
          <a href="/{page.slug}" class="block py-1 text-black dark:text-white no-underline hover:text-gray-600 dark:hover:text-gray-300 {current === page.slug ? 'text-gray-600 dark:text-gray-300' : ''}">
            {page.title}
          </a>
        
      {/each}
    
    <div class="mb-4 tracking-widest text-gray-500 dark:text-gray-400 text-xs">Chapters</div>
   
      {#each chapters as slug}
        <a href="/chapter/{slug}" class="block py-1 text-black dark:text-white no-underline hover:text-gray-600 dark:hover:text-gray-300 {current === slug ? 'text-gray-600 dark:text-gray-300' : ''}">
            {slug
              .replace(/^\d+-/, '') // Remove leading numbers and dash
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (c: string) => c.toUpperCase())
            }
          </a>
      {/each}
  </nav>
  <button class="mt-8 py-2 px-4 text-xs text-black dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800" on:click={toggleDarkMode}>
    {darkMode ? 'Light Mode' : 'Dark Mode'}
  </button>
</aside>

<style>
  .sidebar {
    font-family: 'Roboto', sans-serif;
    background-color: transparent;
  }
</style>
