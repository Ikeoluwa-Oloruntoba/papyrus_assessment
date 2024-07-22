CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uuid` varchar(36),
	`content` varchar(10000) NOT NULL,
	`post_id` int NOT NULL,
	`user_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`),
	CONSTRAINT `comments_uuid_unique` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uuid` varchar(36),
	`title` varchar(256) NOT NULL,
	`content` varchar(10000) NOT NULL,
	`user_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `posts_uuid_unique` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uuid` varchar(36),
	`fullname` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	`status` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_uuid_unique` UNIQUE(`uuid`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `user_access_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uuid` varchar(36),
	`access_token` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`revoked` boolean DEFAULT false,
	CONSTRAINT `user_access_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_access_tokens_uuid_unique` UNIQUE(`uuid`),
	CONSTRAINT `user_access_tokens_access_token_unique` UNIQUE(`access_token`)
);
