import { json } from "@sveltejs/kit";
import { checkRate } from "$lib/server/rate";
import { getAPIKey } from "$lib/server";
import type { EventType } from "$lib/types.js";

//get amount of days since last problem in roudnice nad labem
/*
{
	sitekey: string,
}
returns:
{
	success: true/false
	days: amount/-1
	last: EventType / {}
}
*/
export const GET = async (event) => {
	await checkRate(event);
	const apiKey = await getAPIKey(event.locals.db);
	const data = await event.request.json();
	
	return json({});
};
