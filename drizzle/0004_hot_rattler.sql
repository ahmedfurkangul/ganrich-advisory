CREATE TABLE `download_grants` (
	`token` text PRIMARY KEY NOT NULL,
	`insight_id` text NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `download_grants_expires_idx` ON `download_grants` (`expires_at`);