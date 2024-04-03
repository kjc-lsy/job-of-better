-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: jobConsultingDB
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
  `com_withdraw_date` datetime DEFAULT NULL COMMENT '회사 탈퇴일',
  `com_is_withdrawn` enum('Y','N') CHARACTER SET latin1 DEFAULT NULL COMMENT '회사 탈퇴여부',
  `com_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사 주소',
  `com_logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사 로고',
  `com_charge_phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '담당자 연락처',
  `com_license_file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '사업자등록증 파일',
  `com_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사 이메일',
  `com_zipCode` int DEFAULT NULL COMMENT '회사 우편번호',
  `com_ceo_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사 대표명',
  `com_opening_date` date DEFAULT NULL COMMENT '개업일',
  PRIMARY KEY (`com_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,1,'김시쳥',NULL,NULL,NULL,'366-66-00298','2024-03-22 15:04:51','2024-03-22 15:04:51',NULL,NULL,'서울 강남구 가로수길 5 (신사동) 개포동 포동',NULL,NULL,NULL,NULL,6035,'김시쳥','2023-10-10'),(2,1,'김시쳥',NULL,NULL,NULL,'366-66-00298','2024-03-22 15:35:06','2024-03-22 15:35:06',NULL,NULL,'서울 마포구 가양대로 2 (상암동) 개포동 포동',NULL,NULL,NULL,NULL,3900,'김시쳥','2024-03-04'),(3,112,'김시쳥',NULL,NULL,NULL,'366-66-00298','2024-03-22 15:39:08','2024-03-22 15:39:08',NULL,NULL,'서울 중구 남대문로 109 (다동, 국제빌딩) 개포동 포동',NULL,NULL,NULL,NULL,4522,'김시쳥','2024-03-03');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_cover_letter`
--

DROP TABLE IF EXISTS `company_cover_letter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_cover_letter` (
  `ccl_idx` int NOT NULL AUTO_INCREMENT,
  `ccl_com_idx` int DEFAULT NULL COMMENT '회사 idx',
  `ccl_letter_question` text COLLATE utf8mb4_unicode_ci COMMENT '자소서 항목',
  `ccl_min_length` int DEFAULT NULL COMMENT '자소서 최소 글자수',
  `ccl_registration_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '자소서 등록일',
  `ccl_modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '자소서 수정일',
  `ccl_max_length` int DEFAULT NULL COMMENT '최대 글자수',
  PRIMARY KEY (`ccl_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_cover_letter`
--

LOCK TABLES `company_cover_letter` WRITE;
/*!40000 ALTER TABLE `company_cover_letter` DISABLE KEYS */;
INSERT INTO `company_cover_letter` VALUES (2,1,'자사를 선택한 이유와 향후 기대하고 있는 본인과 회사의 모습은 무엇인지 기술해 주십시오. (500자 이내)',0,'2024-03-15 10:07:57','2024-03-18 16:32:10',500),(14,1,'자신의 열정과 전문성을 나타낼 수 있는 프로젝트(경험/이력/과제 등)를 소개해 주시고, 해당 프로젝트의 수행 과정 및 결과에 대해 기재해 주세요. (300자 이내)',100,'2024-03-20 11:17:45','2024-03-20 11:17:59',300);
/*!40000 ALTER TABLE `company_cover_letter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회원 이름',
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '회원 아이디',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '회원 비밀번호',
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` enum('M','F') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `com_idx` int DEFAULT NULL COMMENT '회사 idx',
  `resume_file` blob COMMENT '이력서 파일',
  `desired_interview_date` datetime DEFAULT NULL COMMENT '희망 모의면접 일자',
  `assigned_interview_date` datetime DEFAULT NULL COMMENT '확정 모의면접 일자',
  `is_interview_date` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'N' COMMENT '모의면접일 확정여부',
  `interview_comment` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '모의면접 코멘트',
  `is_cover_letter` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'N' COMMENT '자소서 등록 여부',
  `is_resume` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'N' COMMENT '이력서 등록 여부',
  `join_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `withdrawn_date` datetime DEFAULT NULL,
  `is_withdrawn` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'N' COMMENT '탈퇴 여부',
  PRIMARY KEY (`idx`),
  UNIQUE KEY `user_id_UNIQUE` (`username`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (69,NULL,'admin','$2a$10$Va06QCy2/Hf/BmZA7dCDduz7Fw9DGnOlOu/BG69fNXa2CcgSZ4EoK',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'N',NULL,'N','N','2024-03-03 16:02:10','2024-03-03 16:02:10',NULL,'N'),(70,NULL,'user','$2a$10$/ii/FxAqaL3cwUcHwfAveOdKTeEXiWkawSGcmrlEo7ScMmrRVrLRy',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,'N',NULL,'N','N','2024-03-03 20:41:54','2024-03-14 13:28:19',NULL,'N');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

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
  `mcl_answer` text CHARACTER SET latin1 COMMENT '자소서 내용',
  `mcl_registration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `mcl_modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mcl_is_confirm` enum('Y','N') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '자소서 제출 확정 여부(Y,N)',
  PRIMARY KEY (`mcl_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_cover_letter`
--

LOCK TABLES `member_cover_letter` WRITE;
/*!40000 ALTER TABLE `member_cover_letter` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_cover_letter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_role`
--

DROP TABLE IF EXISTS `member_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_role` (
  `role_idx` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`role_idx`),
  KEY `member_idx` (`username`),
  CONSTRAINT `fk_member_username` FOREIGN KEY (`username`) REFERENCES `member` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_role`
--

LOCK TABLES `member_role` WRITE;
/*!40000 ALTER TABLE `member_role` DISABLE KEYS */;
INSERT INTO `member_role` VALUES (12,'ROLE_ADMIN','admin'),(17,'ROLE_USER','admin'),(18,'ROLE_USER','user');
/*!40000 ALTER TABLE `member_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program` (
  `pg_idx` int NOT NULL AUTO_INCREMENT,
  `pg_com_idx` int DEFAULT NULL,
  `pg_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pg_content` text COLLATE utf8mb4_unicode_ci,
  `pg_content_summary` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pg_prog_start_date` date DEFAULT NULL,
  `pg_prog_end_date` date DEFAULT NULL,
  `pg_edu_start_date` date DEFAULT NULL,
  `pg_edu_end_date` date DEFAULT NULL,
  `pg_reg_val_start_date` date DEFAULT NULL,
  `pg_reg_val_end_date` date DEFAULT NULL,
  `pg_interview_val_start_date` date DEFAULT NULL,
  `pg_interview_val_end_date` date DEFAULT NULL,
  `pg_interview_val_start_time` time DEFAULT NULL,
  `pg_interview_val_end_time` time DEFAULT NULL,
  `pg_created_date` datetime DEFAULT (now()),
  `pg_modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pg_is_withdrawn` enum('Y','N') COLLATE utf8mb4_unicode_ci DEFAULT 'N',
  PRIMARY KEY (`pg_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES (91,1,'테스트','<p>asddasasdadsads</p>',NULL,'2024-03-01','2024-03-23','2024-03-08','2024-03-30','2024-03-01','2024-03-29','2024-03-28','2024-03-29','14:30:00','14:30:00','2024-03-23 13:21:26','2024-03-23 16:36:26','N'),(92,1,'테스트','<p>ㅌㅅㅌㅇㅇㅇ</p>',NULL,'2024-03-15','2024-03-30','2024-03-08','2024-03-16','2024-03-15','2024-03-22','2024-03-14','2024-03-22','15:00:00','17:30:00','2024-03-23 14:53:09','2024-03-23 14:53:09','N'),(93,1,'test','<p>sdfsdfsdf</p>',NULL,'2024-03-22','2024-03-30','2024-03-08','2024-03-23','2024-03-08','2024-03-29','2024-03-14','2024-03-22',NULL,NULL,'2024-03-23 22:04:39','2024-03-23 22:04:39','N');
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-03 17:51:51
