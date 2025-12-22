import { json } from "@sveltejs/kit";

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
export const GET = async () => {
	return json({});
};

//add event
/*
{
	sitekey: string,
	timestamp: Date ISO string,
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
export const POST = async () => {
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
export const DELETE = async () => {
	return json({});
};