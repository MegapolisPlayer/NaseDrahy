import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('events', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	time: timestamp('time').$defaultFn(() => new Date()),
	description: text('description').notNull(),
});
