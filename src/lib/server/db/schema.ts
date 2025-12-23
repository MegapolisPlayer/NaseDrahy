import { pgTable, serial, text, date, integer } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	date: date('date').$defaultFn(() =>
		`${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}-`
	),
	description: text('description').notNull(),
	//city name
	location: text('location').notNull(),
	uuid: text('uuid').notNull().$defaultFn(() => crypto.randomUUID())
});

export const settings = pgTable('settings', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	key: text('key').notNull(),
	value: text('value').notNull(),
	lang: text('lang').notNull().default('all')
});