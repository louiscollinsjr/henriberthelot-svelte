<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  const { data } = $props<{
    data: {
      book: string,
      chapters: {title: string, slug: string, content: string}[]
    }
  }>();
  
  // Redirect to first chapter
  onMount(() => {
    if (data.chapters && data.chapters.length > 0) {
      const firstChapter = data.chapters[0];
      goto(`/book/${data.book}/chapters/${firstChapter.slug}`);
    }
  });
</script>

<div class="text-center py-12">
  <p>Loading chapter content...</p>
</div>
