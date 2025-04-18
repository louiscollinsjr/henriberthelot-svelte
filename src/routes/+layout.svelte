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
  <div class="min-h-screen font-roboto">
    <!-- Only show sidebar on root route -->
    {#if !$page.params.book}
      <Sidebar 
        books={props.data.books}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main class="ml-64 p-6">
        <slot />
      </main>
    {:else}
      <slot />
    {/if}
  </div>
{/if}
