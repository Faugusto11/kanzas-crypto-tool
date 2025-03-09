-- Create the schema (database) named kanzas
CREATE SCHEMA kanzas;

-- Select the schema to be used
USE kanzas;

-- Create the users table first (base for foreign keys in other tables)
CREATE TABLE `users` (
    `id_user` int unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `access_token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `secret_token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `created_at` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `has_picture` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'false',
    `picture_updated_at` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
    PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create the orders table next (depends on users table)
CREATE TABLE `orders` (
    `id_order` int unsigned NOT NULL AUTO_INCREMENT,
    `order_number` text COLLATE utf8mb4_general_ci NOT NULL,
    `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `quantity` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `value` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `date` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `id_user` int unsigned NOT NULL,
    PRIMARY KEY (`id_order`),
    KEY `FOREIGN` (`id_user`),
    CONSTRAINT `FOREIGN` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create the favorites table last (depends on users table)
CREATE TABLE `favorites` (
    `id_favorite` int unsigned NOT NULL AUTO_INCREMENT,
    `pair` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `id_user` int unsigned NOT NULL,
    PRIMARY KEY (`id_favorite`),
    KEY `FOREIGN2` (`id_user`),
    CONSTRAINT `FOREIGN2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;