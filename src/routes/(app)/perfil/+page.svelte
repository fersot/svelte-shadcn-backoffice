<script>
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import {
		User, Mail, Phone, Building, MapPin, Shield, KeyRound,
		Camera, Save, LogOut, Clock, Monitor, Smartphone, Globe
	} from '@lucide/svelte';

	let editMode = $state(false);

	let profile = $state({
		name: 'Admin User',
		email: 'admin@empresa.com',
		phone: '+54 11 4444-5555',
		company: 'Empresa SA',
		location: 'Buenos Aires, Argentina',
		role: 'Super Admin',
		avatar: 'AD',
		joinDate: 'Enero 2024'
	});

	let draft = $state({ ...profile });

	function save() { Object.assign(profile, draft); editMode = false; }
	function cancel() { draft = { ...profile }; editMode = false; }

	const sessions = [
		{ device: 'Chrome / Windows 11', ip: '192.168.1.10', location: 'Buenos Aires', last: 'Ahora', current: true, icon: Monitor },
		{ device: 'Safari / iPhone 15', ip: '181.45.12.33', location: 'Buenos Aires', last: 'Hace 2 h', current: false, icon: Smartphone },
		{ device: 'Firefox / Ubuntu', ip: '200.45.88.12', location: 'Córdoba', last: 'Hace 3 días', current: false, icon: Globe },
	];

	const activity = [
		{ action: 'Inició sesión', time: 'Hace 10 min', icon: LogOut },
		{ action: 'Editó usuario Carlos Mendoza', time: 'Hace 1 h', icon: User },
		{ action: 'Exportó reporte mensual', time: 'Hace 3 h', icon: Clock },
		{ action: 'Cambió contraseña', time: 'Hace 2 días', icon: KeyRound },
		{ action: 'Actualizó perfil', time: 'Hace 5 días', icon: User },
	];
</script>

<svelte:head>
	<title>Perfil — Backoffice</title>
</svelte:head>

