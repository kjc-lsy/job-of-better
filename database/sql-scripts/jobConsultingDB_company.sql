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
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `com_idx` int NOT NULL AUTO_INCREMENT,
  `com_mem_idx` int NOT NULL,
  `com_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사명',
  `com_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '회사 메모',
  `com_phone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사 연락처',
  `com_charge_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사 담당자 명',
  `com_license_num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '사업자 등록번호',
  `com_join_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '회사 가입일',
  `com_modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '회사 수정일',
  `com_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사 주소',
  `com_detail_addr` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사 상세주소',
  `com_zipCode` int DEFAULT NULL COMMENT '회사 우편번호',
  `com_logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사 로고',
  `com_charge_phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '담당자 연락처',
  `com_license_file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '사업자등록증 파일',
  `com_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사 이메일',
  `com_ceo_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사 대표명',
  `com_opening_date` date DEFAULT NULL COMMENT '개업일',
  `com_tel` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사전화번호',
  `com_withdraw_date` datetime DEFAULT NULL COMMENT '회사 탈퇴일',
  `com_is_withdrawn` enum('Y','N') COLLATE utf8mb4_unicode_ci DEFAULT 'N' COMMENT '회사 탈퇴여부',
  PRIMARY KEY (`com_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,69,'(주)배고파',NULL,'01052232212',NULL,'0','2024-03-22 15:04:51','2024-04-13 18:27:51','서울 강남구 가로수길 5 (신사동) 개포동 포동',NULL,6035,NULL,NULL,NULL,'company@gmail.com','김시쳥','2023-10-10',NULL,NULL,NULL),(5,123,'(주)김시쳥',NULL,'01052234311',NULL,'366-66-00298','2024-04-05 12:11:29','2024-04-13 18:27:51','서울 동대문구 안암로 6 (신설동, 대광중고등학교) 5603호',NULL,2581,NULL,NULL,NULL,'company01@gmail.com','김시쳥','2023-07-03',NULL,NULL,NULL),(7,139,'(주)잡소프트',NULL,'01052236523',NULL,'125-12-76743','2024-04-11 14:35:32','2024-04-13 18:27:51','경기 안양시 동안구 경수대로 947 (비산동, 비산화성파크드림) 102동 1603호',NULL,13956,NULL,NULL,NULL,'company02@gmail.com','김지창','2024-04-11',NULL,NULL,NULL);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
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
