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
-- Table structure for table `interview_schedule`
--

DROP TABLE IF EXISTS `interview_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interview_schedule` (
  `schedule_idx` int NOT NULL AUTO_INCREMENT COMMENT '면접일정 PK',
  `slot_idx` int NOT NULL COMMENT '면접 슬롯 FK',
  `mem_idx` int NOT NULL COMMENT '회원 고유 FK',
  `registered_date` datetime DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP COMMENT '회원이 신청한 일자',
  PRIMARY KEY (`schedule_idx`),
  KEY `interview_schedule_member_idx_fk` (`mem_idx`),
  KEY `Interview_schedule_InterviewSlot_slot_idx_fk` (`slot_idx`),
  CONSTRAINT `Interview_schedule_InterviewSlot_slot_idx_fk` FOREIGN KEY (`slot_idx`) REFERENCES `interview_slot` (`slot_idx`) ON DELETE CASCADE,
  CONSTRAINT `interview_schedule_member_idx_fk` FOREIGN KEY (`mem_idx`) REFERENCES `member` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview_schedule`
--

LOCK TABLES `interview_schedule` WRITE;
/*!40000 ALTER TABLE `interview_schedule` DISABLE KEYS */;
INSERT INTO `interview_schedule` VALUES (31,70,282,'2024-04-22 11:22:18'),(32,104,70,'2024-04-29 11:25:17'),(33,83,284,'2024-04-24 20:07:32'),(34,89,288,'2024-04-22 16:27:23'),(35,82,280,'2024-04-24 14:53:44'),(36,95,313,'2024-04-24 17:25:18'),(37,96,315,'2024-04-24 17:25:36'),(38,97,316,'2024-04-24 17:25:49'),(39,105,312,'2024-04-29 13:24:15');
/*!40000 ALTER TABLE `interview_schedule` ENABLE KEYS */;
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
