<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	
	type LayoutProps = {
		data: any; 
		children: Snippet;
	};
	
	const { data, children }: LayoutProps = $props();
	console.log('[ROUTE DEBUG] Layout data:', data);
	console.log('[ROUTE DEBUG] Layout children:', children);
</script>

{@render children()}
