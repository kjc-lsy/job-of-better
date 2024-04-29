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
) ENGINE=InnoDB AUTO_INCREMENT=273 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_role`
--

LOCK TABLES `member_role` WRITE;
/*!40000 ALTER TABLE `member_role` DISABLE KEYS */;
INSERT INTO `member_role` VALUES (12,'ROLE_COMPANY','company'),(17,'ROLE_USER','company'),(18,'ROLE_USER','user'),(34,'ROLE_USER','company02'),(35,'ROLE_COMPANY','company02'),(38,'ROLE_USER','company03'),(39,'ROLE_COMPANY','company03'),(171,'ROLE_USER','user1'),(172,'ROLE_USER','user2'),(173,'ROLE_USER','user3'),(174,'ROLE_USER','user4'),(176,'ROLE_USER','user6'),(177,'ROLE_USER','user7'),(178,'ROLE_USER','user8'),(179,'ROLE_USER','user9'),(180,'ROLE_USER','user10'),(181,'ROLE_USER','user11'),(182,'ROLE_USER','user12'),(183,'ROLE_USER','user13'),(184,'ROLE_USER','user14'),(185,'ROLE_USER','user15'),(186,'ROLE_USER','user16'),(187,'ROLE_USER','user17'),(188,'ROLE_USER','user18'),(189,'ROLE_USER','user19'),(190,'ROLE_USER','user20'),(191,'ROLE_USER','user21'),(192,'ROLE_USER','user22'),(193,'ROLE_USER','user23'),(194,'ROLE_USER','user24'),(195,'ROLE_USER','user25'),(196,'ROLE_USER','user26'),(197,'ROLE_USER','user27'),(198,'ROLE_USER','user28'),(199,'ROLE_USER','user29'),(200,'ROLE_USER','user30'),(201,'ROLE_USER','user31'),(202,'ROLE_USER','user32'),(203,'ROLE_USER','user33'),(204,'ROLE_USER','user34'),(205,'ROLE_USER','user35'),(206,'ROLE_USER','user36'),(207,'ROLE_USER','user37'),(208,'ROLE_USER','user38'),(209,'ROLE_USER','user39'),(210,'ROLE_USER','user40'),(211,'ROLE_USER','user41'),(212,'ROLE_USER','user42'),(213,'ROLE_USER','user43'),(214,'ROLE_USER','user44'),(215,'ROLE_USER','user45'),(216,'ROLE_USER','user46'),(217,'ROLE_USER','user47'),(218,'ROLE_USER','user48'),(219,'ROLE_USER','user49'),(220,'ROLE_USER','user50'),(221,'ROLE_USER','user51'),(222,'ROLE_USER','user52'),(223,'ROLE_USER','user53'),(224,'ROLE_USER','user54'),(225,'ROLE_USER','user55'),(226,'ROLE_USER','user56'),(227,'ROLE_USER','user57'),(228,'ROLE_USER','user58'),(229,'ROLE_USER','user59'),(230,'ROLE_USER','user60'),(231,'ROLE_USER','user61'),(232,'ROLE_USER','user62'),(233,'ROLE_USER','user63'),(234,'ROLE_USER','user64'),(235,'ROLE_USER','user65'),(236,'ROLE_USER','user66'),(237,'ROLE_USER','user67'),(238,'ROLE_USER','user68'),(239,'ROLE_USER','user69'),(240,'ROLE_USER','user70'),(241,'ROLE_USER','user71'),(242,'ROLE_USER','user72'),(243,'ROLE_USER','user73'),(244,'ROLE_USER','user74'),(245,'ROLE_USER','user75'),(246,'ROLE_USER','user76'),(247,'ROLE_USER','user77'),(248,'ROLE_USER','user78'),(249,'ROLE_USER','user79'),(250,'ROLE_USER','user80'),(251,'ROLE_USER','user81'),(252,'ROLE_USER','user82'),(253,'ROLE_USER','user83'),(254,'ROLE_USER','user84'),(255,'ROLE_USER','user85'),(256,'ROLE_USER','user86'),(257,'ROLE_USER','user87'),(258,'ROLE_USER','user88'),(259,'ROLE_USER','user89'),(260,'ROLE_USER','user90'),(261,'ROLE_USER','user91'),(262,'ROLE_USER','user92'),(263,'ROLE_USER','user93'),(264,'ROLE_USER','user94'),(265,'ROLE_USER','user95'),(266,'ROLE_USER','user96'),(267,'ROLE_USER','user97'),(268,'ROLE_USER','user98'),(269,'ROLE_USER','user99'),(270,'ROLE_USER','user100');
/*!40000 ALTER TABLE `member_role` ENABLE KEYS */;
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
