/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : 127.0.0.1:3306
Source Database       : gosat

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2023-05-28 21:42:19
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `banks`
-- ----------------------------
DROP TABLE IF EXISTS `banks`;
CREATE TABLE `banks` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of banks
-- ----------------------------
INSERT INTO `banks` VALUES ('1', 'Banco PingApp', '2023-05-26 07:33:37', '2023-05-27 16:19:48');
INSERT INTO `banks` VALUES ('2', 'Financeira Assert', '2023-05-26 07:33:39', '2023-05-27 16:19:49');
INSERT INTO `banks` VALUES ('3', 'Banco ATR SA', '2023-05-26 07:33:54', '2023-05-27 16:19:12');

-- ----------------------------
-- Table structure for `failed_jobs`
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for `logs`
-- ----------------------------
DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of logs
-- ----------------------------

-- ----------------------------
-- Table structure for `migrations`
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES ('1', '2014_10_12_000000_create_users_table', '1');
INSERT INTO `migrations` VALUES ('2', '2014_10_12_100000_create_password_reset_tokens_table', '1');
INSERT INTO `migrations` VALUES ('3', '2019_08_19_000000_create_failed_jobs_table', '1');
INSERT INTO `migrations` VALUES ('4', '2019_12_14_000001_create_personal_access_tokens_table', '1');
INSERT INTO `migrations` VALUES ('5', '2023_05_24_232658_create_versions_table', '2');
INSERT INTO `migrations` VALUES ('6', '2023_05_25_010000_create_logs_table', '3');
INSERT INTO `migrations` VALUES ('7', '2023_05_25_014548_create_modules_table', '4');
INSERT INTO `migrations` VALUES ('8', '2023_05_25_193143_create_permissions_table', '5');
INSERT INTO `migrations` VALUES ('9', '2023_05_26_022139_create_banks_table', '6');
INSERT INTO `migrations` VALUES ('10', '2023_05_26_023043_create_modalities_table', '7');
INSERT INTO `migrations` VALUES ('11', '2023_05_26_030633_create_numbers_table', '8');

-- ----------------------------
-- Table structure for `modalities`
-- ----------------------------
DROP TABLE IF EXISTS `modalities`;
CREATE TABLE `modalities` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cpf` text NOT NULL,
  `name` text NOT NULL,
  `cod` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of modalities
-- ----------------------------
INSERT INTO `modalities` VALUES ('1', '111.111.111-11', 'crédito pessoal', 'a50ed2ed-2b8b-4cc7-ac95-71a5568b34ce', '2023-05-26 07:33:37', '2023-05-27 16:19:49');
INSERT INTO `modalities` VALUES ('2', '111.111.111-11', 'crédito consignado', '13', '2023-05-26 07:33:38', '2023-05-27 16:19:48');
INSERT INTO `modalities` VALUES ('3', '123.123.123-12', 'crédito pessoal', '3', '2023-05-26 07:33:53', '2023-05-27 16:15:43');
INSERT INTO `modalities` VALUES ('4', '123.123.123-12', 'Saque FGTS', '17', '2023-05-26 07:33:54', '2023-05-27 16:15:44');
INSERT INTO `modalities` VALUES ('5', '123.123.123-12', 'crédito consignado', '33', '2023-05-26 07:33:54', '2023-05-27 16:15:45');
INSERT INTO `modalities` VALUES ('6', '222.222.222-22', 'crédito pessoal', '12', '2023-05-26 07:34:06', '2023-05-27 16:19:12');
INSERT INTO `modalities` VALUES ('7', '222.222.222-22', 'Saque FGTS', '56c6dbc9-7109-4a67-953d-4ca2ae6b8051', '2023-05-26 07:34:07', '2023-05-27 16:19:11');

-- ----------------------------
-- Table structure for `modules`
-- ----------------------------
DROP TABLE IF EXISTS `modules`;
CREATE TABLE `modules` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `module` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of modules
-- ----------------------------
INSERT INTO `modules` VALUES ('1', '0', 'Página Inicial', 'index', null, null);
INSERT INTO `modules` VALUES ('2', '0', 'Gráficos', '', null, null);
INSERT INTO `modules` VALUES ('3', '0', 'Integrações', null, null, null);
INSERT INTO `modules` VALUES ('4', '0', 'Usuários', '', null, null);
INSERT INTO `modules` VALUES ('5', '4', 'Usuário', 'usuario', null, null);
INSERT INTO `modules` VALUES ('6', '4', 'Módulos', 'modulos', null, null);
INSERT INTO `modules` VALUES ('7', '4', 'Permissão', 'permissao', null, null);
INSERT INTO `modules` VALUES ('8', '4', 'Logs de Acesso', 'logs', null, null);
INSERT INTO `modules` VALUES ('9', '4', 'Versão', 'versao', null, null);
INSERT INTO `modules` VALUES ('10', '2', 'Gráficos do Sistema', 'graficos', null, null);
INSERT INTO `modules` VALUES ('11', '3', 'API', 'api', null, null);

-- ----------------------------
-- Table structure for `numbers`
-- ----------------------------
DROP TABLE IF EXISTS `numbers`;
CREATE TABLE `numbers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `bank` int(11) NOT NULL,
  `modality` int(11) NOT NULL,
  `qtdeParcMin` int(11) NOT NULL,
  `qtdeParcMax` int(11) NOT NULL,
  `valorMin` decimal(8,2) NOT NULL,
  `valorMax` decimal(8,2) NOT NULL,
  `jurosMes` decimal(8,5) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of numbers
