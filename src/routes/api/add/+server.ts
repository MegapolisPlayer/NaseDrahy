import { json, error } from '@sveltejs/kit';
import * as dataSchema from '$lib/server/db/schema';
import { setup } from '$lib/server/index.js';
import type { EventTypeInput } from '$lib/types.js';

//add event
export const POST = async (event) => {
	const data = (await setup(event)) as {
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
		data.day > 31
	) {
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
	} catch {
		return error(500);
	}

	return json({
		success: true,
		uuid: uuid
	});
};
