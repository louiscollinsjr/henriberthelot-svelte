<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  
  // Access the data passed from the page.server.ts file
  const props = $props<{ data: any }>();
  let renderedContent = $state('');

  // Format the display title (remove numbering)
  const formatTitle = (slug: string) => {
    return slug.replace(/^\d+[-\s]*/g, '').replace(/-/g, ' ');
  };
  
  onMount(() => {
    // console.log("Frontmatter component mounted, props:", props);
    if (props && props.data && props.data.content) {
      // console.log("Processing frontmatter content:", props.data.slug);
      try {
        renderedContent = marked.parse(props.data.content) as string;
      } catch (err) {
        // console.error("Error parsing markdown:", err);
        renderedContent = `<p>Error rendering content: ${err instanceof Error ? err.message : String(err)}</p>`;
      }
    } else {
      renderedContent = '';
      // console.log("No content available:", props?.data);
    }
  });
</script>

<!-- Show the frontmatter content with proper styling -->
<div class="prose prose-lg dark:prose-invert max-w-none p-4 text-sm text-gray-800">
  <!-- <h1 class="text-2xl font-bold mb-6">{formatTitle($page.params.slug)}</h1>
   -->
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