-- ----------------------------
INSERT INTO `numbers` VALUES ('1', '1', '1', '12', '48', '5000.00', '8000.00', '0.04950', '2023-05-26 07:33:37', '2023-05-27 16:19:48');
INSERT INTO `numbers` VALUES ('2', '1', '2', '24', '72', '10000.00', '19250.00', '0.01180', '2023-05-26 07:33:38', '2023-05-27 16:19:48');
INSERT INTO `numbers` VALUES ('3', '2', '1', '12', '48', '3000.00', '7000.00', '0.03650', '2023-05-26 07:33:39', '2023-05-27 16:19:49');
INSERT INTO `numbers` VALUES ('4', '1', '3', '18', '60', '12000.00', '21250.00', '0.01180', '2023-05-26 07:33:53', '2023-05-27 16:15:43');
INSERT INTO `numbers` VALUES ('5', '1', '4', '12', '48', '15000.00', '25250.00', '0.03850', '2023-05-26 07:33:54', '2023-05-27 16:15:44');
INSERT INTO `numbers` VALUES ('6', '3', '5', '12', '120', '12236.00', '58130.00', '0.01050', '2023-05-26 07:33:54', '2023-05-27 16:15:45');
INSERT INTO `numbers` VALUES ('7', '2', '6', '18', '60', '8000.00', '21250.00', '0.05010', '2023-05-26 07:34:06', '2023-05-27 16:19:10');
INSERT INTO `numbers` VALUES ('8', '2', '7', '18', '60', '500.00', '6250.00', '0.04090', '2023-05-26 07:34:07', '2023-05-27 16:19:11');
INSERT INTO `numbers` VALUES ('9', '3', '6', '12', '48', '5140.00', '18250.00', '0.03950', '2023-05-26 07:34:07', '2023-05-27 16:19:12');

-- ----------------------------
-- Table structure for `password_reset_tokens`
-- ----------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of password_reset_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for `permissions`
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `module` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `view` int(11) NOT NULL,
  `edit` int(11) NOT NULL,
  `delete` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES ('1', '5', '1', '1', '1', '1', null, null);
INSERT INTO `permissions` VALUES ('2', '6', '1', '1', '1', '1', null, null);
INSERT INTO `permissions` VALUES ('3', '7', '1', '1', '1', '1', null, null);
INSERT INTO `permissions` VALUES ('4', '8', '1', '1', '1', '1', null, null);
INSERT INTO `permissions` VALUES ('5', '9', '1', '1', '1', '1', null, null);
INSERT INTO `permissions` VALUES ('6', '10', '1', '1', '1', '1', null, null);
INSERT INTO `permissions` VALUES ('7', '11', '1', '1', '1', '1', null, null);
INSERT INTO `permissions` VALUES ('8', '12', '1', '1', '1', '1', '2023-05-26 16:59:16', '2023-05-26 16:59:16');
INSERT INTO `permissions` VALUES ('9', '10', '2', '1', '1', '1', '2023-05-26 17:11:11', '2023-05-26 17:11:11');
INSERT INTO `permissions` VALUES ('10', '11', '2', '1', '1', '1', '2023-05-26 17:11:16', '2023-05-26 17:11:16');
INSERT INTO `permissions` VALUES ('11', '5', '2', '1', '1', '1', '2023-05-26 17:11:22', '2023-05-26 17:11:22');
INSERT INTO `permissions` VALUES ('12', '6', '2', '1', '0', '0', '2023-05-26 17:11:28', '2023-05-26 17:11:28');
INSERT INTO `permissions` VALUES ('13', '7', '2', '1', '1', '1', '2023-05-26 17:11:33', '2023-05-26 17:11:33');
INSERT INTO `permissions` VALUES ('14', '8', '2', '1', '1', '1', '2023-05-26 17:11:34', '2023-05-26 17:11:34');
INSERT INTO `permissions` VALUES ('15', '9', '2', '1', '1', '1', '2023-05-26 17:11:35', '2023-05-26 17:11:35');
INSERT INTO `permissions` VALUES ('16', '12', '2', '1', '1', '1', '2023-05-26 17:11:36', '2023-05-26 17:11:36');

-- ----------------------------
-- Table structure for `personal_access_tokens`
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'Henrique', 'henrique.marcandier@gmail.com', null, '3aa002e8906a4caeeb1daff642af9d04', '', 'usuario1.png', '2023-05-26 04:25:10', '2023-05-28 20:26:17');
INSERT INTO `users` VALUES ('2', 'Equipe Gosat', 'equipegosat@bhcommerce.com.br', null, '9ad20028a4b331bc1590c42290f02b9c', null, 'usuario2.png', '2023-05-26 07:29:46', '2023-05-27 15:29:32');

-- ----------------------------
-- Table structure for `versions`
-- ----------------------------
DROP TABLE IF EXISTS `versions`;
CREATE TABLE `versions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext DEFAULT '',
  `img` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of versions
-- ----------------------------
INSERT INTO `versions` VALUES ('1', '1.0', 'Versão Inicial do Sistema de Teste da Gosat', 'versao1.png', '2023-05-26 12:45:45', '2023-05-27 19:29:59');
