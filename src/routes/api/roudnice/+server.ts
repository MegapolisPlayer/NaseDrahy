import { json, error } from '@sveltejs/kit';
import * as dataSchema from '$lib/server/db/schema';
import { desc, sql } from 'drizzle-orm';
import { DAYS_MS } from '$lib';
import { setup } from '$lib/server/index.js';

//get amount of days since last problem in roudnice nad labem
export const POST = async (event) => {
	await setup(event);

	let object = undefined;
	try {
		object = await event.locals.db
			.select()
			.from(dataSchema.events)
			.where(sql`${dataSchema.events.location} LIKE ${'%Roudnice%'}`)
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
		)
	});
};
