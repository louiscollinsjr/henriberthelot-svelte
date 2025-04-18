<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Sidebar from '$lib/components/Sidebar.svelte';
  
  const props = $props<{
    data: {
      book: string
      books: string[]
      frontMatter: {title: string, slug: string}[]
      chapters: {title: string, slug: string}[]
    }
  }>();
</script>

<!-- Book specific layout -->
<div class="min-h-screen">
  <!-- Sidebar receives book content directly -->
  <Sidebar 
    books={props.data.books}
    frontMatter={props.data.frontMatter}
    chapters={props.data.chapters}
  />
  
  <!-- Main content area -->
  <main class="ml-64 p-6">
    <slot />
  </main>
</div>
