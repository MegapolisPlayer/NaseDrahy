import { json } from "@sveltejs/kit";

//get amount of days since last problem in roudnice nad labem
/*
{
	sitekey: string,
}
returns:
{
	success: true/false
	days: amount/-1
	last: {

	} / {}
	(EventType)
}
*/
export const GET = async () => {
	return json({});
};
