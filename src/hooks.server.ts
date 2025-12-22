import { error, type Handle, type ServerInit } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { checkRate } from '$lib/server/rate';
import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dataSchema from '$lib/server/db/schema';
import { paraglideMiddleware } from '$lib/paraglide/server';
import 'dotenv/config';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

//https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
//If something doesn't work: play around with this.
const securityHeaders = {
	'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
	'Permissions-Policy': 'camera=(), microphone=(), interest-cohort=()',
	'Cross-Origin-Resource-Policy': 'same-site',
	'Cross-Origin-Embedder-Policy': 'credentialless',
	'Cross-Origin-Opener-Policy': 'same-origin',
	'X-Frame-Options': 'SAMEORIGIN',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
};

const handleSecurity: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	Object.entries(securityHeaders).forEach(([header, value]) =>
		response.headers.set(header, value),
	);
	return response;
};

const handleRateLimit: Handle = async ({ event, resolve }) => {
	if (!(await checkRate(event))) {
		return resolve(event);
	}
	return error(429);
};

const handleDatabase: Handle = async ({ event, resolve }) => {
	let connectionString = '';

	if (env.DEV != 'true') {
		console.log("ENV/DEV is ", env.DEV, ", using hyperdrive");
		connectionString = event.platform?.env.HYPERDRIVE.connectionString;
	} else {
		if (!env.DATABASE_URL) throw Error('DATABASE_URL not set!');
		console.log(env.DATABASE_URL);
		connectionString = env.DATABASE_URL;
	}

	event.locals.db = drizzle(
		postgres(connectionString, {
			prepare: false
		}),
		{ schema: dataSchema }
	);

	return resolve(event);
};

export const handle: Handle = sequence(
	handleDatabase,
	handleParaglide,
	handleSecurity,
	handleRateLimit
);

export const init: ServerInit = async () => { }