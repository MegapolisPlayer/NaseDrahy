import { json } from "@sveltejs/kit";
import { checkRate } from "$lib/server/rate";
import { getAPIKey } from "$lib/server";

//get amount of days since last problem
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

//add event
/*
{
	sitekey: string,
	year: number;
	month: number;
	day: number;
	name: string,
	description: string,
	city: string,
}
returns:
{
	success: true/false
	uuid: uuid of event/empty string
}
*/
export const POST = async (event) => {
	await checkRate(event);
	const apiKey = await getAPIKey(event.locals.db);
	const data = await event.request.json();

	return json({});
};

//delete event
/*
{
	sitekey: string,
	uuid: string,
}
returns:
{
	success: true/false
}
*/
export const DELETE = async (event) => {
	await checkRate(event);
	const apiKey = await getAPIKey(event.locals.db);
	const data = await event.request.json();

	return json({});
};