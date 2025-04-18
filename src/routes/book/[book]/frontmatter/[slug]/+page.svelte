<script lang="ts">
  const { data } = $props<{ data: any }>();
</script>

{#if typeof data.component === 'string'}
  {@html data.component}
{:else}
  {data.component}
{/if}
