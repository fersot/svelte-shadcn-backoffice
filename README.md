<div align="center">

<br />

<table width="100%">
  <tr>
    <td width="50%" align="center">
      <img src="https://raw.githubusercontent.com/fersot/svelte-shadcn-backoffice/main/.github/preview.png" alt="Modo Claro" width="100%" style="border-radius:8px" />
      <sub><b>☀️ Modo Claro</b></sub>
    </td>
    <td width="50%" align="center">
      <img src="https://raw.githubusercontent.com/fersot/svelte-shadcn-backoffice/main/.github/preview-dark.png" alt="Modo Oscuro" width="100%" style="border-radius:8px" />
      <sub><b>🌙 Modo Oscuro</b></sub>
    </td>
  </tr>
</table>

<br />
<br />

# 🧩 Svelte Shadcn Backoffice

### Template profesional de backoffice construido con Svelte 5, shadcn-svelte y Tailwind CSS v4

<br />

[![Demo en vivo](https://img.shields.io/badge/🚀%20Demo%20en%20vivo-svelte--shadcn.ferhub.io-6366f1?style=for-the-badge&logoColor=white)](https://svelte-shadcn.ferhub.io/)
[![Svelte](https://img.shields.io/badge/Svelte-5.x-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.x-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn-svelte](https://img.shields.io/badge/shadcn--svelte-1.x-000000?style=for-the-badge)](https://shadcn-svelte.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-sin%20TypeScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-22c55e?style=for-the-badge)](LICENSE)

<br />

**[🌐 Ver Demo](https://svelte-shadcn.ferhub.io/) · [🐛 Reportar Bug](https://github.com/fersot/svelte-shadcn-backoffice/issues) · [💡 Sugerir Feature](https://github.com/fersot/svelte-shadcn-backoffice/issues)**

</div>

---

## ✨ ¿Qué incluye?

Un template **completo y listo para usar** como punto de partida para cualquier panel de administración. Diseño sobrio, profesional y eficiente en el uso del espacio.

### 📄 Páginas incluidas

| Página | Ruta | Descripción |
|---|---|---|
| 🏠 Dashboard | `/` | KPIs, sparklines y actividad reciente con **DateRangePicker** |
| 🔔 Notificaciones | `/notificaciones` | Centro de notificaciones con filtros y acciones |
| 👥 Usuarios | `/usuarios` | Tabla paginada con búsqueda en tiempo real |
| 🛡️ Roles y Permisos | `/roles` | Matriz de permisos por módulo editable inline |
| 💳 Facturación | `/facturacion` | Historial de facturas con KPIs y filtros por fecha |
| 📊 Reportes | `/reportes` | Listado de reportes descargables |
| ⚙️ Configuración | `/configuracion` | Tabs: General, Notificaciones, Seguridad, Datos |
| 👤 Perfil | `/perfil` | Tabs: Información, Seguridad, Sesiones, Actividad |
| 🔐 Login | `/login` | Layout sin sidebar, validación y credenciales demo |
| ❓ Ayuda | `/ayuda` | FAQ acordeón, docs y canales de soporte |

### 🧱 Componentes de layout

- **Sidebar** — navegación agrupada, responsive, con badges de conteo
- **Topbar** — breadcrumbs automáticos, toggle dark/light, menú de usuario con links funcionales
- **Panel de notificaciones** — Sheet lateral deslizante con interacciones completas

---

## 🚀 Stack tecnológico

```
SvelteKit 2      →  Framework web
Svelte 5 Runes   →  $state, $derived, $effect (sin stores legacy)
shadcn-svelte 1  →  Componentes UI de alta calidad
Tailwind CSS v4  →  Utilidades CSS (via @tailwindcss/vite)
@lucide/svelte   →  Iconografía
Inter Variable   →  Tipografía
JavaScript puro  →  Sin TypeScript
```

---

## ⚡ Inicio rápido

### Requisitos

- **Node.js** v20+ (recomendado v24 LTS)
- **nvm** (opcional pero recomendado)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/fersot/svelte-shadcn-backoffice.git
cd svelte-shadcn-backoffice

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abre **http://localhost:5173** en tu navegador.

> 💡 **Credenciales demo:** `admin@empresa.com` / `admin123`

---

## 📁 Estructura del proyecto

```
src/
├── app.css                        # Tailwind v4 + tema zinc (dark/light)
├── app.html                       # HTML base
│
├── lib/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.svelte     # Sidebar fijo en desktop, drawer en mobile
│   │   │   └── Topbar.svelte      # Topbar con sheet de notificaciones
│   │   └── ui/                    # Componentes shadcn-svelte instalados
│   │
│   ├── config/
│   │   └── nav.js                 # Configuración centralizada de la navegación
│   │
│   └── stores/
│       ├── sidebar.svelte.js      # Estado del sidebar (Svelte 5 $state)
│       └── theme.svelte.js        # Tema oscuro/claro con localStorage
│
└── routes/
    ├── +layout.svelte             # Layout raíz (importa CSS, inicia tema)
    │
    ├── (app)/                     # Grupo con sidebar + topbar
    │   ├── +layout.svelte
    │   ├── +page.svelte           # Dashboard
    │   ├── notificaciones/
    │   ├── usuarios/
    │   ├── roles/
    │   ├── facturacion/
    │   ├── reportes/
    │   ├── configuracion/
    │   ├── perfil/
    │   └── ayuda/
    │
    └── (auth)/                    # Grupo sin sidebar (centrado)
        ├── +layout.svelte
        └── login/
```

---

## 🎨 Características de diseño

- **Modo oscuro / claro** — toggle instantáneo con persistencia en `localStorage`
- **Paleta Zinc** — colores neutros, sobrios y profesionales (oklch)
- **Responsive** — sidebar como drawer en mobile, layout adaptado
- **Tipografía** — Inter Variable desde `@fontsource-variable/inter`
- **Componentes UI** — shadcn-svelte con soporte completo para Tailwind v4

---

## 🧩 Agregar una nueva página

**1. Crear la ruta:**
```bash
mkdir src/routes/(app)/mi-seccion
touch src/routes/(app)/mi-seccion/+page.svelte
```

**2. Agregar al sidebar** en `src/lib/config/nav.js`:
```js
import { MiIcono } from '@lucide/svelte';

// En el array navGroups:
{ label: 'Mi Sección', href: '/mi-seccion', icon: MiIcono }
```

---

## 🧩 Agregar componentes shadcn

```bash
npx shadcn-svelte@latest add [componente]

# Ejemplos:
npx shadcn-svelte@latest add dialog
npx shadcn-svelte@latest add data-table
npx shadcn-svelte@latest add chart
```

Ver todos los componentes disponibles en [shadcn-svelte.com/docs/components](https://shadcn-svelte.com/docs/components).

---

## 🗺️ Próximos pasos sugeridos

- [ ] Integrar autenticación real (e.g. Auth.js, Lucia)
- [ ] Conectar a una API con `load()` functions de SvelteKit
- [ ] Agregar gráficos reales (Chart.js, ECharts)
- [ ] Implementar internacionalización (i18n)
- [ ] Agregar tests con Playwright o Vitest

---

## 📄 Licencia

Distribuido bajo la licencia **MIT**. Ver [`LICENSE`](LICENSE) para más información.

---

<div align="center">

Hecho con ❤️ por **[fersot](https://github.com/fersot)** usando [SvelteKit](https://kit.svelte.dev) · [shadcn-svelte](https://shadcn-svelte.com) · [Tailwind CSS v4](https://tailwindcss.com)

<br />

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-apoyar%20el%20proyecto-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/fersot)

</div>
