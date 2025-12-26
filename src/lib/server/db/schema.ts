import { pgTable, text, date, integer } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	name: text('name').notNull(),
	date: date('date').notNull(),
	description: text('description').notNull(),
	//city name
	location: text('location').notNull(),
	uuid: text('uuid').notNull().unique()
});

export const settings = pgTable('settings', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	key: text('key').notNull().unique(),
	value: text('value').notNull(),
	lang: text('lang').notNull().default('all')
});
