import { pgTable, serial, text, date } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	date: date('date').$defaultFn(() =>
		`${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}-`
	),
	description: text('description').notNull(),
	//city name
	location: text('location').notNull()
});
