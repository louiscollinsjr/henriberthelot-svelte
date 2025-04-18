<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  // Access the data passed from the page.server.ts file
  const props = $props<{ data: any }>();
  
  // Format the display title (remove numbering)
  const formatTitle = (slug: string) => {
    return slug.replace(/^\d+[-\s]*/g, '').replace(/-/g, ' ');
  };
  
  onMount(() => {
    console.log("Frontmatter props received:", JSON.stringify(props.data, null, 2));
  });
</script>

<!-- Show the frontmatter content with proper styling -->
<div class="prose prose-lg dark:prose-invert max-w-none p-4">
  <h1 class="text-2xl font-bold mb-6">{formatTitle($page.params.slug)}</h1>
  
  {#if props.data && props.data.content}
    <!-- Using {@html} to render the content as HTML -->
    {@html `
      <div class="markdown-content">
        ${props.data.content
          .replace(/^# (.*$)/gm, '<h1>$1</h1>')
          .replace(/^## (.*$)/gm, '<h2>$1</h2>')
          .replace(/^### (.*$)/gm, '<h3>$1</h3>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\n/g, '<br />')}
      </div>
    `}
  {:else}
    <p>Loading content...</p>
  {/if}
</div>
