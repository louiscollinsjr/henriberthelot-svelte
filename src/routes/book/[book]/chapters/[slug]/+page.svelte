<script lang="ts">
  import { marked } from 'marked';
  import { onMount } from 'svelte';

  // Use $props() in runes mode
  const props = $props<{ data: { content?: string }, params: { slug: string } }>();
  let renderedContent = $state('');

  // Format the display title (remove numbering)
  const formatTitle = (slug: string) => {
    return slug.replace(/^\d+[-\s]*/g, '').replace(/-/g, ' ');
  };

  onMount(() => {
    // console.log("Chapter component mounted, props:", props);
    if (props.data && props.data.content) {
      // console.log("Processing chapter content:", props.data.slug);
      try {
        renderedContent = marked.parse(props.data.content) as string;
        // console.log("Chapter content processed, length:", renderedContent.length);
      } catch (err) {
        // console.error("Error parsing markdown:", err);
        renderedContent = `<p>Error rendering content: ${err instanceof Error ? err.message : String(err)}</p>`;
      }
    } else {
      renderedContent = '';
      // console.log("No chapter content available:", props.data);
    }
  });
</script>

<!-- Show the chapter content with proper styling -->
<div class="prose prose-lg dark:prose-invert max-w-none p-4 text-sm text-gray-800">
  <!-- <h1 class="text-2xl font-bold mb-6">{formatTitle(props.params.slug)}</h1> -->
  <!-- Debug output (commented out)
  <pre class="text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4">
    Has data: {props.data ? 'Yes' : 'No'}
    Has content: {props.data && props.data.content ? 'Yes' : 'No'}
    Content length: {props.data && props.data.content ? props.data.content.length : 0}
    Rendered length: {renderedContent.length}
  </pre>
  -->
  
  {#if renderedContent}
    {@html renderedContent}
  {:else}
    <p>Loading content...</p>
  {/if}
</div>
