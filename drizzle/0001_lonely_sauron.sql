CREATE TABLE IF NOT EXISTS `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`language` text NOT NULL,
	`source` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`organization` text NOT NULL,
	`role` text DEFAULT '' NOT NULL,
	`region` text NOT NULL,
	`interest` text NOT NULL,
	`context` text NOT NULL,
	`decision` text DEFAULT '' NOT NULL,
	`contact_method` text DEFAULT 'email' NOT NULL,
	`marketing_consent` integer DEFAULT false NOT NULL,
	`privacy_acknowledged` integer DEFAULT false NOT NULL,
	`request_fingerprint` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `inquiries_created_at_idx` ON `inquiries` (`created_at`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `inquiries_status_idx` ON `inquiries` (`status`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `inquiries_fingerprint_idx` ON `inquiries` (`request_fingerprint`);
