<script>
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Topbar from '$lib/components/layout/Topbar.svelte';

	let { children } = $props();
</script>

<div class="flex h-screen overflow-hidden bg-background">
	<Sidebar />

	<div class="flex flex-col flex-1 min-w-0 overflow-hidden">
		<Topbar />

		<main class="flex-1 overflow-y-auto">
			<div class="p-4 md:p-6 max-w-screen-2xl mx-auto">
				{@render children()}
			</div>
		</main>
	</div>
</div>
