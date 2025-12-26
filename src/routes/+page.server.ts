import { getEvents, getSetting } from '$lib/server';
import { fail } from '@sveltejs/kit';
import { MAX_CONTENT_LENGTH } from '$lib';

export const load = async (event) => {
	return {
		events: await getEvents(event.locals.db)
	};
};

export const actions = {
	sendMessage: async (event) => {
		const formData = await event.request.formData();
		if (!formData.has('message')) return fail(400, {});

		const msg = formData.get('message')?.toString() as string;
		if (msg.length > MAX_CONTENT_LENGTH) return fail(400, {});

		//through our notifications API
		const response = await event.fetch('https://notifications.martinbykov.eu/email', {
			body: JSON.stringify({
				sendkey: await getSetting(event.locals.db, 'emailSendingAPIKey'),
				subject: '[NASEDRAHY] New message from tracker',
				message: msg
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});

		if (response.status < 300) return;
		else return fail(418, {});
	}
};
