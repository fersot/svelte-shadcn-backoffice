/**
 * Store del tema claro/oscuro con persistencia en localStorage.
 * Svelte 5 Runes.
 */

const STORAGE_KEY = 'backoffice-theme';

function getInitialTheme() {
	if (typeof window === 'undefined') return 'light';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'dark' || stored === 'light') return stored;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

let current = $state('light');

function applyTheme(theme) {
	if (typeof document === 'undefined') return;
	document.documentElement.classList.toggle('dark', theme === 'dark');
}

export const theme = {
	get current() {
		return current;
	},
	init() {
		current = getInitialTheme();
		applyTheme(current);
	},
	toggle() {
		current = current === 'dark' ? 'light' : 'dark';
		localStorage.setItem(STORAGE_KEY, current);
		applyTheme(current);
	},
	get isDark() {
		return current === 'dark';
	}
};
