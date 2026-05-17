<script>
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { theme } from '$lib/stores/theme.svelte.js';
	import { Sun, Moon, Eye, EyeOff, Lock, Mail, AlertCircle } from '@lucide/svelte';

	let email = $state('');
	let password = $state('');
	let showPass = $state(false);
	let loading = $state(false);
	let error = $state('');
	let rememberMe = $state(false);

	async function handleLogin(e) {
		e.preventDefault();
		if (!email || !password) { error = 'Completá todos los campos.'; return; }
		error = '';
		loading = true;
		// Mock: simula un request
		await new Promise(r => setTimeout(r, 1200));
		if (email === 'admin@empresa.com' && password === 'admin123') {
			window.location.href = '/';
		} else {
			error = 'Email o contraseña incorrectos.';
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Iniciar sesión — Backoffice</title>
</svelte:head>

<div class="w-full max-w-sm space-y-6">
	<!-- Logo + brand -->
	<div class="text-center space-y-2">
		<div class="size-12 rounded-xl bg-primary flex items-center justify-center mx-auto">
			<span class="text-primary-foreground font-bold text-xl">B</span>
		</div>
		<div>
			<h1 class="text-xl font-semibold text-foreground">Backoffice</h1>
			<p class="text-sm text-muted-foreground">Ingresá con tu cuenta de administrador</p>
		</div>
	</div>

	<Card class="shadow-lg border-border/60">
		<CardHeader class="pb-4">
			<CardTitle class="text-base">Iniciar sesión</CardTitle>
			<CardDescription class="text-xs">Credenciales de acceso al panel</CardDescription>
		</CardHeader>
		<CardContent>
			<form onsubmit={handleLogin} class="space-y-4">
				<!-- Error message -->
				{#if error}
					<div class="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs">
						<AlertCircle class="size-3.5 shrink-0" />
						{error}
					</div>
				{/if}

				<div class="space-y-1.5">
					<Label for="email" class="text-xs">Email</Label>
					<div class="relative">
						<Mail class="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
						<Input
							id="email"
							type="email"
							placeholder="admin@empresa.com"
							bind:value={email}
							class="pl-9 h-9 text-sm"
							autocomplete="email"
							required
						/>
					</div>
				</div>

				<div class="space-y-1.5">
					<div class="flex items-center justify-between">
						<Label for="password" class="text-xs">Contraseña</Label>
						<a href="/recuperar-contrasena" class="text-xs text-primary hover:underline">¿Olvidaste tu contraseña?</a>
					</div>
					<div class="relative">
						<Lock class="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
						<Input
							id="password"
							type={showPass ? 'text' : 'password'}
							placeholder="••••••••"
							bind:value={password}
							class="pl-9 pr-9 h-9 text-sm"
							autocomplete="current-password"
							required
						/>
						<button
							type="button"
							onclick={() => showPass = !showPass}
							class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
							aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
						>
							{#if showPass}<EyeOff class="size-3.5" />{:else}<Eye class="size-3.5" />{/if}
						</button>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<input
						id="remember"
						type="checkbox"
						bind:checked={rememberMe}
						class="size-3.5 rounded accent-primary"
					/>
					<Label for="remember" class="text-xs font-normal text-muted-foreground cursor-pointer">Recordarme en este dispositivo</Label>
				</div>

				<Button type="submit" class="w-full h-9" disabled={loading}>
					{#if loading}
						<span class="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></span>
						Ingresando…
					{:else}
						Ingresar
					{/if}
				</Button>
			</form>

			<Separator class="my-4" />

			<div class="text-center">
				<p class="text-xs text-muted-foreground">
					Demo: <code class="font-mono bg-muted px-1 py-0.5 rounded text-[11px]">admin@empresa.com</code> /
					<code class="font-mono bg-muted px-1 py-0.5 rounded text-[11px]">admin123</code>
				</p>
			</div>
		</CardContent>
	</Card>

	<!-- Theme toggle -->
	<div class="flex items-center justify-center">
		<button
			onclick={() => theme.toggle()}
			class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
		>
			{#if theme.isDark}
				<Sun class="size-3.5" />Modo claro
			{:else}
				<Moon class="size-3.5" />Modo oscuro
			{/if}
		</button>
	</div>
</div>
