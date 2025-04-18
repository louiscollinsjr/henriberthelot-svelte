<script lang="ts">
  import { marked } from 'marked';
  // Use $props() in runes mode, matching the actual shape received
  const props = $props<{ data: { content?: string; slug?: string; title?: string } }>();
  let renderedContent = $state('');

  // Format the display title (remove numbering)
  const formatTitle = (slug: string) => {
    return slug ? slug.replace(/^\d+[-\s]*/g, '').replace(/-/g, ' ') : '';
  };

  $effect(() => {
    if (props.data?.content) {
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

<!-- Debug: show the props for troubleshooting -->
<!-- <pre>{JSON.stringify(props, null, 2)}</pre> -->

<!-- Show the chapter content with proper styling -->
<div class="prose prose-lg dark:prose-invert max-w-none p-4 text-sm text-gray-800">
  <h1 class="text-2xl font-bold mb-6">{formatTitle(props.data?.slug)}</h1>
  
  {#if renderedContent}
    {@html renderedContent}
  {:else}
    <p>Loading content...</p>
  {/if}
</div>
