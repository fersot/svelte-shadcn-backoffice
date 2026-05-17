<script>
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { Search, Plus, MoreHorizontal, UserCheck, UserX, Pencil, Trash2, ChevronLeft, ChevronRight } from '@lucide/svelte';

	let search = $state('');
	let currentPage = $state(1);
	const pageSize = 8;

	const allUsers = [
		{ id: 1, name: 'Carlos Mendoza', email: 'carlos@empresa.com', role: 'Admin', status: 'Activo', created: '2024-01-15' },
		{ id: 2, name: 'Laura Gómez', email: 'laura@empresa.com', role: 'Editor', status: 'Activo', created: '2024-02-03' },
		{ id: 3, name: 'Martín Ruiz', email: 'martin@empresa.com', role: 'Viewer', status: 'Inactivo', created: '2024-02-18' },
		{ id: 4, name: 'Ana Torres', email: 'ana@empresa.com', role: 'Editor', status: 'Activo', created: '2024-03-05' },
		{ id: 5, name: 'Diego Fernández', email: 'diego@empresa.com', role: 'Viewer', status: 'Activo', created: '2024-03-22' },
		{ id: 6, name: 'Sofía Blanco', email: 'sofia@empresa.com', role: 'Editor', status: 'Suspendido', created: '2024-04-10' },
		{ id: 7, name: 'Pablo Quiroga', email: 'pablo@empresa.com', role: 'Admin', status: 'Activo', created: '2024-04-28' },
		{ id: 8, name: 'Valentina Cruz', email: 'valentina@empresa.com', role: 'Viewer', status: 'Activo', created: '2024-05-14' },
		{ id: 9, name: 'Roberto Silva', email: 'roberto@empresa.com', role: 'Editor', status: 'Inactivo', created: '2024-05-30' },
		{ id: 10, name: 'Camila López', email: 'camila@empresa.com', role: 'Viewer', status: 'Activo', created: '2024-06-15' },
		{ id: 11, name: 'Javier Morales', email: 'javier@empresa.com', role: 'Editor', status: 'Activo', created: '2024-07-01' },
		{ id: 12, name: 'Florencia Pérez', email: 'florencia@empresa.com', role: 'Admin', status: 'Activo', created: '2024-07-19' }
	];

	let filtered = $derived(
		allUsers.filter(
			(u) =>
				u.name.toLowerCase().includes(search.toLowerCase()) ||
				u.email.toLowerCase().includes(search.toLowerCase()) ||
				u.role.toLowerCase().includes(search.toLowerCase())
		)
	);

	let totalPages = $derived(Math.ceil(filtered.length / pageSize));
	let paginated = $derived(filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize));

	function onSearch() {
		currentPage = 1;
	}

	const statusVariant = {
		Activo: 'default',
		Inactivo: 'secondary',
		Suspendido: 'destructive'
	};

	const roleColors = {
		Admin: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
		Editor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
		Viewer: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
	};
</script>

<svelte:head>
	<title>Usuarios — Backoffice</title>
	<meta name="description" content="Gestión de usuarios del sistema" />
</svelte:head>

