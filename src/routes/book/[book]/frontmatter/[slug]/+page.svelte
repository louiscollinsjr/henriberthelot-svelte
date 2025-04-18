<script lang="ts">
  import { page } from '$app/stores';
  import { marked } from 'marked';
  
  // Access the data passed from the page.server.ts file
  const props = $props<{ data: any }>();
  let renderedContent = $state('');

  // Format the display title (remove numbering)
  const formatTitle = (slug: string) => {
    return slug.replace(/^\d+[-\s]*/g, '').replace(/-/g, ' ');
  };
  
  $effect(() => {
    if (props && props.data && props.data.content) {
      try {
        renderedContent = marked.parse(props.data.content) as string;
      } catch (err) {
        renderedContent = `<p>Error rendering content: ${err instanceof Error ? err.message : String(err)}</p>`;
      }
    } else {
      renderedContent = '';
    }
  });
</script>

<!-- Show the frontmatter content with proper styling -->
<div class="prose prose-lg dark:prose-invert max-w-none p-4 text-sm text-gray-800">
  <h1 class="text-2xl font-bold mb-6">{formatTitle($page.params.slug)}</h1>
  
  {#if renderedContent}
    {@html renderedContent}
  {:else}
    <p>Loading content...</p>
  {/if}
</div>
