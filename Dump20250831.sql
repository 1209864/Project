-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: intern_gallery_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(2048) NOT NULL,
  `phash` varchar(255) NOT NULL,
  `owner_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_owner_id` (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg','7a96bf47773230','user_submission'),(2,'https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg','c1c3c88335250704','user_submission'),(3,'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg','5f575f6c1f0d5311','user_submission'),(4,'https://images.pexels.com/photos/236806/pexels-photo-236806.jpeg','fd9f764d5d479c7f','user_submission'),(5,'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg','5f575f6c1f0d5311','user_submission'),(6,'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg','5f575f6c1f0d5311','user_submission'),(7,'https://images.pexels.com/photos/5225333/pexels-photo-5225333.jpeg','6f6aaf0c0f0f99bf','user_submission'),(8,'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg','e0949e3e201646a6','user_submission'),(9,'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg','fdae828084a0adfa','user_submission'),(10,'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg','19187c2e2f361310','user_submission'),(11,'https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg','7070787878787878','user_submission'),(12,'https://images.pexels.com/photos/39517/rose-flower-blossom-bloom-39517.jpeg','040e3670f8781011','user_submission'),(13,'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg','0488ecfcfcace8b0','user_submission'),(14,'https://images.pexels.com/photos/152424/pexels-photo-152424.jpeg','ca1b93272ecca40c','user_submission'),(15,'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg','8090b8387a0341fc','user_submission'),(16,'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg','a07faf53030f8f8f','user_submission'),(17,'https://images.pexels.com/photos/1148087/pexels-photo-1148087.jpeg','177f5f3f1f0f0f36','user_submission'),(18,'https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg','30383878383c1000','user_submission'),(19,'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg','8090b8387a0341fc','user_submission'),(20,'https://picsum.photos/seed/picsum/200/300','0b1b3f3f3f3f3f3f','user_submission'),(21,'https://picsum.photos/id/237/200/300','f1c181050181c1e1','user_submission'),(22,'https://picsum.photos/seed/picsum/200/300','0b1b3f3f3f3f3f3f','user_submission'),(23,'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg','8185808280000490','user_submission'),(24,'https://images.pexels.com/photos/33116177/pexels-photo-33116177.jpeg','0f070f0b030f170f','user_submission'),(25,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzssz9nadMNAFc6wWDmklk0XpdPm3YcRmoLw&s','00003ef6480000c0','user_submission');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-31 17:46:39
