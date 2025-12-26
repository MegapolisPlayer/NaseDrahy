import { json, error } from '@sveltejs/kit';
import * as dataSchema from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import { DAYS_MS } from '$lib';
import type { EventType } from '$lib/types.js';
import { setup } from '$lib/server/index.js';

//get amount of days since last problem in roudnice nad labem
export const POST = async (event) => {
	await setup(event);

	let object = undefined;

	try {
		object = await event.locals.db
			.select()
			.from(dataSchema.events)
			.orderBy(desc(dataSchema.events.date))
			.limit(1);
	} catch {
		return error(500);
	}

	if (!object || object.length == 0) {
		return error(404);
	}

	//YYYY-MM-DD
	const objectDate = object[0].date?.split('-').map((v) => parseInt(v));

	return json({
		success: true,
		days: Math.trunc(
			(Date.now() - new Date(objectDate[0], objectDate[1] - 1, objectDate[2]).getTime()) / DAYS_MS
		),
		events: {
			name: object[0].name,
			description: object[0].name,
			day: objectDate[2],
			month: objectDate[1],
			year: objectDate[0],
			location: object[0].location,
			uuid: object[0].uuid
		} as EventType
	});
};
