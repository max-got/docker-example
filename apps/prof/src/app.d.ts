// See https://kit.svelte.dev/docs/types#app
import type { Socket } from 'socket.io-client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			io: Socket<DefaultEventsMap, DefaultEventsMap>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
