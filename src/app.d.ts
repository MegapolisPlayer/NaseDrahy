import { DBType } from '$lib/server/db/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DBType;
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				HYPERDRIVE: Hyperdrive;
			};
		}
	}
	interface Window {
		/* eslint-disable @typescript-eslint/no-explicit-any */
		turnstile: any;
	}
}

export {};
