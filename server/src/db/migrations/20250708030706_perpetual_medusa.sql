ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_event_id_events_id_fk`;
--> statement-breakpoint
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_ticket_id_tickets_id_fk`;
--> statement-breakpoint
ALTER TABLE `tickets` ADD `transaction_id` varchar(8);--> statement-breakpoint
ALTER TABLE `transactions` ADD `event_id` varchar(8);--> statement-breakpoint
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_transaction_id_transactions_id_fk` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tickets` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `tickets` DROP COLUMN `event_id`;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `ticket_id`;