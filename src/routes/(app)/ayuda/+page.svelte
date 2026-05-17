<script>
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { HelpCircle, BookOpen, MessageSquare, ExternalLink, ChevronDown, ChevronUp, Mail, FileText } from '@lucide/svelte';

	const faqs = [
		{ q: '¿Cómo creo un nuevo usuario?', a: 'Ingresá a Gestión → Usuarios y hacé clic en "Nuevo usuario". Completá el formulario con nombre, email y rol asignado.', cat: 'Usuarios' },
		{ q: '¿Cómo cambio el plan de facturación?', a: 'En Facturación → Plan actual podés ver y cambiar tu suscripción. Los cambios se aplican al próximo ciclo de facturación.', cat: 'Facturación' },
		{ q: '¿Cómo exporto un reporte?', a: 'En la sección Reportes seleccioná el período con el selector de fechas y hacé clic en "Exportar CSV" o "Exportar PDF".', cat: 'Reportes' },
		{ q: '¿Cómo configuro el modo de mantenimiento?', a: 'En Configuración → General activá el switch "Modo mantenimiento". Los usuarios verán una página informativa mientras está activo.', cat: 'Sistema' },
		{ q: '¿Cómo restauro un backup?', a: 'Los backups se gestionan desde Configuración → Datos. Podés descargar o restaurar cualquier punto de respaldo de los últimos 30 días.', cat: 'Sistema' },
		{ q: '¿Cómo asigno permisos a un rol?', a: 'En Gestión → Roles y Permisos seleccioná el rol y editá los módulos habilitados haciendo clic en los checkboxes de la tabla.', cat: 'Roles' },
	];

	let openFaq = $state(null);

	const docs = [
		{ title: 'Guía de inicio rápido', icon: BookOpen, href: '#', desc: 'Primeros pasos con el backoffice' },
		{ title: 'Referencia de la API', icon: FileText, href: '#', desc: 'Documentación técnica completa' },
		{ title: 'Gestión de usuarios', icon: BookOpen, href: '#', desc: 'Roles, permisos y flujos de acceso' },
		{ title: 'Facturación y planes', icon: FileText, href: '#', desc: 'Suscripciones y métodos de pago' },
	];
</script>

<svelte:head><title>Ayuda — Backoffice</title></svelte:head>

<div class="space-y-6 max-w-3xl">
	<div>
		<h1 class="text-xl font-semibold text-foreground">Ayuda y Soporte</h1>
		<p class="text-sm text-muted-foreground mt-0.5">Documentación, preguntas frecuentes y canales de contacto</p>
	</div>

	<!-- Contact cards -->
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
		<Card class="border-primary/30 bg-primary/5">
			<CardContent class="pt-5 flex gap-4 items-start">
				<div class="size-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
					<MessageSquare class="size-5 text-primary" />
				</div>
				<div>
					<p class="text-sm font-semibold text-foreground">Chat en vivo</p>
					<p class="text-xs text-muted-foreground mt-0.5 mb-3">Lun–Vie 9–18 hs · Respuesta &lt; 5 min</p>
					<Button size="sm" class="h-8 text-xs">Iniciar chat</Button>
				</div>
			</CardContent>
		</Card>
		<Card>
			<CardContent class="pt-5 flex gap-4 items-start">
				<div class="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
					<Mail class="size-5 text-muted-foreground" />
				</div>
				<div>
					<p class="text-sm font-semibold text-foreground">Soporte por email</p>
					<p class="text-xs text-muted-foreground mt-0.5 mb-3">soporte@empresa.com · Respuesta en 24 h</p>
					<Button variant="outline" size="sm" class="h-8 text-xs">Enviar email</Button>
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Docs -->
	<div>
		<h2 class="text-sm font-semibold text-foreground mb-3">Documentación</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
			{#each docs as doc}
				<a href={doc.href} class="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group">
					<div class="size-8 rounded-md bg-muted flex items-center justify-center shrink-0">
						<doc.icon class="size-4 text-muted-foreground" />
					</div>
					<div class="min-w-0 flex-1">
						<p class="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{doc.title}</p>
						<p class="text-xs text-muted-foreground truncate">{doc.desc}</p>
					</div>
					<ExternalLink class="size-3.5 text-muted-foreground shrink-0" />
				</a>
			{/each}
		</div>
	</div>

	<!-- FAQ -->
	<div>
		<h2 class="text-sm font-semibold text-foreground mb-3">Preguntas frecuentes</h2>
		<Card class="overflow-hidden">
			{#each faqs as faq, i}
				{#if i > 0}<Separator />{/if}
				<button
					onclick={() => openFaq = openFaq === i ? null : i}
					class="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
				>
					<div class="flex items-center gap-3 min-w-0">
						<Badge variant="outline" class="text-[10px] h-4 px-1.5 shrink-0">{faq.cat}</Badge>
						<span class="text-sm font-medium text-foreground">{faq.q}</span>
					</div>
					{#if openFaq === i}
						<ChevronUp class="size-4 text-muted-foreground shrink-0" />
					{:else}
						<ChevronDown class="size-4 text-muted-foreground shrink-0" />
					{/if}
				</button>
				{#if openFaq === i}
					<div class="px-5 pb-4">
						<p class="text-sm text-muted-foreground leading-relaxed pl-[calc(theme(space.3)+theme(space.10))]">{faq.a}</p>
					</div>
				{/if}
			{/each}
		</Card>
	</div>
</div>
