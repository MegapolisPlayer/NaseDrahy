import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: { 
		adapter: adapter({
			config: "wrangler.jsonc",
			fallback: "plaintext"	
		}),
		csp: {
			directives: {
				'default-src': ['none'],
				'font-src': ['self'],
				'script-src': ['self', '*.cloudflare.com', '*.vercel.com', '*.vercel-scripts.com'],
				'object-src': ['self'],
				'img-src': ['self'],
				//sveltekit announcer issue + we use this
				'style-src': ['self', 'unsafe-inline'],
				'frame-ancestors': ['none'],
				'connect-src': ['self'],
				'frame-src': ['self'],
				'media-src': ['self'],
				'base-uri': ['self'],
			},
			// must be specified with either the `report-uri` or `report-to` directives, or both
			reportOnly: {
				'report-uri': ['/']
			},
			mode: 'auto',
		},
		csrf: {
			trustedOrigins: ['martinbykov.eu', 'nasedrahy.martinbykov.eu', 'http://localhost:5173']
		}
	},
};

export default config;
