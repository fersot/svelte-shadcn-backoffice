<script>
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		Table, TableBody, TableCell, TableHead, TableHeader, TableRow
	} from '$lib/components/ui/table';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Users, TrendingUp, TrendingDown, DollarSign, Activity,
		ArrowUpRight, MoreHorizontal, Calendar, Filter
	} from '@lucide/svelte';

	// ── Date range state ─────────────────────────────────────────────────────
	let dateFrom = $state('2025-01-01');
	let dateTo   = $state(new Date().toISOString().slice(0, 10));

	// Presets
	function applyPreset(days) {
		const to   = new Date();
		const from = new Date();
		from.setDate(from.getDate() - days);
		dateTo   = to.toISOString().slice(0, 10);
		dateFrom = from.toISOString().slice(0, 10);
	}

	const presets = [
		{ label: 'Hoy',      days: 0 },
		{ label: '7 días',   days: 7 },
		{ label: '30 días',  days: 30 },
		{ label: '90 días',  days: 90 },
	];

	// ── KPIs ────────────────────────────────────────────────────────────────
	const kpis = [
		{ title: 'Ingresos totales',  value: '$148,392', change: '+12.5%', trend: 'up',   sub: 'vs. período anterior', icon: DollarSign },
		{ title: 'Usuarios activos',  value: '3,842',    change: '+8.2%',  trend: 'up',   sub: 'Últimos 30 días',       icon: Users },
		{ title: 'Tasa de conversión',value: '3.6%',     change: '-0.4%',  trend: 'down', sub: 'vs. período anterior',  icon: Activity },
		{ title: 'Ticket promedio',   value: '$38.60',   change: '+4.1%',  trend: 'up',   sub: 'Por transacción',       icon: TrendingUp }
	];

	const sparkData = [40, 65, 48, 80, 55, 90, 72, 85, 60, 95, 78, 100];

	// ── Recent activity ──────────────────────────────────────────────────────
	const recentActivity = [
		{ id: '#00291', user: 'Carlos Mendoza',   action: 'Nuevo registro',         status: 'Activo',    amount: '$240.00', date: 'Hace 5 min' },
		{ id: '#00290', user: 'Laura Gómez',      action: 'Pago procesado',          status: 'Completado',amount: '$89.50',  date: 'Hace 18 min' },
		{ id: '#00289', user: 'Martín Ruiz',      action: 'Solicitud de baja',       status: 'Pendiente', amount: '-',       date: 'Hace 34 min' },
		{ id: '#00288', user: 'Ana Torres',       action: 'Pago procesado',          status: 'Completado',amount: '$512.00', date: 'Hace 1 h' },
		{ id: '#00287', user: 'Diego Fernández',  action: 'Actualización de perfil', status: 'Activo',    amount: '-',       date: 'Hace 2 h' },
		{ id: '#00286', user: 'Sofía Blanco',     action: 'Pago fallido',            status: 'Error',     amount: '$73.00',  date: 'Hace 3 h' },
		{ id: '#00285', user: 'Pablo Quiroga',    action: 'Nuevo registro',          status: 'Activo',    amount: '$195.00', date: 'Hace 4 h' }
	];

	const statusVariant = {
		Activo: 'secondary', Completado: 'default', Pendiente: 'outline', Error: 'destructive'
	};

	// Format display label
	let rangeLabel = $derived(
		dateFrom && dateTo
			? `${dateFrom} → ${dateTo}`
			: 'Seleccionar período'
	);
</script>

<svelte:head>
	<title>Dashboard — Backoffice</title>
	<meta name="description" content="Panel de control principal del backoffice" />
</svelte:head>