<div class="space-y-6 max-w-4xl">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-xl font-semibold text-foreground">Mi Perfil</h1>
			<p class="text-sm text-muted-foreground mt-0.5">Información personal y configuración de cuenta</p>
		</div>
		{#if !editMode}
			<Button size="sm" class="h-8 text-xs gap-2" onclick={() => { draft = {...profile}; editMode = true; }}>
				<User class="size-3.5" />Editar perfil
			</Button>
		{/if}
	</div>

	<!-- Avatar card -->
	<Card>
		<CardContent class="pt-6">
			<div class="flex flex-col sm:flex-row gap-6 items-start">
				<div class="relative shrink-0">
					<Avatar class="size-20 text-2xl">
						<AvatarFallback class="bg-primary text-primary-foreground text-2xl font-bold">
							{profile.avatar}
						</AvatarFallback>
					</Avatar>
					<button class="absolute -bottom-1 -right-1 size-7 rounded-full bg-card border-2 border-border flex items-center justify-center hover:bg-muted transition-colors">
						<Camera class="size-3.5 text-muted-foreground" />
					</button>
				</div>
				<div class="flex-1 min-w-0">
					<div class="flex items-center gap-3 flex-wrap">
						<h2 class="text-lg font-semibold text-foreground">{profile.name}</h2>
						<Badge variant="default" class="text-xs">{profile.role}</Badge>
					</div>
					<p class="text-sm text-muted-foreground mt-0.5">{profile.email}</p>
					<div class="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
						<span class="flex items-center gap-1.5"><Building class="size-3.5" />{profile.company}</span>
						<span class="flex items-center gap-1.5"><MapPin class="size-3.5" />{profile.location}</span>
						<span class="flex items-center gap-1.5"><Clock class="size-3.5" />Desde {profile.joinDate}</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>

	<Tabs value="info">
		<TabsList class="h-9">
			<TabsTrigger value="info" class="text-xs">Información</TabsTrigger>
			<TabsTrigger value="security" class="text-xs">Seguridad</TabsTrigger>
			<TabsTrigger value="sessions" class="text-xs">Sesiones</TabsTrigger>
			<TabsTrigger value="activity" class="text-xs">Actividad</TabsTrigger>
		</TabsList>

		<!-- Info tab -->
		<TabsContent value="info" class="mt-4">
			<Card>
				<CardHeader class="pb-4">
					<CardTitle class="text-base">Datos personales</CardTitle>
					<CardDescription class="text-xs">Tu información de cuenta y contacto</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div class="space-y-1.5">
							<Label class="text-xs" for="p-name">Nombre completo</Label>
							{#if editMode}
								<Input id="p-name" bind:value={draft.name} class="h-8 text-sm" />
							{:else}
								<p class="text-sm text-foreground flex items-center gap-2 h-8"><User class="size-3.5 text-muted-foreground" />{profile.name}</p>
							{/if}
						</div>
						<div class="space-y-1.5">
							<Label class="text-xs" for="p-email">Email</Label>
							{#if editMode}
								<Input id="p-email" type="email" bind:value={draft.email} class="h-8 text-sm" />
							{:else}
								<p class="text-sm text-foreground flex items-center gap-2 h-8"><Mail class="size-3.5 text-muted-foreground" />{profile.email}</p>
							{/if}
						</div>
						<div class="space-y-1.5">
							<Label class="text-xs" for="p-phone">Teléfono</Label>
							{#if editMode}
								<Input id="p-phone" bind:value={draft.phone} class="h-8 text-sm" />
							{:else}
								<p class="text-sm text-foreground flex items-center gap-2 h-8"><Phone class="size-3.5 text-muted-foreground" />{profile.phone}</p>
							{/if}
						</div>
						<div class="space-y-1.5">
							<Label class="text-xs" for="p-company">Empresa</Label>
							{#if editMode}
								<Input id="p-company" bind:value={draft.company} class="h-8 text-sm" />
							{:else}
								<p class="text-sm text-foreground flex items-center gap-2 h-8"><Building class="size-3.5 text-muted-foreground" />{profile.company}</p>
							{/if}
						</div>
						<div class="space-y-1.5 sm:col-span-2">
							<Label class="text-xs" for="p-location">Ubicación</Label>
							{#if editMode}
								<Input id="p-location" bind:value={draft.location} class="h-8 text-sm" />
							{:else}
								<p class="text-sm text-foreground flex items-center gap-2 h-8"><MapPin class="size-3.5 text-muted-foreground" />{profile.location}</p>
							{/if}
						</div>
					</div>
					{#if editMode}
						<Separator />
						<div class="flex justify-end gap-2">
							<Button variant="outline" size="sm" class="h-8 text-xs" onclick={cancel}>Cancelar</Button>
							<Button size="sm" class="h-8 text-xs gap-1.5" onclick={save}><Save class="size-3.5" />Guardar</Button>
						</div>
					{/if}
				</CardContent>
			</Card>
		</TabsContent>

		<!-- Security tab -->
		<TabsContent value="security" class="mt-4">
			<Card>
				<CardHeader class="pb-4">
					<CardTitle class="text-base">Seguridad de la cuenta</CardTitle>
					<CardDescription class="text-xs">Contraseña y autenticación de dos factores</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-3">
						<h3 class="text-sm font-medium flex items-center gap-2"><KeyRound class="size-4 text-muted-foreground" />Cambiar contraseña</h3>
						<div class="grid grid-cols-1 gap-3 max-w-sm">
							<div class="space-y-1.5">
								<Label class="text-xs" for="cur-pass">Contraseña actual</Label>
								<Input id="cur-pass" type="password" placeholder="••••••••" class="h-8 text-sm" />
							</div>
							<div class="space-y-1.5">
								<Label class="text-xs" for="new-pass">Nueva contraseña</Label>
								<Input id="new-pass" type="password" placeholder="••••••••" class="h-8 text-sm" />
							</div>
							<div class="space-y-1.5">
								<Label class="text-xs" for="conf-pass">Confirmar contraseña</Label>
								<Input id="conf-pass" type="password" placeholder="••••••••" class="h-8 text-sm" />
							</div>
							<Button size="sm" class="h-8 text-xs w-fit">Actualizar contraseña</Button>
						</div>
					</div>
					<Separator />
					<div class="flex items-center justify-between">
						<div class="space-y-0.5">
							<p class="text-sm font-medium flex items-center gap-2"><Shield class="size-4 text-muted-foreground" />Autenticación de dos factores</p>
							<p class="text-xs text-muted-foreground">Agrega una capa extra de seguridad a tu cuenta</p>
						</div>
						<Badge variant="outline" class="text-xs">No activado</Badge>
					</div>
					<Button variant="outline" size="sm" class="h-8 text-xs">Activar 2FA</Button>
				</CardContent>
			</Card>
		</TabsContent>

		<!-- Sessions tab -->
		<TabsContent value="sessions" class="mt-4">
			<Card>
				<CardHeader class="pb-4">
					<CardTitle class="text-base">Sesiones activas</CardTitle>
					<CardDescription class="text-xs">Dispositivos donde tenés sesión iniciada</CardDescription>
				</CardHeader>
				<CardContent class="space-y-1 p-0">
					{#each sessions as s, i}
						{@const Icon = s.icon}
						{#if i > 0}<Separator />{/if}
						<div class="flex items-center gap-4 px-6 py-4">
							<div class="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
								<Icon class="size-4 text-muted-foreground" />
							</div>
							<div class="flex-1 min-w-0">
								<div class="flex items-center gap-2 flex-wrap">
									<p class="text-sm font-medium text-foreground">{s.device}</p>
									{#if s.current}<Badge variant="default" class="text-[10px] h-4 px-1.5">Actual</Badge>{/if}
								</div>
								<p class="text-xs text-muted-foreground mt-0.5">{s.location} · {s.ip} · {s.last}</p>
							</div>
							{#if !s.current}
								<Button variant="ghost" size="sm" class="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10">Cerrar</Button>
							{/if}
						</div>
					{/each}
					<Separator />
					<div class="px-6 py-4">
						<Button variant="outline" size="sm" class="h-8 text-xs text-destructive border-destructive/30 hover:bg-destructive/10">Cerrar todas las otras sesiones</Button>
					</div>
				</CardContent>
			</Card>
		</TabsContent>

		<!-- Activity tab -->
		<TabsContent value="activity" class="mt-4">
			<Card>
				<CardHeader class="pb-4">
					<CardTitle class="text-base">Actividad reciente</CardTitle>
					<CardDescription class="text-xs">Últimas acciones realizadas en tu cuenta</CardDescription>
				</CardHeader>
				<CardContent class="space-y-1 p-0">
					{#each activity as a, i}
						{@const Icon = a.icon}
						{#if i > 0}<Separator />{/if}
						<div class="flex items-center gap-4 px-6 py-3.5">
							<div class="size-7 rounded-full bg-muted flex items-center justify-center shrink-0">
								<Icon class="size-3.5 text-muted-foreground" />
							</div>
							<p class="text-sm text-foreground flex-1">{a.action}</p>
							<span class="text-xs text-muted-foreground shrink-0">{a.time}</span>
						</div>
					{/each}
				</CardContent>
			</Card>
		</TabsContent>
	</Tabs>
</div>
