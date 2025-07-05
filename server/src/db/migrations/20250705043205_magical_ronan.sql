ALTER TABLE `users` RENAME COLUMN `google_id` TO `provider_id`;--> statement-breakpoint
ALTER TABLE `users` ADD `display_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `picture` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `password`;