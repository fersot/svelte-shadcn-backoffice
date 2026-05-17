<script>
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '$lib/components/ui/dropdown-menu';
	import { ShieldCheck, Plus, Search, MoreHorizontal, Users, Lock, Pencil, Check, X } from '@lucide/svelte';

	const roles = $state([
		{ id: 1, name: 'Super Admin', description: 'Acceso completo al sistema', users: 2, permissions: { dashboard: true, usuarios: true, roles: true, facturacion: true, reportes: true, configuracion: true } },
		{ id: 2, name: 'Administrador', description: 'Gestión general sin configuración crítica', users: 5, permissions: { dashboard: true, usuarios: true, roles: false, facturacion: true, reportes: true, configuracion: false } },
		{ id: 3, name: 'Operador', description: 'Gestión de usuarios y reportes', users: 14, permissions: { dashboard: true, usuarios: true, roles: false, facturacion: false, reportes: true, configuracion: false } },
		{ id: 4, name: 'Analista', description: 'Solo lectura de reportes y dashboard', users: 8, permissions: { dashboard: true, usuarios: false, roles: false, facturacion: false, reportes: true, configuracion: false } },
		{ id: 5, name: 'Soporte', description: 'Atención al cliente y consultas', users: 11, permissions: { dashboard: true, usuarios: true, roles: false, facturacion: false, reportes: false, configuracion: false } }
	]);

	const modules = [
		{ key: 'dashboard', label: 'Dashboard' }, { key: 'usuarios', label: 'Usuarios' },
		{ key: 'roles', label: 'Roles' }, { key: 'facturacion', label: 'Facturación' },
		{ key: 'reportes', label: 'Reportes' }, { key: 'configuracion', label: 'Configuración' }
	];

	let search = $state('');
	let selectedRole = $state(null);
	let filtered = $derived(roles.filter(r => r.name.toLowerCase().includes(search.toLowerCase())));

	function togglePermission(roleId, key) {
		const role = roles.find(r => r.id === roleId);
		if (role) role.permissions[key] = !role.permissions[key];
	}
</script>

<svelte:head><title>Roles y Permisos — Backoffice</title></svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-xl font-semibold text-foreground">Roles y Permisos</h1>
			<p class="text-sm text-muted-foreground mt-0.5">Gestión de roles y permisos por módulo</p>
		</div>
		<Button size="sm" class="gap-2 h-8 text-xs"><Plus class="size-3.5" />Nuevo rol</Button>
	</div>

	<div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
		<div class="xl:col-span-1 space-y-3">
			<div class="relative">
				<Search class="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
				<Input placeholder="Buscar rol…" class="pl-9 h-8 text-sm" bind:value={search} />
			</div>
			<div class="space-y-2">
				{#each filtered as role}
					<button onclick={() => selectedRole = selectedRole?.id === role.id ? null : role}
						class="w-full text-left rounded-lg border px-4 py-3 transition-colors {selectedRole?.id === role.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-muted/50'}">
						<div class="flex items-center justify-between gap-2">
							<div class="flex items-center gap-2.5 min-w-0">
								<div class="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
									<ShieldCheck class="size-4 text-muted-foreground" />
								</div>
								<div class="min-w-0">
									<p class="text-sm font-medium text-foreground truncate">{role.name}</p>
									<p class="text-xs text-muted-foreground truncate">{role.description}</p>
								</div>
							</div>
							<div class="flex items-center gap-1 shrink-0">
								<Users class="size-3 text-muted-foreground" /><span class="text-xs text-muted-foreground">{role.users}</span>
							</div>
						</div>
					</button>
				{/each}
			</div>
		</div>

		<div class="xl:col-span-2">
			{#if selectedRole}
				<Card>
					<CardHeader class="pb-3">
						<div class="flex items-center justify-between">
							<div>
								<CardTitle class="text-base">{selectedRole.name}</CardTitle>
								<CardDescription class="text-xs mt-0.5">{selectedRole.description}</CardDescription>
							</div>
							<Button variant="outline" size="sm" class="h-8 text-xs gap-1.5"><Pencil class="size-3.5" />Editar</Button>
						</div>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow class="hover:bg-transparent border-border">
									<TableHead class="text-xs font-medium">Módulo</TableHead>
									<TableHead class="text-xs font-medium text-center">Acceso</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{#each modules as mod}
									{@const has = selectedRole.permissions[mod.key]}
									<TableRow class="border-border">
										<TableCell class="text-sm font-medium">{mod.label}</TableCell>
										<TableCell class="text-center">
											<button onclick={() => togglePermission(selectedRole.id, mod.key)}
												class="inline-flex items-center justify-center size-6 rounded-full transition-colors {has ? 'bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25' : 'bg-muted text-muted-foreground hover:bg-muted/80'}">
												{#if has}<Check class="size-3.5" />{:else}<X class="size-3.5" />{/if}
											</button>
										</TableCell>
									</TableRow>
								{/each}
							</TableBody>
						</Table>
						<div class="mt-4 pt-4 border-t border-border flex justify-end gap-2">
							<Button variant="outline" size="sm" class="h-8 text-xs" onclick={() => selectedRole = null}>Cancelar</Button>
							<Button size="sm" class="h-8 text-xs">Guardar cambios</Button>
						</div>
					</CardContent>
				</Card>
			{:else}
				<div class="h-full min-h-[300px] rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 text-muted-foreground">
					<Lock class="size-10 opacity-25" />
					<p class="text-sm">Seleccioná un rol para ver y editar sus permisos</p>
				</div>
			{/if}
		</div>
	</div>
</div>
