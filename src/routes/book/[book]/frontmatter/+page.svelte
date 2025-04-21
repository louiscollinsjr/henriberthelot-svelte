<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  const { data } = $props<{
    data: {
      book: string,
      frontMatter: {title: string, slug: string, content: string}[]
    }
  }>();
  
  // Redirect to first frontmatter item
  onMount(() => {
    if (data.frontMatter && data.frontMatter.length > 0) {
      const firstItem = data.frontMatter[0];
      goto(`/book/${data.book}/frontmatter/${firstItem.slug}`);
    }
  });
</script>

<div class="text-center py-12">
  <p>Loading frontmatter content...</p>
</div>
