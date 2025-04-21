<script lang="ts">
  import { onMount } from 'svelte';
  
  const { data } = $props<{
    data: {
      books: string[]
    }
  }>();
  
  // Format book titles for display
  const formatBookTitle = (book: string) => {
    return book.replace(/-/g, ' ').replace(/\bno\.\s*(\d+)/i, 'No. $1');
  };
</script>

<div class="py-12">
  <h1 class="text-3xl font-bold mb-8 text-center">Available Books</h1>
  
  {#if data.books && data.books.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each data.books as book}
        <a 
          href="/book/{book}" 
          class="block p-6 bg-white hover:bg-gray-100 rounded-lg shadow-sm transition-colors"
        >
          <h2 class="text-xl font-semibold mb-2 capitalize">{formatBookTitle(book)}</h2>
          <p class="text-gray-600">Click to read</p>
        </a>
      {/each}
    </div>
  {:else}
    <p class="text-center text-gray-600">No books available</p>
  {/if}
</div>
