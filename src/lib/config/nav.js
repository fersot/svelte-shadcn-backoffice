import {
	LayoutDashboard,
	Users,
	ShieldCheck,
	FileBarChart2,
	Settings,
	CreditCard,
	Bell,
	HelpCircle
} from '@lucide/svelte';

/** @type {Array<{title: string, items: Array<{label: string, href: string, icon: any, badge?: string}>}>} */
export const navGroups = [
	{
		title: 'Principal',
		items: [
			{ label: 'Dashboard', href: '/', icon: LayoutDashboard },
			{ label: 'Notificaciones', href: '/notificaciones', icon: Bell, badge: '5' }
		]
	},
	{
		title: 'Gestión',
		items: [
			{ label: 'Usuarios', href: '/usuarios', icon: Users },
			{ label: 'Roles y Permisos', href: '/roles', icon: ShieldCheck },
			{ label: 'Facturación', href: '/facturacion', icon: CreditCard }
		]
	},
	{
		title: 'Análisis',
		items: [{ label: 'Reportes', href: '/reportes', icon: FileBarChart2 }]
	},
	{
		title: 'Sistema',
		items: [
			{ label: 'Configuración', href: '/configuracion', icon: Settings },
			{ label: 'Ayuda', href: '/ayuda', icon: HelpCircle }
		]
	}
];
