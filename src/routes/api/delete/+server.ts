import { json, error } from '@sveltejs/kit';
import * as dataSchema from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { setup } from '$lib/server/index.js';

//delete event
export const POST = async (event) => {
	const data = (await setup(event, true)) as {
		sitekey: string;
		uuid: string;
	};
	if (!data.uuid) {
		return error(404);
	}

	try {
		await event.locals.db.delete(dataSchema.events).where(eq(dataSchema.events.uuid, data.uuid));
	} catch {
		return error(500);
	}

	return json({});
};