<div class="space-y-6">
	<!-- Header + DateRangePicker -->
	<div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
		<div>
			<h1 class="text-xl font-semibold text-foreground">Dashboard</h1>
			<p class="text-sm text-muted-foreground mt-0.5">Resumen general del sistema</p>
		</div>

		<!-- Date Range Picker -->
		<div class="flex flex-wrap items-center gap-2">
			<!-- Preset buttons -->
			<div class="flex items-center gap-1 border border-border rounded-md p-1 bg-muted/40">
				{#each presets as p}
					<button
						onclick={() => applyPreset(p.days)}
						class="px-2.5 py-1 text-xs rounded font-medium transition-colors hover:bg-background hover:text-foreground text-muted-foreground"
					>
						{p.label}
					</button>
				{/each}
			</div>

			<!-- Date inputs -->
			<div class="flex items-center gap-1.5 border border-border rounded-md px-3 py-1.5 bg-background text-sm">
				<Calendar class="size-3.5 text-muted-foreground shrink-0" />
				<input
					type="date"
					bind:value={dateFrom}
					class="bg-transparent border-none outline-none text-xs text-foreground w-28"
					max={dateTo}
				/>
				<span class="text-muted-foreground text-xs">→</span>
				<input
					type="date"
					bind:value={dateTo}
					class="bg-transparent border-none outline-none text-xs text-foreground w-28"
					min={dateFrom}
				/>
			</div>

			<Button size="sm" class="gap-2 h-8 text-xs">
				<ArrowUpRight class="size-3.5" />
				Exportar
			</Button>
		</div>
	</div>

	<!-- KPI Cards -->
	<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
		{#each kpis as kpi}
			<Card class="relative overflow-hidden">
				<CardHeader class="pb-2 flex flex-row items-start justify-between space-y-0">
					<CardTitle class="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
					<div class="size-8 rounded-md bg-muted flex items-center justify-center shrink-0">
						<kpi.icon class="size-4 text-muted-foreground" />
					</div>
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold text-foreground">{kpi.value}</div>
					<div class="flex items-center gap-1.5 mt-1">
						{#if kpi.trend === 'up'}
							<TrendingUp class="size-3 text-emerald-500" />
							<span class="text-xs text-emerald-500 font-medium">{kpi.change}</span>
						{:else}
							<TrendingDown class="size-3 text-destructive" />
							<span class="text-xs text-destructive font-medium">{kpi.change}</span>
						{/if}
						<span class="text-xs text-muted-foreground">{kpi.sub}</span>
					</div>
					<!-- Mini sparkline -->
					<div class="flex items-end gap-0.5 h-8 mt-3">
						{#each sparkData as bar, i}
							<div
								class="flex-1 rounded-sm"
								class:bg-primary={kpi.trend === 'up'}
								class:bg-destructive={kpi.trend === 'down'}
								style="height: {bar}%; opacity: {0.3 + (i / sparkData.length) * 0.7}"
							></div>
						{/each}
					</div>
				</CardContent>
			</Card>
		{/each}
	</div>

	<!-- Activity Table -->
	<Card>
		<CardHeader class="flex flex-row items-center justify-between pb-3">
			<div>
				<CardTitle class="text-base">Actividad reciente</CardTitle>
				<CardDescription class="text-xs mt-0.5">
					Período: {dateFrom} → {dateTo}
				</CardDescription>
			</div>
			<Button variant="ghost" size="sm" class="text-xs gap-1.5">
				Ver todo
				<ArrowUpRight class="size-3" />
			</Button>
		</CardHeader>
		<CardContent class="p-0">
			<div class="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow class="hover:bg-transparent border-border">
							<TableHead class="text-xs font-medium">ID</TableHead>
							<TableHead class="text-xs font-medium">Usuario</TableHead>
							<TableHead class="text-xs font-medium hidden sm:table-cell">Acción</TableHead>
							<TableHead class="text-xs font-medium">Estado</TableHead>
							<TableHead class="text-xs font-medium text-right hidden md:table-cell">Importe</TableHead>
							<TableHead class="text-xs font-medium text-right hidden lg:table-cell">Fecha</TableHead>
							<TableHead class="w-10"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{#each recentActivity as row}
							<TableRow class="border-border text-sm">
								<TableCell class="font-mono text-xs text-muted-foreground">{row.id}</TableCell>
								<TableCell class="font-medium">{row.user}</TableCell>
								<TableCell class="text-muted-foreground hidden sm:table-cell">{row.action}</TableCell>
								<TableCell>
									<Badge variant={statusVariant[row.status] || 'secondary'} class="text-[11px] h-5 px-2">
										{row.status}
									</Badge>
								</TableCell>
								<TableCell class="text-right font-mono text-xs hidden md:table-cell">{row.amount}</TableCell>
								<TableCell class="text-right text-xs text-muted-foreground hidden lg:table-cell">{row.date}</TableCell>
								<TableCell>
									<Button variant="ghost" size="icon" class="size-7">
										<MoreHorizontal class="size-3.5" />
									</Button>
								</TableCell>
							</TableRow>
						{/each}
					</TableBody>
				</Table>
			</div>
		</CardContent>
	</Card>
</div>
