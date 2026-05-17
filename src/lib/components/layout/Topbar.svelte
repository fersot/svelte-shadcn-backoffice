<script>
	import { page } from '$app/stores';
	import { sidebar } from '$lib/stores/sidebar.svelte.js';
	import { theme } from '$lib/stores/theme.svelte.js';
	import { Button } from '$lib/components/ui/button';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription
	} from '$lib/components/ui/sheet';
	import {
		DropdownMenu, DropdownMenuContent, DropdownMenuItem,
		DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import {
		Menu, Sun, Moon, Bell, LogOut, User, Settings,
		ChevronRight, CheckCheck, AlertTriangle, Info, X
	} from '@lucide/svelte';

	let currentPath = $derived($page.url.pathname);

	let autoBreadcrumbs = $derived(() => {
		const segments = currentPath.split('/').filter(Boolean);
		const crumbs = [{ label: 'Inicio', href: '/' }];
		let acc = '';
		for (const seg of segments) {
			acc += '/' + seg;
			crumbs.push({
				label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
				href: acc
			});
		}
		return crumbs;
	});

	// ── Notification sheet ───────────────────────────────────────────────────
	let notifOpen = $state(false);

	let notifications = $state([
		{ id: 1, type: 'error',   read: false, title: 'Pago fallido',             desc: 'Transacción #00286 rechazada.',               time: 'Hace 3 h' },
		{ id: 2, type: 'warning', read: false, title: 'Límite de usuarios',        desc: 'Ya tiene 487 / 500 usuarios activos.',         time: 'Hace 5 h' },
		{ id: 3, type: 'info',    read: false, title: 'Nuevo usuario registrado',  desc: 'Carlos Mendoza pendiente de verificación.',    time: 'Hace 6 h' },
		{ id: 4, type: 'success', read: false, title: 'Backup completado',         desc: 'El backup diario fue generado exitosamente.',  time: 'Hace 8 h' },
		{ id: 5, type: 'info',    read: false, title: 'Reporte disponible',        desc: 'Reporte de abril listo para descargar.',       time: 'Ayer' },
	]);

	let unread = $derived(notifications.filter(n => !n.read).length);

	function markRead(id) { notifications = notifications.map(n => n.id === id ? {...n, read: true} : n); }
	function markAllRead() { notifications = notifications.map(n => ({...n, read: true})); }
	function dismiss(id) { notifications = notifications.filter(n => n.id !== id); }

	const typeColor = {
		error:   'text-destructive', warning: 'text-amber-500',
		info:    'text-blue-500',    success: 'text-emerald-500'
	};
	const TypeIcon = { error: AlertTriangle, warning: AlertTriangle, info: Info, success: CheckCheck };
</script>

<header class="h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-4 gap-3 shrink-0 z-10 sticky top-0">
	<!-- Mobile hamburger -->
	<Button variant="ghost" size="icon" class="md:hidden shrink-0" onclick={() => sidebar.toggleMobile()} aria-label="Abrir menú">
		<Menu class="size-4" />
	</Button>

	<!-- Breadcrumbs -->
	<nav class="flex items-center gap-1 text-sm text-muted-foreground flex-1 min-w-0 sm:flex hidden" aria-label="Breadcrumb">
		{#each autoBreadcrumbs() as crumb, i}
			{#if i > 0}<ChevronRight class="size-3 shrink-0" />{/if}
			{#if i === autoBreadcrumbs().length - 1}
				<span class="text-foreground font-medium truncate">{crumb.label}</span>
			{:else}
				<a href={crumb.href} class="hover:text-foreground transition-colors truncate">{crumb.label}</a>
			{/if}
		{/each}
	</nav>

	<div class="ml-auto flex items-center gap-1">
		<!-- Notification bell -->
		<Button variant="ghost" size="icon" class="relative" onclick={() => notifOpen = true} aria-label="Notificaciones">
			<Bell class="size-4" />
			{#if unread > 0}
				<span class="absolute top-1.5 right-1.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-destructive text-[9px] font-bold text-white flex items-center justify-center leading-none">
					{unread > 9 ? '9+' : unread}
				</span>
			{/if}
		</Button>

		<!-- Theme toggle -->
		<Button variant="ghost" size="icon" onclick={() => theme.toggle()} aria-label="Cambiar tema">
			{#if theme.isDark}<Sun class="size-4" />{:else}<Moon class="size-4" />{/if}
		</Button>

		<!-- User menu -->
		<DropdownMenu>
			<DropdownMenuTrigger class="flex items-center gap-2 px-2 h-9 rounded-md hover:bg-accent transition-colors">
				<Avatar class="size-7">
					<AvatarFallback class="text-xs bg-primary text-primary-foreground">AD</AvatarFallback>
				</Avatar>
				<div class="hidden lg:flex flex-col items-start">
					<span class="text-xs font-medium leading-none">Admin User</span>
					<span class="text-[10px] text-muted-foreground leading-none mt-0.5">admin@empresa.com</span>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" class="w-48">
				<DropdownMenuLabel class="font-normal">
					<div class="flex flex-col gap-0.5">
						<span class="text-sm font-medium">Admin User</span>
						<span class="text-xs text-muted-foreground">admin@empresa.com</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<a href="/perfil" class="flex items-center w-full"><User class="mr-2 size-3.5" />Perfil</a>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<a href="/configuracion" class="flex items-center w-full"><Settings class="mr-2 size-3.5" />Configuración</a>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem class="text-destructive focus:text-destructive">
					<a href="/login" class="flex items-center w-full"><LogOut class="mr-2 size-3.5" />Cerrar sesión</a>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</header>

<!-- Notification Sheet -->
<Sheet bind:open={notifOpen}>
	<SheetContent side="right" class="w-80 sm:w-96 flex flex-col p-0">
		<SheetHeader class="px-5 pt-5 pb-3 border-b border-border">
			<div class="flex items-center justify-between">
				<SheetTitle class="text-base flex items-center gap-2">
					Notificaciones
					{#if unread > 0}
						<Badge variant="destructive" class="text-[10px] h-5 px-1.5 rounded-full">{unread}</Badge>
					{/if}
				</SheetTitle>
				<button onclick={markAllRead} disabled={unread === 0}
					class="text-xs text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1">
					<CheckCheck class="size-3.5" />Marcar todo
				</button>
			</div>
			<SheetDescription class="text-xs">Últimas alertas y eventos del sistema</SheetDescription>
		</SheetHeader>

		<div class="flex-1 overflow-y-auto">
			{#each notifications as notif}
				{@const Icon = TypeIcon[notif.type]}
				<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
				<div
					class="flex gap-3 px-5 py-4 border-b border-border cursor-pointer transition-colors group {notif.read ? '' : 'bg-muted/20 hover:bg-muted/30'}"
					onclick={() => markRead(notif.id)}
				>
					<Icon class="size-4 mt-0.5 shrink-0 {typeColor[notif.type]}" />
					<div class="flex-1 min-w-0">
						<div class="flex items-start justify-between gap-1">
							<p class="text-sm font-medium {notif.read ? 'text-muted-foreground' : 'text-foreground'} leading-tight">{notif.title}</p>
							<div class="flex items-center gap-1 shrink-0">
								{#if !notif.read}<span class="size-1.5 rounded-full bg-primary mt-1"></span>{/if}
								<button onclick={(e) => { e.stopPropagation(); dismiss(notif.id); }}
									class="opacity-0 group-hover:opacity-100 size-4 rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
									<X class="size-3" />
								</button>
							</div>
						</div>
						<p class="text-xs text-muted-foreground mt-0.5 leading-relaxed">{notif.desc}</p>
						<p class="text-[10px] text-muted-foreground mt-1">{notif.time}</p>
					</div>
				</div>
			{/each}

			{#if notifications.length === 0}
				<div class="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
					<Bell class="size-10 opacity-20" />
					<p class="text-sm">Sin notificaciones</p>
				</div>
			{/if}
		</div>

		<div class="border-t border-border px-5 py-3">
			<a href="/notificaciones" onclick={() => notifOpen = false}
				class="text-xs text-primary hover:underline flex items-center gap-1">
				Ver todas las notificaciones <ChevronRight class="size-3" />
			</a>
		</div>
	</SheetContent>
</Sheet>
