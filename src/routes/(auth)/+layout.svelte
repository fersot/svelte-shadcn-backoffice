<script>
	import { theme } from '$lib/stores/theme.svelte.js';

	$effect(() => {
		const root = document.documentElement;
		if (theme.isDark) root.classList.add('dark');
		else root.classList.remove('dark');
	});
</script>

<div class="min-h-screen bg-muted/40 flex items-center justify-center p-4">
	<slot />
</div>
