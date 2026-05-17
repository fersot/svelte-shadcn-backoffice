<script>
	import { page } from '$app/stores';
	import { sidebar } from '$lib/stores/sidebar.svelte.js';
	import { navGroups } from '$lib/config/nav.js';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';


	let currentPath = $derived($page.url.pathname);

	function isActive(href) {
		if (href === '/') return currentPath === '/';
		return currentPath.startsWith(href);
	}
</script>

<!-- Desktop sidebar -->
<aside class="hidden md:flex flex-col w-60 border-r border-border bg-card shrink-0">
	<!-- Logo -->
	<div class="flex items-center gap-3 px-4 h-14 border-b border-border shrink-0">
		<div class="size-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
			<span class="text-primary-foreground font-bold text-sm">B</span>
		</div>
		<span class="font-semibold text-sm tracking-tight text-foreground truncate">Backoffice</span>
	</div>

	<!-- Nav -->
	<nav class="flex-1 overflow-y-auto py-3 px-2 space-y-4">
		{#each navGroups as group}
			<div>
				<p class="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
					{group.title}
				</p>
				<ul class="space-y-0.5">
					{#each group.items as item}
						{@const active = isActive(item.href)}
						<li>
							<a
								href={item.href}
								class="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
									{active
									? 'bg-primary text-primary-foreground font-medium'
									: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}"
							>
								<item.icon class="size-4 shrink-0" />
								<span class="truncate flex-1">{item.label}</span>
								{#if item.badge}
									<Badge variant="secondary" class="text-[10px] h-5 px-1.5 rounded-full ml-auto">
										{item.badge}
									</Badge>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</nav>

</aside>

<!-- Mobile drawer -->
{#if sidebar.mobileOpen}
	<!-- Overlay -->
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-40 bg-black/50 md:hidden"
		onclick={() => sidebar.closeMobile()}
	></div>

	<!-- Drawer panel -->
	<aside class="fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-card border-r border-border shadow-xl md:hidden">
		<!-- Logo -->
		<div class="flex items-center gap-3 px-4 h-14 border-b border-border shrink-0">
			<div class="size-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
				<span class="text-primary-foreground font-bold text-sm">B</span>
			</div>
			<span class="font-semibold text-sm tracking-tight text-foreground">Backoffice</span>
		</div>

		<!-- Nav -->
		<nav class="flex-1 overflow-y-auto py-3 px-2 space-y-4">
			{#each navGroups as group}
				<div>
					<p class="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
						{group.title}
					</p>
					<ul class="space-y-0.5">
						{#each group.items as item}
							{@const active = isActive(item.href)}
							<li>
								<a
									href={item.href}
									onclick={() => sidebar.closeMobile()}
									class="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
										{active
										? 'bg-primary text-primary-foreground font-medium'
										: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}"
								>
									<item.icon class="size-4 shrink-0" />
									<span class="truncate flex-1">{item.label}</span>
									{#if item.badge}
										<Badge variant="secondary" class="text-[10px] h-5 px-1.5 rounded-full ml-auto">
											{item.badge}
										</Badge>
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</aside>
{/if}
