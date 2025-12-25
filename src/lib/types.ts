export type EventType = {
	name: string;
	day: number;
	month: number;
	year: number;
	description: string;
	//city name
	location: string;
	uuid: string;
};

export type EventTypeInput = {
	name: string;
	day: number;
	month: number;
	year: number;
	description: string;
	//city name
	city: string;
};
