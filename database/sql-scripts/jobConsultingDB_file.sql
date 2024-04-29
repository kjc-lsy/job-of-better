-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: asordk.synology.me    Database: jobConsultingDB
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

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
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `file_idx` int NOT NULL AUTO_INCREMENT COMMENT 'file pk',
  `original_file_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '파일 오리지날명',
  `upload_file_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'uuid 변환된 파일명',
  `upload_file_path` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'aws 폴더 분류명',
  `upload_file_url` varchar(255) COLLATE utf8mb4_bin NOT NULL COMMENT 'aws 파일 주소',
  `upload_file_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '파일 업로드된 날짜',
  `related_idx` int DEFAULT NULL COMMENT '관련 idx(member idx, program pg_idx 등)',
  `upload_file_ext` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '파일 확장자',
  PRIMARY KEY (`file_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='aws 연동 파일 목록';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,'laptop.jpeg','profile/70bb1faa-7eec-4b1e-a40d-08b1d2c25221.jpeg','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/70bb1faa-7eec-4b1e-a40d-08b1d2c25221.jpeg','2024-04-25 18:44:41',70,'profile_img'),(2,'laptop.jpeg','profile/735530e2-949f-4e98-9529-908e4814b836.jpeg','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/735530e2-949f-4e98-9529-908e4814b836.jpeg','2024-04-25 18:45:41',70,'profile_img'),(3,'스크린샷 2024-04-19 20.42.05.png','profile/5b287dab-914f-4e9d-9a0c-02c64862d674.png','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/5b287dab-914f-4e9d-9a0c-02c64862d674.png','2024-04-25 20:08:07',70,'profile_img'),(4,'스크린샷 2024-04-19 20.42.05.png','profile/37b47bdb-ca0a-4941-b0ca-dc1c68e11a06.png','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/37b47bdb-ca0a-4941-b0ca-dc1c68e11a06.png','2024-04-25 20:13:20',70,'profile_img'),(7,'스크린샷 2024-04-19 20.42.05.png','profile/545ae99d-b558-4f4d-8db8-06d0ea74e5f0.png','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/545ae99d-b558-4f4d-8db8-06d0ea74e5f0.png','2024-04-25 21:13:22',70,'profile_img'),(9,'14ea8055dcb38a410ee6fcd312dc5e70.png','profile/ea90f5bb-40d3-49a7-9e1b-1bcef7de1278.png','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/ea90f5bb-40d3-49a7-9e1b-1bcef7de1278.png','2024-04-26 11:12:50',70,NULL),(10,'10점.jpg','profile/28a9403c-e589-48f5-8d22-1caff49f406b.jpg','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/28a9403c-e589-48f5-8d22-1caff49f406b.jpg','2024-04-26 11:14:46',70,NULL),(11,'613c1ba7552699b1519095196a9278d2.gif','profile/ca2e75e8-007b-40a7-8e9c-f8720526ecdb.gif','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/ca2e75e8-007b-40a7-8e9c-f8720526ecdb.gif','2024-04-26 11:20:05',70,NULL),(12,'img.webp','profile/bf0b6e86-992d-4d78-b380-c009fa0c16cd.webp','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/bf0b6e86-992d-4d78-b380-c009fa0c16cd.webp','2024-04-26 11:24:57',70,''),(14,'14ea8055dcb38a410ee6fcd312dc5e70.png','profile/9e0e5447-7167-40a7-a529-db4a5da7daa6.png','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/9e0e5447-7167-40a7-a529-db4a5da7daa6.png','2024-04-26 12:02:22',70,'png'),(17,'9991B7365C29E6EA14.jpg','profile/8208ced5-b842-4c7e-b73c-315c28faa122.jpg','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/8208ced5-b842-4c7e-b73c-315c28faa122.jpg','2024-04-26 12:14:16',70,'jpg'),(20,'10점.jpg','profile/0a32c065-d39a-42f2-9862-5f9a97140a1f.jpg','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/0a32c065-d39a-42f2-9862-5f9a97140a1f.jpg','2024-04-26 13:24:35',70,'jpg'),(22,'613c1ba7552699b1519095196a9278d2.gif','profile/01e36b68-54f1-4366-9557-6594f0b47bdf.gif','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/01e36b68-54f1-4366-9557-6594f0b47bdf.gif','2024-04-26 13:31:08',70,'gif'),(135,'스크린샷 2024-04-19 20.42.05.png','resume/6470a7d0-ac3a-4cb2-b1a0-4498666f8571.png','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/6470a7d0-ac3a-4cb2-b1a0-4498666f8571.png','2024-04-28 18:51:36',284,'png'),(136,'일본한자.hwp','resume/032bbc09-3f2a-4da6-a227-cec131d4776f.hwp','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/032bbc09-3f2a-4da6-a227-cec131d4776f.hwp','2024-04-28 18:51:36',284,'hwp'),(137,'IMG_1707.JPG','resume/ffc9d08a-d062-49af-bf1b-e5287df5557b.JPG','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/ffc9d08a-d062-49af-bf1b-e5287df5557b.JPG','2024-04-28 18:51:36',284,'JPG'),(138,'김지창 기술이력서.pdf','resume/3210c3c6-eec5-4b6a-80c6-27576ed9ec5c.pdf','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/3210c3c6-eec5-4b6a-80c6-27576ed9ec5c.pdf','2024-04-28 18:52:02',284,'pdf'),(139,'스크린샷 2024-04-19 20.42.05.png','resume/6b5e2048-7efb-4212-884d-ba6e393b5c32.png','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/6b5e2048-7efb-4212-884d-ba6e393b5c32.png','2024-04-28 20:55:09',280,'png'),(140,'일본한자.hwp','resume/5073ccd0-6b05-48de-a0c2-81c5ca578dfd.hwp','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/5073ccd0-6b05-48de-a0c2-81c5ca578dfd.hwp','2024-04-28 20:55:09',280,'hwp'),(141,'IMG_1707.JPG','resume/1346c5b2-797e-4d50-b57c-019d8e1d871f.JPG','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/1346c5b2-797e-4d50-b57c-019d8e1d871f.JPG','2024-04-28 20:55:09',280,'JPG'),(145,'스크린샷 2024-04-19 20.42.05.png','resume/c68eb534-49a9-4f25-ba38-fbdedc677427.png','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/c68eb534-49a9-4f25-ba38-fbdedc677427.png','2024-04-29 13:23:34',312,'png'),(146,'스크린샷 2024-04-19 20.42.05.png','profile/feb7265e-ca39-418e-8a1b-57f735243fb8.png','profile','https://s3.us-east-2.amazonaws.com/job-of-better/profile/feb7265e-ca39-418e-8a1b-57f735243fb8.png','2024-04-29 13:30:54',70,'png'),(169,'스크린샷 2024-04-19 20.42.05.png','resume/a93a61bd-8dfc-4db3-a0fa-c2034780c222.png','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/a93a61bd-8dfc-4db3-a0fa-c2034780c222.png','2024-04-29 15:00:33',70,'png'),(170,'일본한자.hwp','resume/99b53385-b801-4609-9075-9754da7b59b9.hwp','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/99b53385-b801-4609-9075-9754da7b59b9.hwp','2024-04-29 15:00:33',70,'hwp'),(171,'IMG_1707.JPG','resume/996f0114-43bf-4f4b-a31b-256e95d5e45a.JPG','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/996f0114-43bf-4f4b-a31b-256e95d5e45a.JPG','2024-04-29 15:00:33',70,'JPG'),(172,'스크린샷 2024-04-19 20.42.05.png','resume/f0063508-2111-49e0-889c-d1804dab5622.png','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/f0063508-2111-49e0-889c-d1804dab5622.png','2024-04-29 16:24:38',70,'png'),(173,'일본한자.hwp','resume/52a561e9-30ce-4ee4-a29c-d2d5d82e685f.hwp','resume','https://s3.us-east-2.amazonaws.com/job-of-better/resume/52a561e9-30ce-4ee4-a29c-d2d5d82e685f.hwp','2024-04-29 16:27:20',70,'hwp');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-29 17:28:14
