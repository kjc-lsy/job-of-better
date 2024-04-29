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
-- Table structure for table `member_cover_letter`
--

DROP TABLE IF EXISTS `member_cover_letter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_cover_letter` (
  `mcl_idx` int NOT NULL AUTO_INCREMENT,
  `mcl_ccl_idx` int DEFAULT NULL COMMENT '회사 자소서 idx',
  `mcl_member_idx` int DEFAULT NULL COMMENT '회원 idx',
  `mcl_answer` text COLLATE utf8mb4_unicode_ci COMMENT '자소서 내용',
  `mcl_registration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `mcl_modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mcl_is_confirm` enum('Y','N','T') COLLATE utf8mb4_unicode_ci DEFAULT 'N' COMMENT '자소서 제출 확정 여부(Y : 제출, N : 미작성, T: 임시저장)',
  `mcl_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '자기소개서 제목',
  PRIMARY KEY (`mcl_idx`),
  KEY `member_cover_letter_company_cover_letter_ccl_idx_fk` (`mcl_ccl_idx`),
  CONSTRAINT `member_cover_letter_company_cover_letter_ccl_idx_fk` FOREIGN KEY (`mcl_ccl_idx`) REFERENCES `company_cover_letter` (`ccl_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_cover_letter`
--

LOCK TABLES `member_cover_letter` WRITE;
/*!40000 ALTER TABLE `member_cover_letter` DISABLE KEYS */;
INSERT INTO `member_cover_letter` VALUES (4,48,70,'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 ','2024-04-28 17:41:26','2024-04-28 20:42:44','Y','테스트 제목입니다'),(5,49,70,'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 ','2024-04-28 17:41:26','2024-04-28 20:42:44','Y','테스트 제목입니다'),(6,50,70,'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 ','2024-04-28 17:41:27','2024-04-28 20:42:45','Y','테스트 제목입니다'),(7,48,280,'user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 \n\n\nuser2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 \n\n\nuser2 자소서 user2 자소서 user2 자소서 user2 자소서 ','2024-04-28 20:54:22','2024-04-28 20:54:22','Y','user2 자소서 제목'),(8,49,280,'user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 \n\n\nuser2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 \n\n\nuser2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 \n\n\nuser2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 \n\n\nuser2 자소서 user2 자소서 user2 자소서 user2 자소서 ','2024-04-28 20:54:22','2024-04-28 20:54:22','Y','user2 자소서 제목'),(9,50,280,'user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 user2 자소서 \n\n\nuser2 자소서 user2 자소서 user2 자소서 user2 자소서 ','2024-04-28 20:54:23','2024-04-28 20:54:23','Y','user2 자소서 제목');
/*!40000 ALTER TABLE `member_cover_letter` ENABLE KEYS */;
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
