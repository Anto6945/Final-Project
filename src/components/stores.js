import { writable } from 'svelte/store';

export const hovered = writable(-1);
export const recorded_mouse_position = writable({ x: 0, y: 0 });