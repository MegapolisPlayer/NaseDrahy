import { getEvents, getSetting } from '$lib/server';
import { checkRate } from '$lib/server/rate/index.js';
import { fail } from '@sveltejs/kit';

export const load = async (event) => {
	return {
		events: await getEvents(event.locals.db)
	};
};

export const actions = {
	sendMessage: async (event) => {
		if (!(await checkRate(event))) {
			return fail(429, '');
		}

		const formData = await event.request.formData();
		if (!formData.has('message')) return fail(400, {});

		let response = await event.fetch('https://notifications.martinbykov.eu/email', {
			body: JSON.stringify({
				sendkey: await getSetting(event.locals.db, 'emailSendingAPIKey'),
				subject: '[NASEDRAHY] New message from tracker',
				message: formData.get('message')?.toString() as string
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
