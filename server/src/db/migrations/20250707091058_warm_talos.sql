CREATE TABLE `transactions` (
	`id` varchar(8) NOT NULL,
	`description` text,
	`ticket_id` varchar(8),
	`status` enum('PENDING','PAID','FAILED') DEFAULT 'PENDING',
	`purchase_time` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_ticket_id_tickets_id_fk` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tickets` DROP COLUMN `purchase_time`;