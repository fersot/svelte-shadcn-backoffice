<script>
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Switch } from '$lib/components/ui/switch';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { Save, Shield, Bell, Globe, Database, KeyRound } from '@lucide/svelte';

	let saved = $state(false);

	// General
	let appName = $state('Backoffice Pro');
	let appUrl = $state('https://backoffice.empresa.com');
	let timezone = $state('America/Argentina/Buenos_Aires');

	// Notificaciones
	let emailAlerts = $state(true);
	let systemAlerts = $state(true);
	let weeklyReport = $state(false);

	// Seguridad
	let twoFactor = $state(false);
	let sessionTimeout = $state('60');
	let ipWhitelist = $state('');

	async function handleSave() {
		// Simulación de guardado
		saved = true;
		setTimeout(() => (saved = false), 2000);
	}
</script>

<svelte:head>
	<title>Configuración — Backoffice</title>
	<meta name="description" content="Configuración general del sistema backoffice" />
</svelte:head>

<div class="space-y-5 max-w-3xl">
	<!-- Header -->
	<div class="flex items-center justify-between gap-4">
		<div>
			<h1 class="text-xl font-semibold text-foreground">Configuración</h1>
			<p class="text-sm text-muted-foreground mt-0.5">Administrá las preferencias del sistema</p>
		</div>
		<Button size="sm" class="gap-2" onclick={handleSave}>
			<Save class="size-3.5" />
			{saved ? 'Guardado' : 'Guardar cambios'}
		</Button>
	</div>

	<Tabs value="general">
		<TabsList class="h-9">
			<TabsTrigger value="general" class="text-xs gap-1.5">
				<Globe class="size-3.5" />
				General
			</TabsTrigger>
			<TabsTrigger value="notificaciones" class="text-xs gap-1.5">
				<Bell class="size-3.5" />
				Notificaciones
			</TabsTrigger>
			<TabsTrigger value="seguridad" class="text-xs gap-1.5">
				<Shield class="size-3.5" />
				Seguridad
			</TabsTrigger>
			<TabsTrigger value="datos" class="text-xs gap-1.5">
				<Database class="size-3.5" />
				Datos
			</TabsTrigger>
		</TabsList>

		<!-- General -->
		<TabsContent value="general" class="mt-4">
			<Card>
				<CardHeader class="pb-4">
					<CardTitle class="text-base">Configuración general</CardTitle>
					<CardDescription class="text-xs">Información básica de la aplicación</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div class="space-y-1.5">
							<Label for="app-name" class="text-xs font-medium">Nombre de la aplicación</Label>
							<Input id="app-name" bind:value={appName} class="h-8 text-sm" />
						</div>
						<div class="space-y-1.5">
							<Label for="app-url" class="text-xs font-medium">URL de la aplicación</Label>
							<Input id="app-url" bind:value={appUrl} class="h-8 text-sm" />
						</div>
					</div>
					<div class="space-y-1.5">
						<Label for="timezone" class="text-xs font-medium">Zona horaria</Label>
						<Input id="timezone" bind:value={timezone} class="h-8 text-sm" />
						<p class="text-[11px] text-muted-foreground">Se usa para reportes y logs del sistema</p>
					</div>

					<Separator />

					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium">Modo mantenimiento</p>
							<p class="text-xs text-muted-foreground">Muestra una página de mantenimiento a los usuarios</p>
						</div>
						<Switch id="maintenance-mode" />
					</div>
				</CardContent>
			</Card>
		</TabsContent>

		<!-- Notificaciones -->
		<TabsContent value="notificaciones" class="mt-4">
			<Card>
				<CardHeader class="pb-4">
					<CardTitle class="text-base">Notificaciones</CardTitle>
					<CardDescription class="text-xs">Configurá qué alertas querés recibir</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					{#each [
						{ id: 'email-alerts', label: 'Alertas por email', desc: 'Recibir notificaciones críticas por correo', value: emailAlerts, set: (v) => emailAlerts = v },
						{ id: 'system-alerts', label: 'Alertas del sistema', desc: 'Errores y eventos importantes en tiempo real', value: systemAlerts, set: (v) => systemAlerts = v },
						{ id: 'weekly-report', label: 'Reporte semanal', desc: 'Resumen semanal de actividad y estadísticas', value: weeklyReport, set: (v) => weeklyReport = v }
					] as item, i}
						{#if i > 0}
							<Separator />
						{/if}
						<div class="flex items-center justify-between gap-4">
							<div>
								<p class="text-sm font-medium">{item.label}</p>
								<p class="text-xs text-muted-foreground">{item.desc}</p>
							</div>
							<Switch id={item.id} checked={item.value} onCheckedChange={item.set} />
						</div>
					{/each}
				</CardContent>
			</Card>
		</TabsContent>

		<!-- Seguridad -->
		<TabsContent value="seguridad" class="mt-4">
			<Card>
				<CardHeader class="pb-4">
					<CardTitle class="text-base">Seguridad</CardTitle>
					<CardDescription class="text-xs">Configuración de acceso y autenticación</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium flex items-center gap-2">
								Autenticación de dos factores
								<Badge variant="secondary" class="text-[10px]">Recomendado</Badge>
							</p>
							<p class="text-xs text-muted-foreground">Requiere verificación adicional al iniciar sesión</p>
						</div>
						<Switch id="two-factor" bind:checked={twoFactor} />
					</div>

					<Separator />

					<div class="space-y-1.5">
						<Label for="session-timeout" class="text-xs font-medium">
							Tiempo de sesión (minutos)
						</Label>
						<Input
							id="session-timeout"
							type="number"
							bind:value={sessionTimeout}
							class="h-8 text-sm max-w-xs"
							min="5"
							max="480"
						/>
						<p class="text-[11px] text-muted-foreground">La sesión expira luego de este período de inactividad</p>
					</div>

					<Separator />

					<div class="space-y-1.5">
						<Label for="ip-whitelist" class="text-xs font-medium flex items-center gap-2">
							<KeyRound class="size-3.5" />
							Lista blanca de IPs
						</Label>
						<Input
							id="ip-whitelist"
							placeholder="192.168.1.0/24, 10.0.0.1"
							bind:value={ipWhitelist}
							class="h-8 text-sm"
						/>
						<p class="text-[11px] text-muted-foreground">Separar por comas. Dejá vacío para permitir todas las IPs</p>
					</div>
				</CardContent>
			</Card>
		</TabsContent>

		<!-- Datos -->
		<TabsContent value="datos" class="mt-4">
			<Card>
				<CardHeader class="pb-4">
					<CardTitle class="text-base">Gestión de datos</CardTitle>
					<CardDescription class="text-xs">Respaldos, retención y exportación</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium">Respaldo automático</p>
							<p class="text-xs text-muted-foreground">Respaldo diario a las 3:00 AM</p>
						</div>
						<Switch id="auto-backup" checked />
					</div>

					<Separator />

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div class="space-y-1.5">
							<Label for="retention-days" class="text-xs font-medium">Retención de logs (días)</Label>
							<Input id="retention-days" type="number" value="90" class="h-8 text-sm" />
						</div>
						<div class="space-y-1.5">
							<Label for="retention-backups" class="text-xs font-medium">Retención de respaldos</Label>
							<Input id="retention-backups" type="number" value="30" class="h-8 text-sm" />
						</div>
					</div>

					<Separator />

					<div class="flex flex-col sm:flex-row gap-2">
						<Button variant="outline" size="sm" class="text-xs gap-1.5">
							<Database class="size-3.5" />
							Exportar datos (CSV)
						</Button>
						<Button variant="outline" size="sm" class="text-xs gap-1.5 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5">
							Limpiar logs antiguos
						</Button>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	</Tabs>
</div>
