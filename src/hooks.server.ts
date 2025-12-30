import { type Handle, type ServerInit } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dataSchema from '$lib/server/db/schema';
import { paraglideMiddleware } from '$lib/paraglide/server';
import 'dotenv/config';
import { checkSetting } from '$lib/server';

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
	'Referrer-Policy': 'strict-origin-when-cross-origin'
};

const handleSecurity: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	Object.entries(securityHeaders).forEach(([header, value]) => response.headers.set(header, value));
	return response;
};

const handleDatabase: Handle = async ({ event, resolve }) => {
	let connectionString = '';

	if (env.DEV != 'true') {
		console.log('ENV/DEV is ', env.DEV, ', using hyperdrive');
		connectionString = event.platform?.env.HYPERDRIVE.connectionString;
	} else {
		if (!env.DATABASE_URL) throw Error('DATABASE_URL not set!');
		console.log('ENV/DEV is ', env.DEV, ' using DATABASE_URL: ', env.DATABASE_URL);
		connectionString = env.DATABASE_URL;
	}

	event.locals.db = drizzle(
		postgres(connectionString, {
			prepare: false,
			max: 1,
			max_lifetime: 1
		}),
		{ schema: dataSchema }
	);

	await checkSetting(event.locals.db, 'railwaysPageAPIKey', crypto.randomUUID());
	await checkSetting(event.locals.db, 'railwaysPageReadOnlyAPIKey', crypto.randomUUID());
	await checkSetting(event.locals.db, 'railwaysPageNotifications', 'true');

	await checkSetting(event.locals.db, 'emailSendingAPIKey', crypto.randomUUID());

	return resolve(event);
};

export const handle: Handle = sequence(handleDatabase, handleParaglide, handleSecurity);

export const init: ServerInit = async () => {};
