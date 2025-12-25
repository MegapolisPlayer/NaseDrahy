ALTER TABLE "events" ADD CONSTRAINT "events_uuid_unique" UNIQUE("uuid");--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_key_unique" UNIQUE("key");