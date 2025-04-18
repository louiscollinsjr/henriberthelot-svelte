<script lang="ts">
	import '../app.css';
	import '@fontsource/literata/400.css'; // Regular weight
	import '@fontsource/literata/700.css'; // Bold weight
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte'; 
    import { page } from '$app/stores'; 
	import { derived } from 'svelte/store';

	let current: string = '';
	let darkMode = false;

	function toggleDarkMode() {
		darkMode = !darkMode;
		if (darkMode) {
			document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark'); 
		} else {
			document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light'); 
		}
	}

	const chaptersStore = derived(page, ($page) =>
		$page.data.chapters || [
			'01-an-american-morning',
			'02-meeting-silvio',
		]
	);
	const frontMatterStore = derived(page, ($page) =>
		$page.data.frontMatter || [
			{ slug: 'title', title: 'The Title Page' },
			{ slug: 'dedication', title: 'The Dedication' },
			{ slug: 'epigraph', title: 'The Epigraph' },
			{ slug: 'preface', title: 'The Preface' },
			{ slug: 'map', title: 'The Map' },
		]
	);

	onMount(() => {
		current = window.location.pathname.replace(/^\//, '').replace(/^chapter\//, '');

		const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            darkMode = true;
            document.documentElement.classList.add('dark');
        } else {
            darkMode = false;
            document.documentElement.classList.remove('dark');
        }
	});

	type LayoutProps = {
		data: any; 
		children: Snippet;
	};
	
	const { data, children }: LayoutProps = $props();
	console.log('[ROUTE DEBUG] Layout data:', data);
	console.log('[ROUTE DEBUG] Layout children:', children);
</script>

<div class="max-w-[980px] mx-auto text-sm">
  <div class="flex min-h-screen bg-[var(--background)]">
    <Sidebar {current} {darkMode} {toggleDarkMode}
      chapters={$chaptersStore}
      frontMatter={$frontMatterStore}
    />
    <main class="flex-1">
      <div class="px-8 pt-6"> 
         {@render children()}
      </div>
    </main>
  </div>
</div>
