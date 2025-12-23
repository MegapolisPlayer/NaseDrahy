import { json } from "@sveltejs/kit";
import * as dataSchema from '$lib/server/db/schema';
import { getAPIKey } from "$lib/server";
import { checkRate } from "$lib/server/rate";

//get amount of days since last problem in roudnice nad labem
/*
{
	sitekey: string,
}
returns:
{
	success: true/false
	days: amount/-1
}
*/
export const GET = async (event) => {
	await checkRate(event);
	const apiKey = await getAPIKey(event.locals.db);
	const data = await event.request.json();

	return json({});
};
