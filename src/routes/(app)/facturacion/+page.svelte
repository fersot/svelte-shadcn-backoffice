<script>
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '$lib/components/ui/dropdown-menu';
	import { CreditCard, Search, Download, MoreHorizontal, TrendingUp, DollarSign, Clock, AlertCircle, Calendar } from '@lucide/svelte';

	let search = $state('');
	let dateFrom = $state('2025-01-01');
	let dateTo = $state(new Date().toISOString().slice(0, 10));

	const invoices = [
		{ id: 'INV-0098', client: 'TechCorp SA', plan: 'Enterprise', amount: '$4,200.00', status: 'Pagado', date: '2025-05-01', due: '2025-05-31' },
		{ id: 'INV-0097', client: 'DataSoft SRL', plan: 'Pro', amount: '$890.00', status: 'Pagado', date: '2025-05-01', due: '2025-05-31' },
		{ id: 'INV-0096', client: 'Nexo Digital', plan: 'Basic', amount: '$199.00', status: 'Pendiente', date: '2025-04-28', due: '2025-05-28' },
		{ id: 'INV-0095', client: 'Global Media', plan: 'Pro', amount: '$890.00', status: 'Vencido', date: '2025-04-01', due: '2025-04-30' },
		{ id: 'INV-0094', client: 'InnovateLab', plan: 'Enterprise', amount: '$4,200.00', status: 'Pagado', date: '2025-04-01', due: '2025-04-30' },
		{ id: 'INV-0093', client: 'CloudBase', plan: 'Basic', amount: '$199.00', status: 'Cancelado', date: '2025-03-15', due: '2025-04-14' },
		{ id: 'INV-0092', client: 'AlphaRed', plan: 'Pro', amount: '$890.00', status: 'Pagado', date: '2025-03-01', due: '2025-03-31' },
		{ id: 'INV-0091', client: 'Quantum AI', plan: 'Enterprise', amount: '$4,200.00', status: 'Pendiente', date: '2025-03-01', due: '2025-03-31' },
	];

	const statusVariant = { Pagado: 'default', Pendiente: 'outline', Vencido: 'destructive', Cancelado: 'secondary' };

	let filtered = $derived(
		invoices.filter(inv =>
			inv.id.toLowerCase().includes(search.toLowerCase()) ||
			inv.client.toLowerCase().includes(search.toLowerCase())
		)
	);

	const kpis = [
		{ title: 'Ingresos del mes', value: '$5,289.00', sub: 'Mayo 2025', icon: DollarSign, trend: 'up' },
		{ title: 'Facturas pendientes', value: '3', sub: '$5,289.00 en riesgo', icon: Clock, trend: 'warn' },
		{ title: 'Vencidas', value: '1', sub: '$890.00 por cobrar', icon: AlertCircle, trend: 'down' },
		{ title: 'MRR', value: '$12,778.00', sub: '+6.2% vs. mes anterior', icon: TrendingUp, trend: 'up' },
	];
</script>

<svelte:head><title>Facturación — Backoffice</title></svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-xl font-semibold text-foreground">Facturación</h1>
			<p class="text-sm text-muted-foreground mt-0.5">Historial de facturas y métricas de ingresos</p>
		</div>
		<Button size="sm" class="gap-2 h-8 text-xs"><Download class="size-3.5" />Exportar CSV</Button>
	</div>

	<!-- KPIs -->
	<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
		{#each kpis as k}
			<Card>
				<CardHeader class="pb-2 flex flex-row items-start justify-between space-y-0">
					<CardTitle class="text-sm font-medium text-muted-foreground">{k.title}</CardTitle>
					<div class="size-8 rounded-md bg-muted flex items-center justify-center shrink-0">
						<k.icon class="size-4 text-muted-foreground" />
					</div>
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold text-foreground">{k.value}</div>
					<p class="text-xs text-muted-foreground mt-1">{k.sub}</p>
				</CardContent>
			</Card>
		{/each}
	</div>

	<!-- Filters + Table -->
	<Card>
		<CardHeader class="pb-3">
			<div class="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
				<div>
					<CardTitle class="text-base">Facturas</CardTitle>
					<CardDescription class="text-xs mt-0.5">{filtered.length} registros encontrados</CardDescription>
				</div>
				<div class="flex flex-wrap items-center gap-2">
					<div class="flex items-center gap-1.5 border border-border rounded-md px-3 py-1.5 bg-background">
						<Calendar class="size-3.5 text-muted-foreground shrink-0" />
						<input type="date" bind:value={dateFrom} class="bg-transparent border-none outline-none text-xs text-foreground w-28" max={dateTo} />
						<span class="text-muted-foreground text-xs">→</span>
						<input type="date" bind:value={dateTo} class="bg-transparent border-none outline-none text-xs text-foreground w-28" min={dateFrom} />
					</div>
					<div class="relative">
						<Search class="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
						<Input placeholder="Buscar factura…" class="pl-9 h-8 text-sm w-48" bind:value={search} />
					</div>
				</div>
			</div>
		</CardHeader>
		<CardContent class="p-0">
			<div class="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow class="hover:bg-transparent border-border">
							<TableHead class="text-xs font-medium">ID</TableHead>
							<TableHead class="text-xs font-medium">Cliente</TableHead>
							<TableHead class="text-xs font-medium hidden sm:table-cell">Plan</TableHead>
							<TableHead class="text-xs font-medium text-right">Importe</TableHead>
							<TableHead class="text-xs font-medium">Estado</TableHead>
							<TableHead class="text-xs font-medium hidden md:table-cell">Vencimiento</TableHead>
							<TableHead class="w-10"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{#each filtered as inv}
							<TableRow class="border-border text-sm">
								<TableCell class="font-mono text-xs text-muted-foreground">{inv.id}</TableCell>
								<TableCell class="font-medium">{inv.client}</TableCell>
								<TableCell class="text-muted-foreground hidden sm:table-cell">{inv.plan}</TableCell>
								<TableCell class="text-right font-mono text-xs font-medium">{inv.amount}</TableCell>
								<TableCell><Badge variant={statusVariant[inv.status] || 'secondary'} class="text-[11px] h-5 px-2">{inv.status}</Badge></TableCell>
								<TableCell class="text-xs text-muted-foreground hidden md:table-cell">{inv.due}</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger class="inline-flex items-center justify-center size-7 rounded-md hover:bg-accent transition-colors">
											<MoreHorizontal class="size-3.5" />
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" class="w-36">
											<DropdownMenuItem><Download class="mr-2 size-3.5" />Descargar PDF</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem class="text-destructive focus:text-destructive">Anular</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						{/each}
					</TableBody>
				</Table>
			</div>
		</CardContent>
	</Card>
</div>
