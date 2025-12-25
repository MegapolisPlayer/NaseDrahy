import { env } from '$env/dynamic/private';
import { getSetting, setSetting } from '$lib/server/index.js';
import { error, fail } from '@sveltejs/kit';

export const load = async (event) => {
	//development only page
	if(env.DEV != 'true') return error(404, "Not Found");

	return {
		railwaysPageAPIKey: await getSetting(event.locals.db, "railwaysPageAPIKey")
	}
};

//dev only actions, we don't care about validation
export const actions = {
	updateAPIKey: async (event) => {
		if(env.DEV != 'true') return fail(404, "Not Found");

		const formData = await event.request.formData();

		await setSetting(event.locals.db, "railwaysPageAPIKey", formData.get("key") as string);
	}
}