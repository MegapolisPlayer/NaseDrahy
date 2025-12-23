CREATE TABLE "events" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"date" date,
	"description" text NOT NULL,
	"location" text NOT NULL,
	"uuid" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "settings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"key" text NOT NULL,
	"value" text NOT NULL,
	"lang" text DEFAULT 'all' NOT NULL
);
