CREATE TABLE `tickets` (
	`id` varchar(8) NOT NULL,
	`code` varchar(8) NOT NULL,
	`purchase_time` timestamp NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `tickets_id` PRIMARY KEY(`id`)
);
