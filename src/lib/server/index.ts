import * as dataSchema from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { DBType } from './db/types';
import { kebab } from 'postgres';

export const getSetting = async (db: DBType, key: string) => {
	return (await db.select().from(dataSchema.settings).where(eq(dataSchema.settings.key, key)).limit(1))[0].value;
};

export const getAPIKey = async (db: DBType) => {
	return getSetting(db, "railwaysPageAPIKey");
}