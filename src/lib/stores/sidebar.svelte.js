/**
 * Estado global del sidebar usando Svelte 5 Runes.
 * mobileOpen: controla el drawer en móvil
 * collapsed: contrae el sidebar a modo mini en desktop
 */

let mobileOpen = $state(false);
let collapsed = $state(false);

export const sidebar = {
	get mobileOpen() {
		return mobileOpen;
	},
	set mobileOpen(v) {
		mobileOpen = v;
	},
	get collapsed() {
		return collapsed;
	},
	set collapsed(v) {
		collapsed = v;
	},
	toggleMobile() {
		mobileOpen = !mobileOpen;
	},
	toggleCollapsed() {
		collapsed = !collapsed;
	},
	closeMobile() {
		mobileOpen = false;
	}
};
