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
  `ccl_pg_idx` mediumtext COLLATE utf8mb4_unicode_ci COMMENT '프로그램 고유값 ',
  PRIMARY KEY (`ccl_idx`),
  KEY `company_cover_letter_company_com_idx_fk` (`ccl_com_idx`),
  CONSTRAINT `company_cover_letter_company_com_idx_fk` FOREIGN KEY (`ccl_com_idx`) REFERENCES `company` (`com_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_cover_letter`
--

LOCK TABLES `company_cover_letter` WRITE;
/*!40000 ALTER TABLE `company_cover_letter` DISABLE KEYS */;
INSERT INTO `company_cover_letter` VALUES (45,5,'선택한 이유와 향후 기대하고 있는 본인과 회사의 모습은 무엇인지 기술해 주십시오. (필수)',0,'2024-04-12 17:13:47','2024-04-12 17:13:47',300,'92'),(46,5,'그동안의 경험 중 가장 도전적인 목표를 세운 경험과 그 결과가 어떠하였는지 기술해 주십시오. (필수)',0,'2024-04-12 17:20:49','2024-04-12 17:20:49',500,'92'),(47,5,'개발하면서 프로젝트를 맡게 된다면 가장 중요하게 생각하는 부분은 무엇인지 기술해 주십시오. (필수)',0,'2024-04-12 17:20:49','2024-04-12 17:20:49',1000,'92'),(48,1,'지원 직무와 관련하여 어떠한 역량을(지식/기술 등) 강점으로 가지고 있는지, 그 역량을 갖추기 위해 무슨 노력과 경험을 했는지 구체적으로 작성해주시기 바랍니다. (학내외 활동/프로젝트/교육 이수 과정 등 본인의 경험을 기반으로 작성해주시기 바랍니다.) ',0,'2024-04-15 19:55:55','2024-04-15 19:55:55',1500,'91'),(49,1,'해당 직무에 지원한 이유',0,'2024-04-15 19:55:55','2024-04-15 19:55:55',0,'91'),(50,1,'입사 후 포부',100,'2024-04-15 19:55:56','2024-04-15 19:55:56',500,'91');
/*!40000 ALTER TABLE `company_cover_letter` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-29 17:28:15
