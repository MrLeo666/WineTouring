CREATE TABLE `favorites` (
	`user_id` text NOT NULL,
	`wine_id` text NOT NULL,
	`vintage` text NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `wine_id`, `vintage`)
);
