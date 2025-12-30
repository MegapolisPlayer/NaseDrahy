import { json, error } from '@sveltejs/kit';
import * as dataSchema from '$lib/server/db/schema';
import { setup } from '$lib/server/index.js';
import type { EventTypeInput } from '$lib/types.js';

//add event
export const POST = async (event) => {
	const data = (await setup(event, true)) as {
		sitekey: string;
	} & EventTypeInput;
	if (
		!data.year ||
		!data.month ||
		!data.name ||
		!data.day ||
		!data.description ||
		!data.city ||
		data.month > 12 ||
		data.day > 31 ||
		data.year < 1800
	) {
		return error(400);
	}

	//no dates in the future
	if(new Date(data.year, data.month-1, data.day).getTime() > Date.now()) {
		return error(418);
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
	} catch {
		return error(500);
	}

	return json({
		uuid: uuid
	});
};
