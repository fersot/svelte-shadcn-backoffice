<script>
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Bell, CheckCheck, Info, AlertTriangle, X, BellOff, Settings
	} from '@lucide/svelte';

	const allNotifications = [
		{
			id: 1, type: 'error', read: false,
			title: 'Pago fallido',
			desc: 'La transacción #00286 de Sofía Blanco fue rechazada por fondos insuficientes.',
			time: 'Hace 3 h', category: 'Facturación'
		},
		{
			id: 2, type: 'warning', read: false,
			title: 'Límite de usuarios alcanzado',
			desc: 'El plan actual permite hasta 500 usuarios activos. Ya tiene 487.',
			time: 'Hace 5 h', category: 'Sistema'
		},
		{
			id: 3, type: 'info', read: false,
			title: 'Nuevo usuario registrado',
			desc: 'Carlos Mendoza se registró y está pendiente de verificación.',
			time: 'Hace 6 h', category: 'Usuarios'
		},
		{
			id: 4, type: 'success', read: false,
			title: 'Backup completado',
			desc: 'El backup automático diario fue generado exitosamente.',
			time: 'Hace 8 h', category: 'Sistema'
		},
		{
			id: 5, type: 'info', read: false,
			title: 'Reporte mensual disponible',
			desc: 'El reporte del mes de abril ya está listo para descargar.',
			time: 'Ayer, 9:00', category: 'Reportes'
		},
		{
			id: 6, type: 'success', read: true,
			title: 'Pago procesado',
			desc: 'Ana Torres realizó un pago de $512.00 correctamente.',
			time: 'Ayer, 14:30', category: 'Facturación'
		},
		{
			id: 7, type: 'info', read: true,
			title: 'Actualización del sistema',
			desc: 'Se realizará mantenimiento el domingo a las 03:00 UTC.',
			time: 'Hace 2 días', category: 'Sistema'
		},
		{
			id: 8, type: 'warning', read: true,
			title: 'Sesión desde IP inusual',
			desc: 'Se detectó un acceso desde Argentina (IP 200.45.x.x).',
			time: 'Hace 3 días', category: 'Seguridad'
		}
	];

	let notifications = $state(allNotifications);
	let filter = $state('all'); // 'all' | 'unread'

	let displayed = $derived(
		filter === 'unread'
			? notifications.filter(n => !n.read)
			: notifications
	);

	let unreadCount = $derived(notifications.filter(n => !n.read).length);

	function markRead(id) {
		notifications = notifications.map(n => n.id === id ? { ...n, read: true } : n);
	}

	function markAllRead() {
		notifications = notifications.map(n => ({ ...n, read: true }));
	}

	function dismiss(id) {
		notifications = notifications.filter(n => n.id !== id);
	}

	const typeIcon = { error: AlertTriangle, warning: AlertTriangle, info: Info, success: CheckCheck };
	const typeColor = {
		error:   'text-destructive bg-destructive/10',
		warning: 'text-amber-500 bg-amber-500/10',
		info:    'text-blue-500 bg-blue-500/10',
		success: 'text-emerald-500 bg-emerald-500/10'
	};
	const categoryColor = {
		Facturación: 'default', Sistema: 'secondary', Usuarios: 'outline', Reportes: 'secondary', Seguridad: 'destructive'
	};
</script>

<svelte:head>
	<title>Notificaciones — Backoffice</title>
</svelte:head>

<div class="space-y-6 max-w-3xl">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-xl font-semibold text-foreground flex items-center gap-2">
				Notificaciones
				{#if unreadCount > 0}
					<Badge variant="destructive" class="text-[10px] h-5 px-1.5 rounded-full">{unreadCount}</Badge>
				{/if}
			</h1>
			<p class="text-sm text-muted-foreground mt-0.5">Alertas y eventos del sistema</p>
		</div>
		<div class="flex items-center gap-2">
			<Button variant="outline" size="sm" class="gap-2 h-8 text-xs" onclick={markAllRead} disabled={unreadCount === 0}>
				<CheckCheck class="size-3.5" />
				Marcar todo como leído
			</Button>
			<Button variant="ghost" size="icon" class="size-8">
				<Settings class="size-4" />
			</Button>
		</div>
	</div>

	<!-- Filter tabs -->
	<div class="flex items-center gap-1 border-b border-border">
		{#each [['all', 'Todas'], ['unread', 'No leídas']] as [val, label]}
			<button
				onclick={() => filter = val}
				class="px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px
					{filter === val
					? 'border-primary text-foreground'
					: 'border-transparent text-muted-foreground hover:text-foreground'}"
			>
				{label}
				{#if val === 'unread' && unreadCount > 0}
					<span class="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-destructive text-white font-medium">{unreadCount}</span>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Notifications list -->
	<Card class="overflow-hidden">
		{#if displayed.length === 0}
			<CardContent class="py-16 flex flex-col items-center gap-3 text-muted-foreground">
				<BellOff class="size-10 opacity-30" />
				<p class="text-sm">No hay notificaciones {filter === 'unread' ? 'sin leer' : ''}</p>
			</CardContent>
		{:else}
			{#each displayed as notif, i}
				{@const Icon = typeIcon[notif.type]}
				{#if i > 0}
					<Separator />
				{/if}
				<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
				<div
					class="flex gap-4 px-5 py-4 transition-colors cursor-pointer group
						{notif.read ? 'bg-background' : 'bg-muted/30 hover:bg-muted/50'}"
					onclick={() => markRead(notif.id)}
				>
					<!-- Icon -->
					<div class="shrink-0 mt-0.5 size-8 rounded-full flex items-center justify-center {typeColor[notif.type]}">
						<Icon class="size-4" />
					</div>

					<!-- Content -->
					<div class="flex-1 min-w-0">
						<div class="flex items-start justify-between gap-2">
							<div class="flex items-center gap-2 flex-wrap">
								<p class="text-sm font-medium {notif.read ? 'text-muted-foreground' : 'text-foreground'}">{notif.title}</p>
								{#if !notif.read}
									<span class="size-1.5 rounded-full bg-primary shrink-0 mt-0.5"></span>
								{/if}
								<Badge variant={categoryColor[notif.category] || 'secondary'} class="text-[10px] h-4 px-1.5">{notif.category}</Badge>
							</div>
							<div class="flex items-center gap-1 shrink-0">
								<span class="text-[11px] text-muted-foreground whitespace-nowrap">{notif.time}</span>
								<button
									onclick={(e) => { e.stopPropagation(); dismiss(notif.id); }}
									class="opacity-0 group-hover:opacity-100 size-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
									aria-label="Descartar"
								>
									<X class="size-3" />
								</button>
							</div>
						</div>
						<p class="text-xs text-muted-foreground mt-0.5 leading-relaxed">{notif.desc}</p>
					</div>
				</div>
			{/each}
		{/if}
	</Card>
</div>
