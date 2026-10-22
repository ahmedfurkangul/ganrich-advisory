CREATE TABLE `pdf_insight_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`insight_id` text NOT NULL,
	`version` integer NOT NULL,
	`r2_key` text NOT NULL,
	`filename` text NOT NULL,
	`checksum` text NOT NULL,
	`file_size` integer NOT NULL,
	`change_summary` text DEFAULT 'Initial upload' NOT NULL,
	`uploaded_by` text NOT NULL,
	`uploaded_at` text NOT NULL,
	`status` text DEFAULT 'current' NOT NULL,
	FOREIGN KEY (`insight_id`) REFERENCES `pdf_insights`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pdf_versions_insight_version_unique` ON `pdf_insight_versions` (`insight_id`,`version`);--> statement-breakpoint
CREATE INDEX `pdf_versions_insight_idx` ON `pdf_insight_versions` (`insight_id`);--> statement-breakpoint
CREATE TABLE `pdf_insights` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`language` text DEFAULT 'en' NOT NULL,
	`title` text NOT NULL,
	`subtitle` text DEFAULT '' NOT NULL,
	`short_title` text DEFAULT '' NOT NULL,
	`content_type` text DEFAULT 'Report' NOT NULL,
	`status` text DEFAULT 'review_required' NOT NULL,
	`author` text DEFAULT '' NOT NULL,
	`publication_date` text,
	`data_period` text DEFAULT '' NOT NULL,
	`page_count` integer,
	`reading_time` integer,
	`executive_thesis` text DEFAULT '' NOT NULL,
	`short_summary` text DEFAULT '' NOT NULL,
	`executive_summary` text DEFAULT '' NOT NULL,
	`key_findings` text DEFAULT '[]' NOT NULL,
	`leadership_implications` text DEFAULT '[]' NOT NULL,
	`strategic_questions` text DEFAULT '[]' NOT NULL,
	`methodology` text DEFAULT '' NOT NULL,
	`limitations` text DEFAULT '' NOT NULL,
	`regions` text DEFAULT '[]' NOT NULL,
	`topics` text DEFAULT '[]' NOT NULL,
	`expertise` text DEFAULT '[]' NOT NULL,
	`keywords` text DEFAULT '[]' NOT NULL,
	`gating_model` text DEFAULT 'fully_ungated' NOT NULL,
	`ai_retrieval_approved` integer DEFAULT false NOT NULL,
	`rights_confirmed` integer DEFAULT false NOT NULL,
	`confidentiality_reviewed` integer DEFAULT false NOT NULL,
	`personal_data_reviewed` integer DEFAULT false NOT NULL,
	`sources_reviewed` integer DEFAULT false NOT NULL,
	`translation_reviewed` integer DEFAULT false NOT NULL,
	`final_approval` integer DEFAULT false NOT NULL,
	`pdf_key` text NOT NULL,
	`original_filename` text NOT NULL,
	`checksum` text NOT NULL,
	`mime_type` text DEFAULT 'application/pdf' NOT NULL,
	`file_size` integer NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`extraction_confidence` text DEFAULT 'requires_review' NOT NULL,
	`created_by` text NOT NULL,
	`updated_by` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`published_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pdf_insights_slug_language_unique` ON `pdf_insights` (`slug`,`language`);--> statement-breakpoint
CREATE UNIQUE INDEX `pdf_insights_checksum_unique` ON `pdf_insights` (`checksum`);--> statement-breakpoint
CREATE INDEX `pdf_insights_status_idx` ON `pdf_insights` (`status`);--> statement-breakpoint
CREATE INDEX `pdf_insights_language_idx` ON `pdf_insights` (`language`);