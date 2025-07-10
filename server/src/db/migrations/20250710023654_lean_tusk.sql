CREATE TABLE `conversations` (
	`id` varchar(8) NOT NULL,
	`admin_id` varchar(8),
	`buyer_id` varchar(8),
	`event_id` varchar(8),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` varchar(8) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`start_time` timestamp NOT NULL,
	`ticket_count` int NOT NULL,
	`ticket_available` int NOT NULL,
	`ticket_price` int NOT NULL,
	`status` enum('SOON','START','END') DEFAULT 'SOON',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `events_id` PRIMARY KEY(`id`),
	CONSTRAINT `ticket_available_check` CHECK(`events`.`ticket_available` >= 0)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` varchar(8) NOT NULL,
	`message` text NOT NULL,
	`sender_id` varchar(8),
	`conversation_id` varchar(8),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tickets` (
	`id` varchar(8) NOT NULL,
	`code` varchar(16),
	`transaction_id` varchar(8),
	`status` enum('VALID','USED') DEFAULT 'VALID',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `tickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` varchar(8) NOT NULL,
	`description` text,
	`user_id` varchar(8),
	`event_id` varchar(8),
	`status` enum('PENDING','PAID','FAILED') DEFAULT 'PENDING',
	`invoice_url` text,
	`purchase_time` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(8) NOT NULL,
	`email` varchar(50) NOT NULL,
	`display_name` varchar(255) NOT NULL,
	`picture` text NOT NULL,
	`provider_id` text NOT NULL,
	`role` enum('ADMIN','BUYER') DEFAULT 'BUYER',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_admin_id_users_id_fk` FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_buyer_id_users_id_fk` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_sender_id_users_id_fk` FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_conversation_id_conversations_id_fk` FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_transaction_id_transactions_id_fk` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE set null ON UPDATE no action;