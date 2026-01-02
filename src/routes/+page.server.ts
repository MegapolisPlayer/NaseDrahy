import { getEvents, getSetting, canSendMessages } from '$lib/server';
import { fail } from '@sveltejs/kit';
import { MAX_CONTENT_LENGTH } from '$lib';
import { env } from '$env/dynamic/private';

export const load = async (event) => {
	return {
		events: await getEvents(event.locals.db),
		canSendMessages: (await canSendMessages(event.locals.db))
	};
};

export const actions = {
	sendMessage: async (event) => {
		if (!(await canSendMessages(event.locals.db))) {
			return fail(503, {});
		}

		const formData = await event.request.formData();
		if (!formData.has('message')) return fail(400, {});

		const msg = formData.get('message')?.toString() as string;
		if (msg.length > MAX_CONTENT_LENGTH) return fail(400, {});

		//through our notifications API
		const response = await event.fetch('https://notifications.martinbykov.eu/email', {
			body: JSON.stringify({
				sendkey: env.EMAIL_API_KEY,
				subject: '[NASEDRAHY] New message from tracker',
				message: msg
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});

		if (response.status < 300) return;
		else return fail(503, {});
	},
	setDarkMode: async (event) => {
		const formData = await event.request.formData();
		if (!formData.has('mode')) return fail(400, {});
		const mode = formData.get('mode')?.toString() as string;

		if (mode == 'light') {
			event.cookies.set("dark", "light", { path: '/' })
		}
		else if (mode == 'dark') {
			event.cookies.set("dark", "dark", { path: '/' })
		}
	}
};
