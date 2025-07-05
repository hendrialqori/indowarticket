CREATE TABLE `events` (
	`id` varchar(8) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`start_time` timestamp NOT NULL,
	`ticket_count` int NOT NULL,
	`ticket_available` int NOT NULL,
	`ticket_price` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
