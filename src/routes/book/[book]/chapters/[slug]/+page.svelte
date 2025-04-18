<script lang="ts">
  const { data } = $props<{ data: any }>();
</script>

<svelte:component this={data.component} {...data.props} />
