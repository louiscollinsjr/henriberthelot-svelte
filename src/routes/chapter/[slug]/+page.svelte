<script lang="ts">
  import type { ComponentType } from 'svelte';

  type Props = {
    data: {
      Content: ComponentType;
      metadata: { title?: string };
      params: { slug: string };
      availableChapters: string[];
    };
  };

  // Removed Clue, Footnote, SettingBio imports as they are handled by MDX imports

  const { data }: Props = $props();
  const { Content, metadata, params, availableChapters } = data;

  console.log('[DEBUG] Component instance created with data:', data);
</script>

<svelte:head>
  <title>{metadata?.title ?? 'Chapter'}</title>
</svelte:head>

<article class="prose dark:prose-invert max-w-none">
  {#if Content}
    <Content />
  {:else}
    <div class="bg-red-50 p-4 rounded">
      <h3 class="text-red-800">Chapter not found</h3>
      <div class="mt-2 space-y-2">
        <div>Loader ran: <code>Yes</code></div>
        <div>Current slug: <code>{params?.slug ?? 'None'}</code></div>
        <div>Available chapters:
          <ul class="list-disc pl-5">
            {#each availableChapters as slug}
              <li>
                <a href="/chapter/{slug}" class="text-blue-600 hover:underline">{slug}</a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  {/if}
</article>
