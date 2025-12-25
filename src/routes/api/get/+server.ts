import { json, error } from '@sveltejs/kit';
import { setup } from '$lib/server/index.js';
import { getEvents } from '$lib/server/index.js';

//get all events
export const POST = async (event) => {
	await setup(event);

	try {
		return json({
			success: true,
			events: await getEvents(event.locals.db)
		});
	} catch {
		return error(500);
	}
};
