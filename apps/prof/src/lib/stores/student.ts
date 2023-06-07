import { browser } from '$app/environment';
import { subscriber } from '$lib/subscriber';
import { writable } from 'svelte/store';

export const student_store = writable([]);
