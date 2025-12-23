import { json, error } from "@sveltejs/kit";
import { checkRate } from "$lib/server/rate";
import { getAPIKey } from "$lib/server";
import * as dataSchema from '$lib/server/db/schema';
import { eq } from "drizzle-orm";
import type { EventType } from "$lib/types.js";
import { setup } from "$lib/server/index.js";

//get all events
export const GET = async (event) => {
	await setup(event);

	try {
		return json({
			success: true,
			events: (await event.locals.db.select().from(dataSchema.events)).map(v => {
				const objectDate = v.date.split('-').map(v => parseInt(v)); //YYYY-MM-DD
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
		});
	}
	catch {
		return error(500);
	}
};

//add event
export const POST = async (event) => {
	const data = await setup(event) as {
		sitekey: string;
		year: number;
		month: number;
		day: number;
		name: string;
		description: string;
		city: string;
	};
	if (!data.year || !data.month || !data.name || !data.day || !data.description || !data.city || data.month > 12 || data.day > 31) {
		error(400);
	}

	const uuid = crypto.randomUUID();

	try {
		await event.locals.db.insert(dataSchema.events).values({
			date: `${data.year}-${String(data.month).padStart(2, '0')}-${String(data.day).padStart(2, '0')}`,
			name: data.name,
			uuid: uuid,
			description: data.description,
			location: data.city
		});
	}
	catch {
		return error(500);
	}

	return json({
		success: true,
		uuid: uuid,
	});
};

//delete event
export const DELETE = async (event) => {
	const data = await setup(event) as {
		sitekey: string;
		uuid: string;
	};
	if (!data.uuid) {
		error(400);
	}

	try {
		await event.locals.db.delete(dataSchema.events).where(eq(dataSchema.events.uuid, data.uuid));
	}
	catch {
		error(500);
	}

	return json({
		success: true
	});
};