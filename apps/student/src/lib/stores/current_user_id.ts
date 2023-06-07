import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const current_user_id = writable<number | null>(
	browser ? Number(localStorage.getItem('user_id')) : null
);
