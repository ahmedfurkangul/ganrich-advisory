CREATE TABLE `subscribers` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`language` text NOT NULL,
	`source` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`token` text NOT NULL,
	`request_fingerprint` text NOT NULL,
	`created_at` text NOT NULL,
	`confirmed_at` text,
	`unsubscribed_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscribers_email_idx` ON `subscribers` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `subscribers_token_idx` ON `subscribers` (`token`);--> statement-breakpoint
CREATE INDEX `subscribers_status_idx` ON `subscribers` (`status`);