-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: avikka
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `LenskartCheckouts`
--

DROP TABLE IF EXISTS `LenskartCheckouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LenskartCheckouts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `add` varchar(255) DEFAULT NULL,
  `axis` varchar(255) DEFAULT NULL,
  `left_cyl` varchar(255) DEFAULT NULL,
  `left_sph` varchar(255) DEFAULT NULL,
  `right_cyl` varchar(255) DEFAULT NULL,
  `right_sph` varchar(255) DEFAULT NULL,
  `selectLansType` varchar(255) DEFAULT NULL,
  `selected_type` varchar(255) DEFAULT NULL,
  `selected_Lens_Or_ProductPrice` float NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `traking_number` varchar(255) DEFAULT NULL,
  `product_id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentId` int DEFAULT NULL,
  `delivery_status` varchar(45) NOT NULL,
  `frem_color` varchar(45) NOT NULL,
  `lens_color` varchar(45) NOT NULL,
  `product_quantity` varchar(45) NOT NULL,
  `selected_address_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `paymentId` (`paymentId`),
  CONSTRAINT `LenskartCheckouts_ibfk_1` FOREIGN KEY (`paymentId`) REFERENCES `lenskartPayments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LenskartCheckouts`
--

LOCK TABLES `LenskartCheckouts` WRITE;
/*!40000 ALTER TABLE `LenskartCheckouts` DISABLE KEYS */;
INSERT INTO `LenskartCheckouts` VALUES (15,'','','-0.25','-0.00','-0.25','-0.00','Bifocal','Photo CR',2276,'9110189280',NULL,'41','2024-12-27 10:28:59','2024-12-27 10:28:59',24,'Processing','','','',NULL),(16,'','','-0.25','-0.00','-0.25','-0.00','Progressive','Drivex',5040,'9110189280',NULL,'42','2024-12-27 15:40:08','2024-12-27 15:40:08',25,'Processing','','','',NULL),(17,'9','8','-0.75','-0.00','-0.25','-0.00','SingleVision','Blue Block',1519.2,'9110189280',NULL,'45','2024-12-27 16:05:41','2024-12-27 16:05:41',26,'Processing','','','',NULL),(18,'','','-0.25','-0.00','-0.25','-0.00','Progressive','Drivex',5680,'9110189280',NULL,'43','2024-12-28 14:09:19','2024-12-28 14:09:19',27,'Processing','','','',NULL),(19,'66','79','-0.25','-8.50','0.50','-0.00','SingleVision','Photo CR',2599.2,'9110189245',NULL,'44','2024-12-31 07:27:06','2024-12-31 07:27:06',28,'Processing','','','',NULL),(20,'7','8','0.25','-8.00','-0.25','-9.00','Bifocal','Arc',2540,'9110189245',NULL,'42','2024-12-31 10:02:25','2024-12-31 10:02:25',29,'Processing','','','',NULL),(21,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,476,'9110189245',NULL,'41','2024-12-31 10:09:13','2024-12-31 10:09:13',30,'Processing','','','',NULL),(22,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1680,'9110189280',NULL,'43','2024-12-31 16:11:02','2024-12-31 16:11:02',31,'Processing','','','',NULL),(23,'4','5','0.25','-9.50','-0.75','-9.25','Bifocal','Photo CR',2519.2,'9110189280',NULL,'45','2024-12-31 16:13:10','2024-12-31 16:13:10',32,'Processing','','','',NULL),(24,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1680,'9110189245',NULL,'43','2025-02-17 15:26:54','2025-02-17 15:26:54',33,'Processing','Yellow','Blue','',NULL),(25,'6','7','-0.25','-0.00','-0.25','-0.00','Plano','Photo CR',2276,'9110189245',NULL,'41','2025-02-17 15:28:06','2025-02-17 15:28:06',34,'Processing','Yellow','Blue','',NULL),(26,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3360,'9110189245',NULL,'43','2025-04-10 14:58:29','2025-04-10 14:58:29',43,'Processing','Brown','Green','2',NULL),(27,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2397.6,'9110189245',NULL,'44','2025-04-11 12:50:15','2025-04-11 12:50:15',44,'Processing','Green','Gray','3',NULL),(28,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2157.6,'9110189245',NULL,'45','2025-04-12 17:51:45','2025-04-12 17:51:45',45,'Processing','Gray','Orange','3',NULL),(29,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,719.2,'9110189280',NULL,'45','2025-04-17 12:30:18','2025-04-17 12:30:18',46,'Processing','Gray','Orange','1',NULL),(30,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1040,'9110189280',NULL,'42','2025-04-17 13:36:34','2025-04-17 13:36:34',47,'Processing','Black','Brown','1',NULL),(31,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1040,'9110189280',NULL,'42','2025-04-17 18:21:38','2025-04-17 18:21:38',48,'Processing','Black','Brown','1',NULL),(34,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1680,'9110189280',NULL,'43','2025-04-18 13:09:51','2025-04-18 13:09:51',51,'Processing','Brown','Green','1',NULL),(35,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,719.2,'9110189280',NULL,'45','2025-04-19 13:27:31','2025-04-19 13:27:31',52,'Processing','Gray','Orange','1','52'),(36,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1040,'9110189280',NULL,'42','2025-04-19 13:40:54','2025-04-19 13:40:54',53,'Processing','Black','Brown','1','52'),(37,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1040,'9110189280',NULL,'42','2025-04-19 17:23:54','2025-04-19 17:23:54',54,'Processing','Black','Brown','1',NULL),(38,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1040,'9110189280',NULL,'42','2025-04-19 18:23:17','2025-04-19 18:23:17',55,'Processing','Black','Brown','1',NULL),(39,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1680,'9110189280',NULL,'43','2025-04-19 18:24:31','2025-04-19 18:24:31',56,'Processing','Brown','Green','1','49');
/*!40000 ALTER TABLE `LenskartCheckouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductOffer`
--

DROP TABLE IF EXISTS `ProductOffer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductOffer` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `offerId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`offerId`,`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductOffer`
--

LOCK TABLES `ProductOffer` WRITE;
/*!40000 ALTER TABLE `ProductOffer` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductOffer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Specifications`
--

DROP TABLE IF EXISTS `Specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Specifications` (
  `Specification_id` int NOT NULL AUTO_INCREMENT,
  `skin_type` varchar(255) DEFAULT NULL,
  `hair_type` varchar(255) DEFAULT NULL,
  `benefits` varchar(255) NOT NULL,
  `primary_concerns` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `product_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`Specification_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `Specifications_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Specifications`
--

LOCK TABLES `Specifications` WRITE;
/*!40000 ALTER TABLE `Specifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `Specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Videothumnails`
--

DROP TABLE IF EXISTS `Videothumnails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Videothumnails` (
  `Videothumnail_id` int NOT NULL AUTO_INCREMENT,
  `thumbnail_url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`Videothumnail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Videothumnails`
--

LOCK TABLES `Videothumnails` WRITE;
/*!40000 ALTER TABLE `Videothumnails` DISABLE KEYS */;
/*!40000 ALTER TABLE `Videothumnails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `addresses_id` int NOT NULL AUTO_INCREMENT,
  `pincode` int NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `house_flat_office_no` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `contact_name` varchar(255) NOT NULL,
  `mobile_num` bigint NOT NULL,
  `address_type` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`addresses_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `registrations` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (43,804453,'parsa','Bihar','00','patna parsa1','parsa','Raj Choudhary',9110189280,'home',3,'2024-11-30 17:11:13','2024-12-31 16:12:39'),(44,804453,'parsa','Bihar','00','patna patna','parsa','Raj Choudhary',9110189280,'home',3,'2024-11-30 17:11:46','2024-11-30 17:11:46'),(45,804453,'parsa','Bihar','00','patna patna','parsa','Raj Choudhary',9110189280,'home',3,'2024-11-30 17:11:50','2024-11-30 17:11:50'),(46,804453,'parsa 1','Bihar','00','patna','01','Raj Choudhary',9110189245,'home',2,'2024-12-16 11:58:21','2025-04-14 16:13:02'),(47,804453,'parsa','Bihar','00','patna parsa1','parsa','Raj Choudhary',9110189280,'home',3,'2025-04-17 12:16:56','2025-04-17 12:16:56'),(49,804453,'parsa','Bihar','00','patna','01','Raj Choudhary ji',9110189280,'home',3,'2025-04-17 12:25:31','2025-04-17 12:25:31'),(50,804453,'parsa','Bihar','00','patna','01','Raj Choudhary ji',9110189280,'home',3,'2025-04-17 12:25:46','2025-04-17 12:25:46'),(51,804453,'parsa','Bihar','00','patna','01','Raj Choudhary ji',9110189280,'home',3,'2025-04-17 12:29:46','2025-04-17 12:29:46'),(58,804453,'parsa','Bihar','00','patna','01','Raj Choudhary',9110189280,'home',3,'2025-04-19 17:23:28','2025-04-19 17:23:28'),(59,804453,'parsa','Bihar','00','patna','01','Raj Choudhary',9110189280,'work',3,'2025-04-19 18:22:48','2025-04-19 18:22:48');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `brand_id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(255) NOT NULL,
  `section` varchar(255) NOT NULL,
  `place` varchar(255) NOT NULL,
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Helius Eyewear ','section_1','Group_B'),(2,'Eyeglasses for Every Occasion','section_2','Group_B'),(3,'Lykos Eyewear','section_3','Group_B'),(4,'Eyeglasses for Every Occasion','section_4','Group_B'),(5,'Lykos Eyewear','section_5','Group_B'),(6,'Blinkers Eyeglasses','section_6','Group_B'),(7,'EyePoppin Eyeglasses','section_7','Group_B');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carousels`
--

DROP TABLE IF EXISTS `carousels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carousels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(255) DEFAULT NULL,
  `place` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `product_categories` varchar(255) DEFAULT NULL,
  `exact_place` varchar(45) NOT NULL,
  `section` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carousels`
--

LOCK TABLES `carousels` WRITE;
/*!40000 ALTER TABLE `carousels` DISABLE KEYS */;
INSERT INTO `carousels` VALUES (32,'','Group_A','1742319594935-your-perfect-pair-banner.webp','2025-03-07 12:23:32','2025-03-18 17:39:54','','left','section_1'),(33,'','Group_A','1741350319296-crystal-clear-vision-banner.webp','2025-03-07 12:25:19','2025-03-07 12:25:19','','right','section_1'),(34,'','Group_A','1741353080868-text_banner.webp','2025-03-07 13:11:20','2025-03-07 13:11:20','','left','section_2'),(35,'','Group_B','1741370565273-Helius.webp','2025-03-07 18:02:45','2025-03-07 18:02:45','','center_poster','section_1'),(36,'','Group_B','1741370669434-lykos-banner.webp','2025-03-07 18:04:29','2025-03-07 18:04:29','','center_poster','section_3'),(37,'','Group_C','1741371180059-stay-ahead-in-style-banner.webp','2025-03-07 18:13:00','2025-03-07 18:13:00','','center_poster','section_2'),(38,'','Group_C','1741371249652-Blinkers.webp','2025-03-07 18:14:09','2025-03-07 18:14:09','','center_poster','section_3'),(39,'','Group_C','1741371296392-EyePoppin.webp','2025-03-07 18:14:56','2025-03-07 18:14:56','','center_poster','section_4'),(40,'','Group_B','1742650562510-computer-glass-men.webp','2025-03-22 13:36:02','2025-03-22 13:36:02','','first','section_2'),(41,'','Group_B','1742650663607-sunglasses-image.webp','2025-03-22 13:37:43','2025-03-22 13:37:43','','second','section_2'),(42,'','Group_B','1742650696374-prescription-glasses.webp','2025-03-22 13:38:16','2025-03-22 13:38:16','','third','section_2'),(43,'','Group_B','1742650755150-zero-power-glasses.webp','2025-03-22 13:39:15','2025-03-22 13:39:15','','forth','section_2'),(44,'','Group_C','1742650846517-for-men-section.webp','2025-03-22 13:40:46','2025-03-22 13:40:46','','first','section_1'),(45,'','Group_C','1742650892587-for-women-section.webp','2025-03-22 13:41:32','2025-03-22 13:41:32','','second','section_1'),(46,'','Group_C','1742650927294-for-child-section.webp','2025-03-22 13:42:07','2025-03-22 13:42:07','','third','section_1');
/*!40000 ALTER TABLE `carousels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `id` (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id`) REFERENCES `registrations` (`user_id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartitem`
--

DROP TABLE IF EXISTS `cartitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartitem` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `id` (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cartitem_ibfk_1` FOREIGN KEY (`id`) REFERENCES `registrations` (`user_id`),
  CONSTRAINT `cartitem_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitem`
--

LOCK TABLES `cartitem` WRITE;
/*!40000 ALTER TABLE `cartitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cetegories`
--

DROP TABLE IF EXISTS `cetegories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cetegories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categories_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cetegories`
--

LOCK TABLES `cetegories` WRITE;
/*!40000 ALTER TABLE `cetegories` DISABLE KEYS */;
INSERT INTO `cetegories` VALUES (1,'Power Glasses','2025-03-19 16:01:11','2025-03-19 16:01:11'),(2,'Sunglasses','2025-03-19 16:02:19','2025-03-21 17:15:18'),(3,'Screen Saver','2025-03-19 16:02:40','2025-03-19 16:02:40'),(4,'Contact Lenses','2025-03-19 16:03:03','2025-03-19 16:03:03'),(5,'Kids Glasses','2025-03-19 16:03:35','2025-03-20 10:58:11');
/*!40000 ALTER TABLE `cetegories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `color_id` int NOT NULL AUTO_INCREMENT,
  `color_name` varchar(255) NOT NULL,
  `color_code` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`color_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subCetegories_name` varchar(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Face Makeup','Primer',1,'2023-09-26 09:38:02','2023-09-26 09:38:02'),(2,'Face Makeup','Conclear',2,'2023-09-26 09:38:58','2023-09-26 09:38:58'),(3,'Face Makeup','Compact',3,'2023-09-26 09:39:32','2023-09-26 09:39:32'),(4,'Face Makeup','Bluce',4,'2023-09-26 09:39:55','2023-09-26 09:39:55'),(5,'Eyes Makeup','Eye liner',5,'2023-09-26 09:42:01','2023-09-26 09:42:01'),(6,'Eyes Makeup','Eye shadow',6,'2023-09-26 09:47:29','2023-09-26 09:47:29'),(7,'Eyes Makeup','Kajal',7,'2023-09-26 09:48:09','2023-09-26 09:48:09'),(9,'Clensers','Fashwas',14,'2023-09-27 09:00:25','2023-09-27 09:00:25'),(10,'Clensers','Clenser',15,'2023-09-27 09:00:45','2023-09-27 09:00:45'),(11,'Clensers','Facial',16,'2023-09-27 09:01:18','2023-09-27 09:01:18'),(12,'Marks','Sheet Marks',17,'2023-09-27 09:02:18','2023-09-27 09:02:18'),(13,'Marks','Face Marks',18,'2023-09-27 09:02:32','2023-09-27 09:02:32'),(16,'Marks','Face Marks1',22,'2023-11-29 09:57:20','2023-11-29 09:57:20');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lenskartPayments`
--

DROP TABLE IF EXISTS `lenskartPayments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lenskartPayments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `razorpay_order_id` varchar(255) NOT NULL,
  `razorpay_payment_id` varchar(255) NOT NULL,
  `razorpay_signature` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lenskartPayments`
--

LOCK TABLES `lenskartPayments` WRITE;
/*!40000 ALTER TABLE `lenskartPayments` DISABLE KEYS */;
INSERT INTO `lenskartPayments` VALUES (1,'order_PXqeTXPt1OKChR','pay_PXqeyLvUDPDRcH','db8b12f03bb14829359565eb2691d69b3c6c09bfe811bd6678883eef855287fe','2024-12-16 12:30:53','2024-12-16 12:30:53','2024-12-16 12:30:53'),(2,'order_PXrAQ69yHSqnUF','pay_PXrAjD2MVEHcTu','b82289f83190824cf17386258894c775f5c792b54e4d4ba7d1cc161a63f0d911','2024-12-16 13:00:56','2024-12-16 13:00:56','2024-12-16 13:00:56'),(3,'order_PXupjSDaNBgsTJ','pay_PXuqASIbc3EE0w','51070b5133d9f919a4a214a7d97e48a16559e8bcd8dde1be9459747355d6ad79','2024-12-16 16:36:18','2024-12-16 16:36:18','2024-12-16 16:36:18'),(4,'order_PXwH3Iaod7C3Yn','pay_PXwHtlQ94cvEKf','a03f38604a285fc1980279fddc8966f1c10b62ac968b45a322c10826f130a664','2024-12-16 18:01:12','2024-12-16 18:01:12','2024-12-16 18:01:12'),(5,'order_PXwKdX948nK9LG','pay_PXwL08iL6QnhYo','689af18c9191d434416aed7451c99ac806ae50f0f97da5e31110825bff3557e4','2024-12-16 18:04:08','2024-12-16 18:04:08','2024-12-16 18:04:08'),(9,'order_Pbpu0g47ZA1474','pay_PbpuFF1EtQ60M5','fcd94b5b6617983dda8f5100c87178a2f9e6b97c6c492ae71aefa330780e8da6','2024-12-26 14:22:39','2024-12-26 14:22:39','2024-12-26 14:22:39'),(10,'order_PbpwAp3a3nXNJT','pay_PbpwSF56qhdAG3','0fe898cda6dfdba9e2a1ea5aa8eeb351ab484ceec52c3d8b7f82380472ce2b58','2024-12-26 14:24:45','2024-12-26 14:24:45','2024-12-26 14:24:45'),(11,'order_Pbpz6CbmSv0xmP','pay_PbpzFqkkLfpTHX','0d6f0368380c71e5c1ff260de76ff926da1b67822b882df6cfe0b0f96c7d61bd','2024-12-26 14:27:25','2024-12-26 14:27:25','2024-12-26 14:27:25'),(12,'order_Pbq0mk5mG6Lr5W','pay_Pbq1C0yyNX4611','7a45d5e21c43ffd57620687900880b7bdc14abb4c68ddf9cb4465183b2c7f810','2024-12-26 14:29:14','2024-12-26 14:29:14','2024-12-26 14:29:14'),(14,'order_PbqGxACbCQfQeq','pay_PbqH50yalj6bR8','c8c30ae0ce53f5b6e16d2e236da4d27b345bf0162ea8b47ea7a3bbbeda94e95e','2024-12-26 14:44:17','2024-12-26 14:44:17','2024-12-26 14:44:17'),(15,'order_Pbs0vKyvcDyIHg','pay_Pbs12dtmAvEVXx','274f94b6cdb3d7526368ba5d571e31ac6d91d3e155a7151f20ac6b344cd9e217','2024-12-26 16:26:29','2024-12-26 16:26:29','2024-12-26 16:26:29'),(16,'order_Pbs6u3QZaMwZFj','pay_Pbs74kb4s78QZt','067b12174c13617ee52eb48af72bcc1d6843ad585372e430c043016a197415c4','2024-12-26 16:32:12','2024-12-26 16:32:12','2024-12-26 16:32:12'),(17,'order_Pbs9ziUaMTr1E4','pay_PbsA93YUUYKznn','e4bbf60e43ac7e2adc276a689115a7ad8c4644d7f71edfafdefafe534d3a54e3','2024-12-26 16:35:06','2024-12-26 16:35:06','2024-12-26 16:35:06'),(18,'order_PbsJQvhSfkWE1H','pay_PbsJYZqVFcpjcC','cf6c34da34910694c25a86feff6405390cd75aeff272463cec1d36debaf28cf5','2024-12-26 16:44:01','2024-12-26 16:44:01','2024-12-26 16:44:01'),(19,'order_PbsM23mhxI7zyf','pay_PbsMAAwfXBYylO','c739d32863348fdf79902f9d2aeb798068110226e75632caf4abc3ac86529941','2024-12-26 16:46:29','2024-12-26 16:46:29','2024-12-26 16:46:29'),(20,'order_PbsN7xkFonZSiI','pay_PbsNFoF5eYPx2G','6feb84f5daabd93373f0f57f1ff6bc5cd15c6e35516214dcdd3d039cffd55b84','2024-12-26 16:47:31','2024-12-26 16:47:31','2024-12-26 16:47:31'),(21,'order_PcAETjbgRVD7Xa','pay_PcAFSRRUfrqUYY','22712de576bb8587236395a9f5739aadb25ab66bd73cffbd5275c51910a8c470','2024-12-27 10:16:36','2024-12-27 10:16:36','2024-12-27 10:16:36'),(22,'order_PcAGh3EejPvgOC','pay_PcAGwjS2KFEXnH','151282b2b2a6c4f1ebc67bc376285c4434526ec852640094e056b5ba8277e3a6','2024-12-27 10:18:01','2024-12-27 10:18:01','2024-12-27 10:18:01'),(23,'order_PcAQlvplH16HI6','pay_PcAR7kUJutQ5vp','a2548be63fa342dcefb78238517688a6fa984d51145becceb8af5f03988ddb01','2024-12-27 10:27:39','2024-12-27 10:27:39','2024-12-27 10:27:39'),(24,'order_PcAS9TlOnuVIa5','pay_PcASWe564QfURj','77f0f647f7d857ea559105b7053de525764ccd79c930569f6605588de4e63ce7','2024-12-27 10:28:59','2024-12-27 10:28:59','2024-12-27 10:28:59'),(25,'order_PcFkainbhnrf8X','pay_PcFlDy6Jck8heE','281137437bf8ff6666c7ba56307cc5cfa690ca3c2c1cc4437d5109df8c0dfc3a','2024-12-27 15:40:08','2024-12-27 15:40:08','2024-12-27 15:40:08'),(26,'order_PcGBtgg5sNclzg','pay_PcGCCzXogWYeNs','31e4b1e10d5fdf77584a505e558efdaa553d33f50bbc02939a5b71284aa194e6','2024-12-27 16:05:41','2024-12-27 16:05:41','2024-12-27 16:05:41'),(27,'order_PcckC2kQrppKtJ','pay_PcckOj9xXj7xor','a5d156a1f325eb637bc79698df6e0da501ba215c1523e199e337f0385d3249b1','2024-12-28 14:09:19','2024-12-28 14:09:19','2024-12-28 14:09:19'),(28,'order_PdhTxnAUazGec2','pay_PdhUsVDV3QQbTq','71bb13eef9aeb8ca621543e59f1eab731bdd3d23c278d5a6bec47b113f6f6c86','2024-12-31 07:27:06','2024-12-31 07:27:06','2024-12-31 07:27:06'),(29,'order_Pdk8K7RGGO75hB','pay_Pdk8wGZH2qgCSB','ec32f469914d0e5e8f51b67d19b118979fc03646e1f57367c3ac34a59bcafbef','2024-12-31 10:02:25','2024-12-31 10:02:25','2024-12-31 10:02:25'),(30,'order_PdkFjMwXSv8vol','pay_PdkG7rmH90MfJQ','c412c5fdbce62df4dc9593137e2582b4d0e8b61405d0529c41f4c38a4de85433','2024-12-31 10:09:13','2024-12-31 10:09:13','2024-12-31 10:09:13'),(31,'order_PdqQ2ngAag6Az6','pay_PdqQJwBJBfMKSN','3bb0a21e7dc75985695aac3b98bdf359a9309c76fa31ac882679d1e36db92aa5','2024-12-31 16:11:02','2024-12-31 16:11:02','2024-12-31 16:11:02'),(32,'order_PdqSJ5qrNLV7i3','pay_PdqSYz2oNFAiQa','6f430e87ee6d73585c45f31373d3cd24dc3daad05669fd7976672b28379237ef','2024-12-31 16:13:10','2024-12-31 16:13:10','2024-12-31 16:13:10'),(33,'order_PwpJDWoaQsE1Ra','pay_PwpJUEqRFZHuvu','46448927fbe9d673c7df29d8ea95b1eeaa4396b9d1d16309d973af1969b81ea2','2025-02-17 15:26:54','2025-02-17 15:26:54','2025-02-17 15:26:54'),(34,'order_PwpKXzN8bDsBTr','pay_PwpKl8oBxmqEkl','a11adb210e351da75546936f3ac9561afedb8944cd71ac139fa36b41582b85a4','2025-02-17 15:28:06','2025-02-17 15:28:06','2025-02-17 15:28:06'),(43,'order_QHObc4AlOxezol','pay_QHObji25PTsg81','61dff472c633b7038da0bd79d6eb953b1a2e636b71a97861438bc10ae3c6d1de','2025-04-10 14:58:29','2025-04-10 14:58:29','2025-04-10 14:58:29'),(44,'order_QHkx6PrIZ39J6k','pay_QHkxPFwmNcCJYU','5600163e868eb87f6897604718654839e1ad78038a1d985217b751290f331a30','2025-04-11 12:50:15','2025-04-11 12:50:15','2025-04-11 12:50:15'),(45,'order_QIEcq9wvoK4R1c','pay_QIEd0bFRXX3q6T','99397d555b634a29258bee8e245f7c5b1e1f38c7cdae94bb33f37140e5b2c31a','2025-04-12 17:51:45','2025-04-12 17:51:45','2025-04-12 17:51:45'),(46,'order_QK7omedAOdMXVC','pay_QK7p2rLFmy2TiR','2df59395e00caefc409ea27443096c02e143d43e7e4b5529d335c7ebd8e85c1a','2025-04-17 12:30:18','2025-04-17 12:30:18','2025-04-17 12:30:18'),(47,'order_QK8wf5UWodxPXl','pay_QK8x3nGzfHeXze','c40a08093c8c5ce5807d055bfdb5bd5579c51d429bbbc7e51b4df167b112a5ed','2025-04-17 13:36:34','2025-04-17 13:36:34','2025-04-17 13:36:34'),(48,'order_QKDnp1PgdcortB','pay_QKDoAFdQrHoATL','2c38d0ab5443f7a7f391e582fd085bfeba53bf8af041eacab53fd85c2f4445f6','2025-04-17 18:21:38','2025-04-17 18:21:38','2025-04-17 18:21:38'),(49,'order_QKDrpmSswZHi2q','pay_QKDs0OJ2E98CgA','d55e35edc7447836bffb087fe8007caab5e3150f735d27fc042fe5aa23c469b0','2025-04-17 18:25:17','2025-04-17 18:25:17','2025-04-17 18:25:17'),(50,'order_QKWc7xDGUPrLhe','pay_QKWcZ5asNzrmVG','0e7045d98e2274990c9492de6d89c7df0cd0176e767850e90ab360b6bdef91e5','2025-04-18 12:45:49','2025-04-18 12:45:49','2025-04-18 12:45:49'),(51,'order_QKX1SjsfVGaxzR','pay_QKX1wmdKlmBuDk','4c4504ff0f4ae76e2dbbd405c08aeed1fcdd5c2a28a6576addfd66e8c82e9eab','2025-04-18 13:09:51','2025-04-18 13:09:51','2025-04-18 13:09:51'),(52,'order_QKvrN32eGBGTLI','pay_QKvrj3IbirbyIK','e3ad625207236a024943c2fc5ff5e87d8a3e48f9f347b34b00ac225764a309fa','2025-04-19 13:27:31','2025-04-19 13:27:31','2025-04-19 13:27:31'),(53,'order_QKw5flXTHEGE5W','pay_QKw5rni341fH0S','390ab724e55fb389ed42ef59879ce951643ceda1f61f7aa72012468b208c1aba','2025-04-19 13:40:54','2025-04-19 13:40:54','2025-04-19 13:40:54'),(54,'order_QKztI1wC9QoAx2','pay_QKztTFRA6ni8q9','700598a49b5a050e6764bf1bab5e56473741ba7681bef9408ca072dd2c9518e1','2025-04-19 17:23:54','2025-04-19 17:23:54','2025-04-19 17:23:54'),(55,'order_QL0twOpXB1oBqP','pay_QL0uAh9pmgh2Oc','f9b2aac1f14107d1214653a4e4bade7528ea89f5c7c16c6a8805c756c3be25bc','2025-04-19 18:23:17','2025-04-19 18:23:17','2025-04-19 18:23:17'),(56,'order_QL0vIofnZEcvTb','pay_QL0vSUKkYfq5oa','9a62a2bb0adc84b934cefffc0b4dc58c2d68c8d33a79d42cb36da68c6fc80d3c','2025-04-19 18:24:31','2025-04-19 18:24:31','2025-04-19 18:24:31');
/*!40000 ALTER TABLE `lenskartPayments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offer`
--

DROP TABLE IF EXISTS `offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offer` (
  `offer_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `discountType` varchar(255) NOT NULL,
  `discountValue` float NOT NULL,
  `termsAndConditions` text NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`offer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offer`
--

LOCK TABLES `offer` WRITE;
/*!40000 ALTER TABLE `offer` DISABLE KEYS */;
INSERT INTO `offer` VALUES (1,'raaz','fdgfdgdffdgdgdfgfg','buy-one-get-one',20,'dsjjshhjhjd',1),(2,'raaz1','fdgfdgdffdgdgdfgfg','buy-one-get-one',10,'dsjjshhjhjd',1),(3,'raaz5','hk;oihknjb.jbv','buy-one-get-one',20,'dsjjshhjhjd',1),(4,'raaz5','n.kjkkk;l;\';>\",.mn,b','buy-one-get-one',23,'dsjjshhjhjd',1);
/*!40000 ALTER TABLE `offer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderItems`
--

DROP TABLE IF EXISTS `orderItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderItems` (
  `orderItemId` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `orderId` varchar(255) NOT NULL,
  `product_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`orderItemId`),
  KEY `orderId` (`orderId`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orderItems_ibfk_5` FOREIGN KEY (`orderId`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderItems_ibfk_6` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderItems`
--

LOCK TABLES `orderItems` WRITE;
/*!40000 ALTER TABLE `orderItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitems` (
  `orderItemId` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `orderId` varchar(255) NOT NULL,
  `product_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`orderItemId`),
  KEY `orderId` (`orderId`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orderitems_ibfk_379` FOREIGN KEY (`orderId`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderitems_ibfk_380` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` varchar(255) NOT NULL,
  `CustomerAddress` json NOT NULL,
  `PaymentMethod` varchar(50) NOT NULL,
  `TransactionID` varchar(100) NOT NULL,
  `PaymentStatus` varchar(20) NOT NULL,
  `OrderStatus` varchar(20) NOT NULL,
  `shipped` tinyint(1) DEFAULT '0',
  `delivered` tinyint(1) DEFAULT '0',
  `ShippingCost` decimal(10,2) NOT NULL,
  `TrackingNumber` varchar(50) NOT NULL,
  `ExpectedDeliveryDate` datetime NOT NULL,
  `OrderDate` datetime NOT NULL,
  `TotalAmount` decimal(10,2) NOT NULL,
  `DiscountAmount` decimal(10,2) DEFAULT NULL,
  `user_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `registrationUserId` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `registrationUserId` (`registrationUserId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `registrations` (`user_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`registrationUserId`) REFERENCES `registrations` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('AVIK-52-384128','{\"city\": \"patna\", \"state\": \"Bihar\", \"address\": \"parsa\", \"pincode\": 804450, \"user_id\": 1, \"landmark\": \"01\", \"createdAt\": \"2023-11-21T11:05:01.000Z\", \"updatedAt\": \"2023-11-21T11:05:01.000Z\", \"mobile_num\": 9110189252, \"address_type\": \"Home\", \"addresses_id\": 22, \"contact_name\": \"Raj\", \"house_flat_office_no\": \"01\"}','upi','ph12356748','confirmed','confirmed',0,0,0.00,'4567894321','2023-12-18 11:30:12','2023-12-18 11:30:12',75.00,25.00,1,'2023-12-11 11:30:12','2023-12-11 11:30:12',NULL),('AVIK-64629-55381','{\"city\": \"patna\", \"state\": \"Bihar\", \"address\": \"parsa\", \"pincode\": 804450, \"user_id\": 1, \"landmark\": \"01\", \"createdAt\": \"2023-11-21T11:05:01.000Z\", \"updatedAt\": \"2023-11-21T11:05:01.000Z\", \"mobile_num\": 9110189252, \"address_type\": \"Home\", \"addresses_id\": 22, \"contact_name\": \"Raj\", \"house_flat_office_no\": \"01\"}','upi','ph12356748','confirmed','confirmed',0,0,0.00,'4567894321','2023-12-18 11:38:44','2023-12-18 11:38:44',75.00,25.00,1,'2023-12-11 11:38:44','2023-12-11 11:38:44',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_offer`
--

DROP TABLE IF EXISTS `product_offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_offer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `offerId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_offer`
--

LOCK TABLES `product_offer` WRITE;
/*!40000 ALTER TABLE `product_offer` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_offer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productoffer`
--

DROP TABLE IF EXISTS `productoffer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productoffer` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `offerId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`offerId`,`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productoffer`
--

LOCK TABLES `productoffer` WRITE;
/*!40000 ALTER TABLE `productoffer` DISABLE KEYS */;
INSERT INTO `productoffer` VALUES ('2023-12-18 06:43:06','2023-12-18 06:43:06',1,11),('2023-12-18 06:43:06','2023-12-18 06:43:06',1,12),('2023-12-18 07:09:09','2023-12-18 07:09:09',2,14),('2023-12-18 07:09:09','2023-12-18 07:09:09',2,15),('2023-12-19 04:07:30','2023-12-19 04:07:30',3,15),('2023-12-19 04:07:30','2023-12-19 04:07:30',3,16),('2023-12-19 04:07:30','2023-12-19 04:07:30',3,17),('2023-12-19 04:09:28','2023-12-19 04:09:28',4,18),('2023-12-19 04:09:28','2023-12-19 04:09:28',4,19),('2023-12-19 04:09:28','2023-12-19 04:09:28',4,20);
/*!40000 ALTER TABLE `productoffer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_categories` varchar(255) DEFAULT NULL,
  `brand_name` varchar(255) DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL,
  `product_title` varchar(255) DEFAULT NULL,
  `product_description` text,
  `product_price` int DEFAULT NULL,
  `product_thumnail_img` varchar(255) DEFAULT NULL,
  `product_ad` tinyint(1) DEFAULT NULL,
  `count_in_stock` int DEFAULT '0',
  `offer` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `ideal_for` json DEFAULT NULL,
  `product_work_for` json DEFAULT NULL,
  `highlights` varchar(255) DEFAULT NULL,
  `product_expiry_date` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `product_all_img` json DEFAULT NULL,
  `frem_type` varchar(45) DEFAULT NULL,
  `frame_shape` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `frameColor` varchar(250) DEFAULT NULL,
  `lenshColor` varchar(250) DEFAULT NULL,
  `frameDescription` varchar(250) DEFAULT NULL,
  `lensInformation` varchar(250) DEFAULT NULL,
  `frameMaterial` varchar(45) DEFAULT NULL,
  `templeColor` varchar(45) DEFAULT NULL,
  `video_url` varchar(250) DEFAULT NULL,
  `video_thumbnail` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (41,'','',NULL,'','Vincent Chase Polarized','',595,'uploads/1730134631349-RJP_0422.JPG',0,5,'',NULL,20,NULL,NULL,'amazing screen glases',NULL,'2024-10-28 16:57:11','2024-10-28 16:57:11','[\"uploads/1730134631235-RJP_0418.JPG\", \"uploads/1730134631249-RJP_0420.JPG\", \"uploads/1730134631265-RJP_0422.JPG\", \"uploads/1730134631281-RJP_0423.JPG\", \"uploads/1730134631301-RJP_0424.JPG\"]','fullrim','Aviator','men','[{\"DarkRed\":\"#8B0000\"},{\"Black\":\"#000\"}]','Blue','Black',NULL,NULL,'fiber',NULL,'uploads/1748601710102-sunglasses.mp4','uploads/1748624066537-thumbnail.png'),(42,'','',NULL,'','Vincent Chase Polarized','',1300,'uploads/1730135080465-RJP_0597.JPG',0,4,'',NULL,20,NULL,NULL,'amazing eye glases',NULL,'2024-10-28 17:04:40','2024-10-28 17:04:40','[\"uploads/1730135080358-RJP_0595.JPG\", \"uploads/1730135080370-RJP_0596.JPG\", \"uploads/1730135080383-RJP_0597.JPG\", \"uploads/1730135080398-RJP_0598.JPG\", \"uploads/1730135080445-RJP_0599.JPG\"]','halfrim','cats eye','kids','[{\"DarkRed\":\"#8B0000\"}]','Black','Brown',NULL,NULL,'fiber',NULL,'uploads/1748601710102-sunglasses.mp4','uploads/1748601710119-thumbnail.png'),(43,'','',NULL,'','Vincent Chase Polarized','',2100,'uploads/1730135341347-RJP_0503.JPG',0,0,'',NULL,20,NULL,NULL,'amazing eye glases',NULL,'2024-10-28 17:09:01','2024-10-28 17:09:01','[\"uploads/1730135341232-RJP_0498.JPG\", \"uploads/1730135341250-RJP_0499.JPG\", \"uploads/1730135341272-RJP_0501.JPG\", \"uploads/1730135341287-RJP_0502.JPG\", \"uploads/1730135341309-RJP_0503.JPG\"]','rim less','square','men','[{\"DarkRed\":\"#8B0000\"}]','Brown','Green',NULL,NULL,'fiber',NULL,'uploads/1748601710102-sunglasses.mp4','uploads/1748601710119-thumbnail.png'),(44,'','',NULL,'','John Jacobs','',999,'uploads/1730135526441-RJP_0503.JPG',0,2,'',NULL,20,NULL,NULL,'amazing eye glases',NULL,'2024-10-28 17:12:06','2024-10-28 17:12:06','[\"uploads/1730135526336-RJP_0405.JPG\", \"uploads/1730135526349-RJP_0406.JPG\", \"uploads/1730135526363-RJP_0408.JPG\", \"uploads/1730135526379-RJP_0410.JPG\", \"uploads/1730135526401-RJP_0413.JPG\"]','half rim','Rectangle','men','[{\"DarkRed\":\"#8B0000\"}]','Green','Gray',NULL,NULL,'fiber',NULL,NULL,NULL),(45,'','',NULL,'','John Jacobs','',899,'uploads/1730135627843-RJP_0640.JPG',0,6,'',NULL,20,NULL,NULL,'amazing eye glases',NULL,'2024-10-28 17:13:47','2024-10-28 17:13:47','[\"uploads/1730135627737-RJP_0638.JPG\", \"uploads/1730135627750-RJP_0639.JPG\", \"uploads/1730135627785-RJP_0640.JPG\", \"uploads/1730135627802-RJP_0641.JPG\", \"uploads/1730135627822-RJP_0642.JPG\"]','full rim','wayfarer','kids','[{\"DarkRed\":\"#8B0000\"}]','Gray','Orange',NULL,NULL,'still',NULL,NULL,NULL),(59,'','',NULL,'','John Jacobs','',1500,'uploads/1738236979026-RJP_0652.JPG',0,3,'',NULL,20,NULL,NULL,'amazing eye glases',NULL,'2025-01-30 11:36:19','2025-01-30 11:36:19','[\"uploads/1738236978906-RJP_0649.JPG\", \"uploads/1738236978946-RJP_0650.JPG\", \"uploads/1738236978973-RJP_0653.JPG\", \"uploads/1738236979001-RJP_0651.JPG\"]','Square','Helius Eyewear','unisex','[{\"DarkRed\":\"#8B0000\"}]','Red','Gold',NULL,NULL,'still',NULL,'uploads/1748601710102-sunglasses.mp4','uploads/1748601710119-thumbnail.png'),(62,'','',NULL,'','Eye Zones Studio','',1500,'uploads/1739203083520-RJP_0652.JPG',0,3,'',NULL,20,NULL,NULL,'amazing eye glases',NULL,'2025-02-10 15:58:03','2025-02-10 15:58:03','[\"uploads/1739203083441-RJP_0649.JPG\", \"uploads/1739203083462-RJP_0650.JPG\", \"uploads/1739203083479-RJP_0653.JPG\", \"uploads/1739203083497-RJP_0651.JPG\"]','Square','Helius Eyewear','men','[{\"DarkRed\":\"#8B0000\"}]','Orange','Violet','amazing eye glases','amazing eye glases','still','',NULL,NULL),(68,'','',NULL,'','Eye Zones Studio','',1500,'uploads/1739378238101-RJP_0652.JPG',0,7,'',NULL,20,NULL,NULL,'amazing eye glases',NULL,'2025-02-12 16:37:18','2025-02-12 16:37:18','[\"uploads/1739378238034-RJP_0649.JPG\", \"uploads/1739378238051-RJP_0650.JPG\", \"uploads/1739378238066-RJP_0653.JPG\", \"uploads/1739378238081-RJP_0651.JPG\"]','Square','Helius Eyewear','men','[{\"DarkRed\":\"#8B0000\"}]','Purple','Gold','amazing eye glases','amazing eye glases','still','','uploads/1748601710102-sunglasses.mp4','uploads/1748601710119-thumbnail.png'),(69,'','',NULL,'','Eye Zones Studio','',1500,'uploads/1739534245201-RJP_0652.JPG',0,8,'',NULL,20,NULL,NULL,'amazing eye glases',NULL,'2025-02-14 11:57:25','2025-02-14 11:57:25','[\"uploads/1739534245090-RJP_0649.JPG\", \"uploads/1739534245116-RJP_0650.JPG\", \"uploads/1739534245147-RJP_0653.JPG\", \"uploads/1739534245181-RJP_0651.JPG\"]','Square','Helius Eyewear','women','[{\"DarkRed\":\"#8B0000\"}]','Gold','Yellow','amazing eye glases','amazing eye glases','still','',NULL,NULL),(78,'','',NULL,'','Eye Zones Studio','',2300,'uploads/1748601710076-RJP_0652.JPG',0,3,'',NULL,20,NULL,NULL,'amazing eye glases',NULL,'2025-05-30 10:41:50','2025-05-30 10:41:50','[\"uploads/1748601709996-RJP_0649.JPG\", \"uploads/1748601710019-RJP_0650.JPG\", \"uploads/1748601710037-RJP_0653.JPG\", \"uploads/1748601710053-RJP_0651.JPG\"]','Square','Helius Eyewear','For Men','[{\"DarkRed\":\"#8B0000\"}]','Yellow','Blue','amazing eye glases','amazing eye glases','amazing eye glases','','uploads/1748601710102-sunglasses.mp4','uploads/1748601710119-thumbnail.png'),(79,'','',NULL,'','Eye Zones Studio','',2300,'uploads/1748624066480-RJP_0652.JPG',0,3,'',NULL,10,NULL,NULL,'amazing eye glases',NULL,'2025-05-30 16:54:26','2025-05-30 16:54:26','[\"uploads/1748624066364-RJP_0649.JPG\", \"uploads/1748624066389-RJP_0650.JPG\", \"uploads/1748624066407-RJP_0653.JPG\", \"uploads/1748624066436-RJP_0651.JPG\"]','Square','Helius Eyewear','For Men','[{\"DarkRed\":\"#8B0000\"}]','Yellow','Blue','amazing eye glases','amazing eye glases','amazing eye glases','','uploads/1748624066504-sunglasses.mp4','uploads/1748624066537-thumbnail.png'),(80,'','',NULL,'','hjkjkkjkj','',6778,'uploads/1748874608851-Screen Shot 2025-05-15 at 5.49.27 PM.png',0,2,'',NULL,6,NULL,NULL,'ghgjghjjh',NULL,'2025-06-02 14:30:08','2025-06-02 14:30:08','[\"uploads/1748874608814-Screen Shot 2025-05-15 at 5.49.27 PM.png\", \"uploads/1748874608823-Screen Shot 2025-05-15 at 5.31.44 PM.png\", \"uploads/1748874608839-Screen Shot 2025-05-19 at 7.05.07 PM.png\", \"uploads/1748874608844-Screen Shot 2025-05-19 at 11.16.18 PM.png\"]','Cats Eye','Full Rim Rectangle','For Women','[]','Gold','Blue','hgvfhfgghkkhghjhghb,','cjjfggjhhhhggh','jbhhj','','uploads/1748874608867-sunglasses.mp4','uploads/1748874608889-thumbnail.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registrations` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'GUEST',
  `mobile_num` varchar(255) NOT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `mobile_num` (`mobile_num`),
  UNIQUE KEY `mobile_num_2` (`mobile_num`),
  UNIQUE KEY `mobile_num_3` (`mobile_num`),
  UNIQUE KEY `mobile_num_4` (`mobile_num`),
  UNIQUE KEY `mobile_num_5` (`mobile_num`),
  UNIQUE KEY `mobile_num_6` (`mobile_num`),
  UNIQUE KEY `mobile_num_7` (`mobile_num`),
  UNIQUE KEY `mobile_num_8` (`mobile_num`),
  UNIQUE KEY `mobile_num_9` (`mobile_num`),
  UNIQUE KEY `mobile_num_10` (`mobile_num`),
  UNIQUE KEY `mobile_num_11` (`mobile_num`),
  UNIQUE KEY `mobile_num_12` (`mobile_num`),
  UNIQUE KEY `mobile_num_13` (`mobile_num`),
  UNIQUE KEY `mobile_num_14` (`mobile_num`),
  UNIQUE KEY `mobile_num_15` (`mobile_num`),
  UNIQUE KEY `mobile_num_16` (`mobile_num`),
  UNIQUE KEY `mobile_num_17` (`mobile_num`),
  UNIQUE KEY `mobile_num_18` (`mobile_num`),
  UNIQUE KEY `mobile_num_19` (`mobile_num`),
  UNIQUE KEY `mobile_num_20` (`mobile_num`),
  UNIQUE KEY `mobile_num_21` (`mobile_num`),
  UNIQUE KEY `mobile_num_22` (`mobile_num`),
  UNIQUE KEY `mobile_num_23` (`mobile_num`),
  UNIQUE KEY `mobile_num_24` (`mobile_num`),
  UNIQUE KEY `mobile_num_25` (`mobile_num`),
  UNIQUE KEY `mobile_num_26` (`mobile_num`),
  UNIQUE KEY `mobile_num_27` (`mobile_num`),
  UNIQUE KEY `mobile_num_28` (`mobile_num`),
  UNIQUE KEY `mobile_num_29` (`mobile_num`),
  UNIQUE KEY `mobile_num_30` (`mobile_num`),
  UNIQUE KEY `mobile_num_31` (`mobile_num`),
  UNIQUE KEY `mobile_num_32` (`mobile_num`),
  UNIQUE KEY `mobile_num_33` (`mobile_num`),
  UNIQUE KEY `mobile_num_34` (`mobile_num`),
  UNIQUE KEY `mobile_num_35` (`mobile_num`),
  UNIQUE KEY `mobile_num_36` (`mobile_num`),
  UNIQUE KEY `mobile_num_37` (`mobile_num`),
  UNIQUE KEY `mobile_num_38` (`mobile_num`),
  UNIQUE KEY `mobile_num_39` (`mobile_num`),
  UNIQUE KEY `mobile_num_40` (`mobile_num`),
  UNIQUE KEY `mobile_num_41` (`mobile_num`),
  UNIQUE KEY `mobile_num_42` (`mobile_num`),
  UNIQUE KEY `mobile_num_43` (`mobile_num`),
  UNIQUE KEY `mobile_num_44` (`mobile_num`),
  UNIQUE KEY `mobile_num_45` (`mobile_num`),
  UNIQUE KEY `mobile_num_46` (`mobile_num`),
  UNIQUE KEY `mobile_num_47` (`mobile_num`),
  UNIQUE KEY `mobile_num_48` (`mobile_num`),
  UNIQUE KEY `mobile_num_49` (`mobile_num`),
  UNIQUE KEY `mobile_num_50` (`mobile_num`),
  UNIQUE KEY `mobile_num_51` (`mobile_num`),
  UNIQUE KEY `mobile_num_52` (`mobile_num`),
  UNIQUE KEY `mobile_num_53` (`mobile_num`),
  UNIQUE KEY `mobile_num_54` (`mobile_num`),
  UNIQUE KEY `mobile_num_55` (`mobile_num`),
  UNIQUE KEY `mobile_num_56` (`mobile_num`),
  UNIQUE KEY `mobile_num_57` (`mobile_num`),
  UNIQUE KEY `mobile_num_58` (`mobile_num`),
  UNIQUE KEY `mobile_num_59` (`mobile_num`),
  UNIQUE KEY `mobile_num_60` (`mobile_num`),
  UNIQUE KEY `mobile_num_61` (`mobile_num`),
  UNIQUE KEY `mobile_num_62` (`mobile_num`),
  UNIQUE KEY `mobile_num_63` (`mobile_num`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrations`
--

LOCK TABLES `registrations` WRITE;
/*!40000 ALTER TABLE `registrations` DISABLE KEYS */;
INSERT INTO `registrations` VALUES (1,'GUEST','09110189245',NULL,NULL,NULL,'2023-09-14 09:29:46','2023-09-14 09:29:46'),(2,'GUEST','9110189245',NULL,NULL,NULL,'2023-09-14 09:34:30','2023-09-14 09:34:30'),(3,'GUEST','9110189280',NULL,NULL,NULL,'2024-10-30 17:51:21','2024-10-30 17:51:21'),(4,'GUEST','9110189246',NULL,NULL,NULL,'2025-04-09 12:51:35','2025-04-09 12:51:35');
/*!40000 ALTER TABLE `registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` float NOT NULL,
  `review_title` varchar(255) NOT NULL,
  `review_comment` varchar(255) NOT NULL,
  `review_img` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `review_ibfk_100` FOREIGN KEY (`user_id`) REFERENCES `registrations` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_99` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller`
--

DROP TABLE IF EXISTS `seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller` (
  `seller_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) DEFAULT NULL,
  `brand_name` varchar(255) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `brand_usp` varchar(255) DEFAULT NULL,
  `marketplaces` varchar(255) DEFAULT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`seller_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller`
--

LOCK TABLES `seller` WRITE;
/*!40000 ALTER TABLE `seller` DISABLE KEYS */;
INSERT INTO `seller` VALUES (1,'softgenics','testing','mishra74881@gmial.com','Makeup, Skin Care, Hair, Appliances, Fragrance, Men\'s Personal Care, Accessories','testing','Nykaa, Myntra, Amazon, Flipkart','568374658','873568','$2b$08$ZbR5jHSM/c/ii8xSa1F62eV.FO8HSxARAH3lyqjK5Xsa2rOaF9Ng6',1),(2,'flipcard','kargo','mishra74881@gmail.com','Makeup, Skin Care, Appliances','mama earth','Nykaa, Myntra, Amazon, Flipkart','Ayush','8709345226','$2b$08$LZLMpL4tK0wtrICY/RjepuoiqogAVu8.t1x8WB6rV1pxnYNV7YwQG',1),(3,'raj','garniar','softgenic.raj123@gmail.com','Makeup, Skin Care','hhhhhh','Nykaa, Myntra','raj','09110189245','$2b$08$qeBLpEgR8cDryg7YRgz9vOLRFPT5IuK15PgauIwNT0CJPETYuo6ze',1),(4,'ragonline','kargo, lenin','mishra74881@gmail.com@gmail.com','Makeup, Skin Care, Hair, Accessories','no','Nykaa, Amazon','niraj','8709345226',NULL,0);
/*!40000 ALTER TABLE `seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sliders`
--

DROP TABLE IF EXISTS `sliders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sliders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slider_link` varchar(255) NOT NULL,
  `slider_name` varchar(255) NOT NULL,
  `slider_url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `description_slider` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sliders`
--

LOCK TABLES `sliders` WRITE;
/*!40000 ALTER TABLE `sliders` DISABLE KEYS */;
INSERT INTO `sliders` VALUES (1,'Aviator','banner','1745502673808-fasttrack.png','2025-04-24 13:51:13','2025-04-24 13:51:13',NULL),(2,'Aviator','banner','1745504087825-sbi_card.png','2025-04-24 14:14:47','2025-04-24 14:14:47',NULL),(3,'Sunglasses','banner','1745504109032-fasttrack_sunglasses.png','2025-04-24 14:15:09','2025-04-24 14:15:09',NULL),(4,'Sunglasses','banner','1745504187675-tees_by_fasttrack.png','2025-04-24 14:16:27','2025-04-24 14:16:27',NULL),(5,'Sunglasses','banner','1745504267760-titen_or_fasttrack.png','2025-04-24 14:17:47','2025-04-24 14:17:47',NULL),(6,'Avaitor','banner','1745504326288-titen_sing.png','2025-04-24 14:18:46','2025-04-24 14:18:46',NULL),(7,'Avaitor','banner','1745504338733-tees_by_fasttrack.png','2025-04-24 14:18:58','2025-04-24 14:18:58',NULL),(8,'Sunglasses Styles For Men','product_image','1745513958986-Screen Shot 2025-04-24 at 6.23.26 PM.png','2025-04-24 16:59:18','2025-05-26 13:01:35',NULL),(9,'Sunglasses Styles For Women','product_image','1745513985214-Screen Shot 2025-04-24 at 6.24.14 PM.png','2025-04-24 16:59:45','2025-05-26 13:02:51',NULL),(10,'Sunglasses Styles For Men','product_image','1745514014870-Screen Shot 2025-04-24 at 6.24.50 PM.png','2025-04-24 17:00:14','2025-05-26 13:01:47',NULL),(11,'Sunglasses Styles For Men','product_image','1745514070274-Screen Shot 2025-04-24 at 6.25.22 PM.png','2025-04-24 17:01:10','2025-05-26 13:02:12',NULL),(12,'Sunglasses Styles For Women','product_image','1745514117701-Screen Shot 2025-04-24 at 6.26.19 PM.png','2025-04-24 17:01:57','2025-05-26 13:02:39',NULL),(13,'Sunglasses Styles For Men','product_image','1745514132348-Screen Shot 2025-04-24 at 6.26.52 PM.png','2025-04-24 17:02:12','2025-05-26 13:01:59',NULL),(14,'Power Glass','top_mini_image','1748432776133-sunglasses1.png','2025-05-23 15:05:19','2025-05-28 11:46:16',NULL),(15,'Power Sunglasses','top_mini_image','1748012791455-sunglasses3.png','2025-05-23 15:06:31','2025-05-23 15:06:31',NULL),(16,'Screen Saver','top_mini_image','1748012840456-sunglasses5.png','2025-05-23 15:07:20','2025-05-23 15:07:20',NULL),(17,'Sunglasses','top_mini_image','1748012888265-sunglasses2.jpg','2025-05-23 15:08:08','2025-05-23 15:08:08',NULL),(18,'Contact Lenses','top_mini_image','1748012972130-sunglasses4.png','2025-05-23 15:09:32','2025-05-23 15:09:32',NULL);
/*!40000 ALTER TABLE `sliders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subCetegories`
--

DROP TABLE IF EXISTS `subCetegories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subCetegories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categories_name` varchar(255) NOT NULL,
  `subCetegories_name` varchar(255) NOT NULL,
  `subCetegories_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subCetegories`
--

LOCK TABLES `subCetegories` WRITE;
/*!40000 ALTER TABLE `subCetegories` DISABLE KEYS */;
INSERT INTO `subCetegories` VALUES (1,'Makeup','Face Makeup',90,'2024-05-13 13:40:12','2024-05-13 13:40:12'),(2,'Makeup','Eyes Makeup',91,'2024-05-13 13:41:41','2024-05-13 13:41:41'),(3,'Makeup','Skin Care',93,'2024-05-13 13:42:20','2024-05-13 13:42:20'),(4,'Makeup','Hair Care',94,'2024-05-13 13:42:57','2024-05-13 13:42:57');
/*!40000 ALTER TABLE `subCetegories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcetegories`
--

DROP TABLE IF EXISTS `subcetegories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcetegories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categories_name` varchar(255) NOT NULL,
  `subCetegories_name` varchar(255) NOT NULL,
  `subCetegories_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subCetegories_id_UNIQUE` (`subCetegories_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcetegories`
--

LOCK TABLES `subcetegories` WRITE;
/*!40000 ALTER TABLE `subcetegories` DISABLE KEYS */;
INSERT INTO `subcetegories` VALUES (1,'Makeup','Face Makeup',201,'2023-09-26 04:47:44','2023-09-26 04:47:44'),(2,'Makeup','Eyes Makeup',202,'2023-09-26 04:49:10','2023-09-26 04:49:10'),(3,'Makeup','Lip Makeup',204,'2023-09-26 04:49:28','2023-09-26 04:49:28'),(6,'Makeup','Brushes And Tools',208,'2023-09-26 05:08:42','2023-09-26 05:08:42'),(8,'Makeup','By Skin Tone',210,'2023-09-26 05:19:21','2023-09-26 05:19:21'),(9,'Skin Care','Clensers',310,'2023-09-27 08:57:03','2023-09-27 08:57:03'),(11,'Skin Care','Marks',311,'2023-09-27 08:57:28','2023-09-27 08:57:28'),(13,'Skin Care','Toner',312,'2023-09-27 08:57:49','2023-09-27 08:57:49');
/*!40000 ALTER TABLE `subcetegories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `video_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `like` int DEFAULT NULL,
  `shared` int DEFAULT NULL,
  `video_type` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) NOT NULL,
  `Videothumnail_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`video_id`),
  KEY `Videothumnail_id` (`Videothumnail_id`),
  CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_10` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_100` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_101` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_102` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_103` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_104` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_105` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_106` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_107` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_108` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_109` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_11` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_110` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_111` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_112` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_113` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_114` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_115` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_116` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_117` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_118` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_119` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_12` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_120` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_121` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_122` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_123` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_124` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_125` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_126` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_127` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_128` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_129` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_13` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_130` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_131` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_132` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_133` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_134` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_135` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_136` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_137` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_138` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_139` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_14` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_140` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_141` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_142` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_143` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_144` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_145` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_146` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_147` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_148` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_149` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_15` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_150` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_151` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_152` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_153` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_154` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_155` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_156` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_157` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_158` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_159` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_16` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_160` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_161` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_162` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_163` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_164` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_165` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_166` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_167` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_168` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_169` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_17` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_170` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_171` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_172` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_173` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_174` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_175` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_176` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_177` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_178` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_179` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_18` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_180` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_181` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_182` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_183` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_184` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_185` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_186` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_187` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_19` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_20` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_21` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_22` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_23` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_24` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_25` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_26` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_27` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_28` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_29` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_3` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_30` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_31` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_32` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_33` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_34` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_35` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_36` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_37` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_38` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_39` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_4` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_40` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_41` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_42` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_43` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_44` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_45` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_46` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_47` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_48` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_49` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_5` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_50` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_51` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_52` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_53` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_54` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_55` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_56` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_57` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_58` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_59` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_6` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_60` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_61` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_62` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_63` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_64` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_65` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_66` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_67` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_68` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_69` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_7` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_70` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_71` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_72` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_73` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_74` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_75` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_76` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_77` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_78` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_79` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_8` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_80` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_81` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_82` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_83` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_84` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_85` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_86` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_87` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_88` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_89` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_9` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_90` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_91` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_92` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_93` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_94` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_95` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_96` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_97` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_98` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_99` FOREIGN KEY (`Videothumnail_id`) REFERENCES `videothumnails` (`Videothumnail_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (1,'hhhhhhhhhhhhhhhhhhhhhh','flfgzl',0,0,'Face Wash','video\\1702636504765-WhatsApp Video 2023-12-15 at 1.01.12 PM.mp4',10,'2023-12-15 10:35:05','2023-12-15 10:35:05'),(2,'hhhhhhhhhhhhhhhhhhhhhh','jdjjksdjkdjkdkjsdkjk',0,0,'Hair Care','video\\1702636559685-WhatsApp Video 2023-12-15 at 1.01.12 PM.mp4',10,'2023-12-15 10:36:00','2023-12-15 10:36:00'),(3,'hhhhhhhhhhhhhhhhhhhhhh','jdjjksdjkdjkdkjsdkjk',0,0,'Hair Care','video\\1702636578403-WhatsApp Video 2023-12-15 at 1.01.12 PM.mp4',10,'2023-12-15 10:36:18','2023-12-15 10:36:18'),(4,'hhhhhhhhhhhhhhhhhhhhhh','dsnjkdjk',0,0,'Face Wash','video\\1702636882307-WhatsApp Video 2023-12-15 at 1.01.12 PM.mp4',10,'2023-12-15 10:41:22','2023-12-15 10:41:22'),(5,'rrrrrrr','klnkjhvjgffhg',0,0,'Face Wash','video\\1702700207797-WhatsApp Video 2023-12-15 at 1.01.12 PM.mp4',11,'2023-12-16 04:16:48','2023-12-16 04:16:48');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videothumnails`
--

DROP TABLE IF EXISTS `videothumnails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videothumnails` (
  `Videothumnail_id` int NOT NULL AUTO_INCREMENT,
  `thumbnail_url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`Videothumnail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videothumnails`
--

LOCK TABLES `videothumnails` WRITE;
/*!40000 ALTER TABLE `videothumnails` DISABLE KEYS */;
INSERT INTO `videothumnails` VALUES (10,'uploads/1702613604206-banner5.PNG','2023-12-15 04:13:24','2023-12-15 04:13:24'),(11,'uploads/1702617923737-banner4.PNG','2023-12-15 05:25:23','2023-12-15 05:25:23'),(12,'uploads/1702624325175-banner2.PNG','2023-12-15 07:12:05','2023-12-15 07:12:05'),(13,'uploads/1702624377706-banner3.PNG','2023-12-15 07:12:57','2023-12-15 07:12:57');
/*!40000 ALTER TABLE `videothumnails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-07 17:35:19
