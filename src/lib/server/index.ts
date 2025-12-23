import * as dataSchema from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { DBType } from './db/types';
import { checkRate } from "$lib/server/rate";
import { error, type RequestEvent } from '@sveltejs/kit';
import * as crypto from 'node:crypto';

export const getSetting = async (db: DBType, key: string) => {
	return (await db.select().from(dataSchema.settings).where(eq(dataSchema.settings.key, key)).limit(1))[0].value;
};

export const getAPIKey = async (db: DBType) => {
	return await getSetting(db, "railwaysPageAPIKey");
}

export const stringToBuffer = (s: string): Buffer => {
	return Buffer.from(s, 'utf-8');
}

export const setup = async (event: RequestEvent) => {
	if (!(await checkRate(event))) {
		error(429);
	};

	const apiKey = await getAPIKey(event.locals.db);

	if (!apiKey) {
		error(503);
	}

	const data = await event.request.json();
	if (!data || !data.sitekey) {
		error(400);
	}

	if (crypto.timingSafeEqual(stringToBuffer(data.sitekey), stringToBuffer(apiKey))) {
		error(401);
	}

	return data;
}