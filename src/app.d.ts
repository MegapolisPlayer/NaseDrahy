import { DBType } from '$lib/server/db/types';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: {
				HYPERDRIVE: Hyperdrive;
			};
		}

		// interface Error {}
		interface Locals {
			db: DBType;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Window {
		/* eslint-disable @typescript-eslint/no-explicit-any */
		turnstile: any;
	}
}

export {};
