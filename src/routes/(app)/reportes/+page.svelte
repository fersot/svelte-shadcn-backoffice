<script>
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { FileBarChart2, Download, Filter, TrendingUp } from '@lucide/svelte';

	const reports = [
		{ name: 'Ingresos mensuales', desc: 'Detalle de ingresos por mes y categoría', updated: 'Hoy', size: '2.4 MB', status: 'Listo' },
		{ name: 'Usuarios nuevos', desc: 'Alta de usuarios por período y fuente', updated: 'Ayer', size: '1.1 MB', status: 'Listo' },
		{ name: 'Tasa de retención', desc: 'Análisis de churn y retención', updated: 'Hace 3 días', size: '980 KB', status: 'Listo' },
		{ name: 'Rendimiento de campañas', desc: 'KPIs de marketing por canal', updated: 'Generando...', size: '-', status: 'Procesando' },
		{ name: 'Auditoría de accesos', desc: 'Log de inicios de sesión y actividad', updated: 'Hace 1 semana', size: '5.8 MB', status: 'Listo' }
	];
</script>

<svelte:head>
	<title>Reportes — Backoffice</title>
</svelte:head>

<div class="space-y-5">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-xl font-semibold text-foreground">Reportes</h1>
			<p class="text-sm text-muted-foreground mt-0.5">Descargá y analizá reportes del sistema</p>
		</div>
		<Button variant="outline" size="sm" class="gap-2">
			<Filter class="size-3.5" />
			Filtrar
		</Button>
	</div>

	<div class="grid grid-cols-1 gap-3">
		{#each reports as report}
			<Card class="transition-colors hover:bg-accent/30">
				<CardContent class="flex items-center gap-4 py-4 px-5">
					<div class="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
						{#if report.status === 'Procesando'}
							<TrendingUp class="size-4 text-muted-foreground animate-pulse" />
						{:else}
							<FileBarChart2 class="size-4 text-muted-foreground" />
						{/if}
					</div>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium text-foreground truncate">{report.name}</p>
						<p class="text-xs text-muted-foreground truncate">{report.desc}</p>
					</div>
					<div class="hidden sm:flex items-center gap-6 text-xs text-muted-foreground shrink-0">
						<span>{report.updated}</span>
						<span class="hidden md:block font-mono">{report.size}</span>
					</div>
					<Badge
						variant={report.status === 'Procesando' ? 'outline' : 'secondary'}
						class="text-[11px] h-5 px-2 shrink-0 hidden sm:inline-flex"
					>
						{report.status}
					</Badge>
					<Button
						variant="ghost"
						size="icon"
						class="size-8 shrink-0"
						disabled={report.status === 'Procesando'}
						aria-label="Descargar {report.name}"
					>
						<Download class="size-3.5" />
					</Button>
				</CardContent>
			</Card>
		{/each}
	</div>
</div>
