import { getSetting } from '$lib/server';
import { getEvents } from '$lib/server';

export const load = async (event) => {
	return {
		events: await getEvents(event.locals.db)
	}
}