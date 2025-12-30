import * as dataSchema from '$lib/server/db/schema';
import { eq, and, count } from 'drizzle-orm';
import type { DBType } from './db/types';
import { error, type RequestEvent } from '@sveltejs/kit';
import * as crypto from 'node:crypto';
import type { EventType } from '$lib/types';

export const getSetting = async (db: DBType, key: string) => {
	return (
		await db.select().from(dataSchema.settings).where(eq(dataSchema.settings.key, key)).limit(1)
	)[0].value;
};

export const checkSetting = async (db: DBType, key: string, value: string) => {
	const len = (
		await db
			.select({ count: count() })
			.from(dataSchema.settings)
			.where(and(eq(dataSchema.settings.key, key), eq(dataSchema.settings.lang, 'all')))
			.limit(1)
	)[0].count;

	if (len === 0) {
		//create new if no existing
		await db.insert(dataSchema.settings).values({
			key: key,
			value: value,
			lang: 'all'
		});
		return false;
	}
	return true;
};

export const setSetting = async (db: DBType, key: string, value: string) => {
	await db
		.update(dataSchema.settings)
		.set({
			key: key,
			value: value,
			lang: 'all'
		})
		.where(eq(dataSchema.settings.key, key));
};

export const getAPIKey = async (db: DBType) => {
	return await getSetting(db, 'railwaysPageAPIKey');
};

export const getReadAPIKey = async (db: DBType) => {
	return await getSetting(db, 'railwaysPageReadOnlyAPIKey');
};

export const stringToBuffer = (s: string): Buffer => {
	return Buffer.from(s);
};

export const setup = async (event: RequestEvent, write: boolean) => {
	const apiKey = await getAPIKey(event.locals.db);
	const readApiKey = await getReadAPIKey(event.locals.db);

	if (!apiKey || !readApiKey) {
		error(503);
	}

	const data = await event.request.json();
	if (!data || !data.sitekey) {
		error(400);
	}

	if (
		//read/write api key
		((data.sitekey.length === apiKey.length) &&
			crypto.timingSafeEqual(
				stringToBuffer(data.sitekey), stringToBuffer(apiKey)
			)) ||
		//readonly api key
		(!write && (data.sitekey.length === readApiKey.length) &&
			crypto.timingSafeEqual(
				stringToBuffer(data.sitekey), stringToBuffer(readApiKey)
			))
	) {
		return data;
	}
	else {
		error(401);
	}
};

export const getEvents = async (db: DBType): Promise<EventType[]> => {
	return (await db.select().from(dataSchema.events))
		.map((v) => {
			const objectDate = v.date.split('-').map((v) => parseInt(v)); //YYYY-MM-DD
			return {
				name: v.name,
				day: objectDate[2],
				month: objectDate[1],
				year: objectDate[0],
				description: v.description,
				location: v.location,
				uuid: v.uuid
			} as EventType;
		})
		.sort(
			(a, b) =>
				new Date(b.year, b.month - 1, b.day).getTime() -
				new Date(a.year, a.month - 1, a.day).getTime()
		);
};
