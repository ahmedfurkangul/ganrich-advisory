CREATE TABLE IF NOT EXISTS `analytics_salts` (
	`day` text PRIMARY KEY NOT NULL,
	`salt` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `page_views` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ts` text NOT NULL,
	`day` text NOT NULL,
	`path` text NOT NULL,
	`lang` text DEFAULT '' NOT NULL,
	`kind` text DEFAULT 'page' NOT NULL,
	`status` integer DEFAULT 200 NOT NULL,
	`referrer_host` text DEFAULT '' NOT NULL,
	`utm_source` text DEFAULT '' NOT NULL,
	`utm_medium` text DEFAULT '' NOT NULL,
	`utm_campaign` text DEFAULT '' NOT NULL,
	`country` text DEFAULT '' NOT NULL,
	`city` text DEFAULT '' NOT NULL,
	`network` text DEFAULT '' NOT NULL,
	`device` text DEFAULT '' NOT NULL,
	`browser` text DEFAULT '' NOT NULL,
	`os` text DEFAULT '' NOT NULL,
	`bot_name` text DEFAULT '' NOT NULL,
	`bot_category` text DEFAULT '' NOT NULL,
	`visitor` text DEFAULT '' NOT NULL,
	`duration_ms` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `page_views_day_idx` ON `page_views` (`day`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `page_views_day_bot_idx` ON `page_views` (`day`,`bot_category`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `page_views_path_idx` ON `page_views` (`path`);