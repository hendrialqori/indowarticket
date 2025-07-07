ALTER TABLE `tickets` MODIFY COLUMN `code` varchar(16);--> statement-breakpoint
ALTER TABLE `tickets` MODIFY COLUMN `purchase_time` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `tickets` MODIFY COLUMN `status` enum('VALID','USED') DEFAULT 'VALID';