<div class="space-y-5">
	<!-- Header -->
	<div class="flex items-center justify-between gap-4">
		<div>
			<h1 class="text-xl font-semibold text-foreground">Usuarios</h1>
			<p class="text-sm text-muted-foreground mt-0.5">{allUsers.length} usuarios registrados</p>
		</div>
		<Button size="sm" class="gap-2 shrink-0">
			<Plus class="size-3.5" />
			Nuevo usuario
		</Button>
	</div>

	<!-- Filters + Table -->
	<Card>
		<CardHeader class="pb-3 flex flex-row items-center gap-3">
			<div class="relative flex-1 max-w-sm">
				<Search class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
				<Input
					id="user-search"
					placeholder="Buscar por nombre, email o rol..."
					class="pl-8 h-8 text-sm"
					bind:value={search}
					oninput={onSearch}
				/>
			</div>
			<p class="text-xs text-muted-foreground ml-auto hidden sm:block">
				{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
			</p>
		</CardHeader>
		<CardContent class="p-0">
			<div class="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow class="hover:bg-transparent border-border">
							<TableHead class="text-xs font-medium">Nombre</TableHead>
							<TableHead class="text-xs font-medium hidden sm:table-cell">Email</TableHead>
							<TableHead class="text-xs font-medium hidden md:table-cell">Rol</TableHead>
							<TableHead class="text-xs font-medium">Estado</TableHead>
							<TableHead class="text-xs font-medium text-right hidden lg:table-cell">Creado</TableHead>
							<TableHead class="w-10"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{#each paginated as user (user.id)}
							<TableRow class="border-border text-sm">
								<TableCell>
									<div class="flex items-center gap-2.5">
										<div class="size-7 rounded-full bg-muted flex items-center justify-center shrink-0">
											<span class="text-[11px] font-medium text-muted-foreground">
												{user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
											</span>
										</div>
										<span class="font-medium">{user.name}</span>
									</div>
								</TableCell>
								<TableCell class="text-muted-foreground hidden sm:table-cell">{user.email}</TableCell>
								<TableCell class="hidden md:table-cell">
									<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium {roleColors[user.role]}">
										{user.role}
									</span>
								</TableCell>
								<TableCell>
									<Badge variant={statusVariant[user.status] || 'secondary'} class="text-[11px] h-5 px-2">
										{user.status}
									</Badge>
								</TableCell>
								<TableCell class="text-right text-xs text-muted-foreground hidden lg:table-cell font-mono">
									{user.created}
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger
											class="inline-flex items-center justify-center size-7 rounded-md hover:bg-accent transition-colors"
										>
											<MoreHorizontal class="size-3.5" />
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" class="w-40">
											<DropdownMenuItem>
												<Pencil class="mr-2 size-3.5" />
												Editar
											</DropdownMenuItem>
											{#if user.status === 'Activo'}
												<DropdownMenuItem>
													<UserX class="mr-2 size-3.5" />
													Suspender
												</DropdownMenuItem>
											{:else}
												<DropdownMenuItem>
													<UserCheck class="mr-2 size-3.5" />
													Activar
												</DropdownMenuItem>
											{/if}
											<DropdownMenuSeparator />
											<DropdownMenuItem class="text-destructive focus:text-destructive">
												<Trash2 class="mr-2 size-3.5" />
												Eliminar
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						{/each}

						{#if paginated.length === 0}
							<TableRow>
								<TableCell colspan={6} class="text-center text-sm text-muted-foreground py-12">
									No se encontraron usuarios
								</TableCell>
							</TableRow>
						{/if}
					</TableBody>
				</Table>
			</div>

			<!-- Pagination -->
			{#if totalPages > 1}
				<div class="flex items-center justify-between px-4 py-3 border-t border-border">
					<p class="text-xs text-muted-foreground">
						Página {currentPage} de {totalPages}
					</p>
					<div class="flex items-center gap-1">
						<Button
							variant="outline"
							size="icon"
							class="size-7"
							disabled={currentPage === 1}
							onclick={() => (currentPage -= 1)}
						>
							<ChevronLeft class="size-3.5" />
						</Button>
						{#each Array.from({ length: totalPages }, (_, i) => i + 1) as p}
							<Button
								variant={p === currentPage ? 'default' : 'outline'}
								size="icon"
								class="size-7 text-xs"
								onclick={() => (currentPage = p)}
							>
								{p}
							</Button>
						{/each}
						<Button
							variant="outline"
							size="icon"
							class="size-7"
							disabled={currentPage === totalPages}
							onclick={() => (currentPage += 1)}
						>
							<ChevronRight class="size-3.5" />
						</Button>
					</div>
				</div>
			{/if}
		</CardContent>
	</Card>
</div>
