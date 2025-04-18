<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import '@fontsource/roboto/400.css';
  import '@fontsource/roboto/700.css';
  import '@fontsource/literata/400.css';
  import '@fontsource/literata/700.css';
  import '../app.css';
  
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  const props = $props<{
    data: { 
      books: string[]
    }
  }>();
  
  // Dark mode state
  let darkMode = false;
  const toggleDarkMode = () => {
    darkMode = !darkMode;
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  };
  
  onMount(() => {
    // Apply theme on initial load
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    darkMode = storedTheme ? storedTheme === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', darkMode);
  });
</script>

<!-- Only render if the client has loaded -->
{#if typeof window !== 'undefined'}
  <div class="min-h-screen grid grid-cols-5 grid-rows-[auto_1fr_auto] gap-4 max-w-[980px] w-5xl mx-auto font-roboto">
    <div class="col-span-5"></div>
    {#if !$page.params.book}
      <aside class="row-start-2">
        <Sidebar 
          books={props.data.books}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </aside>
    {/if}
    <main class="row-start-2 col-span-4">
      <slot />
    </main>
    <div class="col-span-5"></div>
  </div>
{/if}
