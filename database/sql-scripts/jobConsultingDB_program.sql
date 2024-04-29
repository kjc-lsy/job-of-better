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
  `pg_content_summary` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `pg_interview_unit_time` enum('30','60','90','120') COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '면접 단위 시간(30분, 60분, 90분, 120분)',
  `pg_max_interviewees_per_unit` int DEFAULT NULL COMMENT '단위 시간당 최대 면접자 수',
  `pg_created_date` datetime DEFAULT (now()),
  `pg_modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pg_status` enum('Prestart','Ongoing','Ended','Registration','Interviewing','Educating') COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '''Prestart'' = 시작 전\n''Ongoing'' = 진행 중\n''Ended'' = 종료\n''Registration'' = 가입 신청 중\n''Interviewing'' = 면접 중\n''Educating'' = 교육 중\n',
  `pg_withdrawn_date` datetime DEFAULT NULL,
  `pg_is_withdrawn` enum('Y','N') COLLATE utf8mb4_unicode_ci DEFAULT 'N',
  PRIMARY KEY (`pg_idx`),
  KEY `program_company_com_idx_fk` (`pg_com_idx`),
  CONSTRAINT `program_company_com_idx_fk` FOREIGN KEY (`pg_com_idx`) REFERENCES `company` (`com_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES (91,1,'비영리 조직 IT 내공 기르기','비영리조직 공익활동가를 위한 비영리IT 내공 기르기\n\n공익활동단체들의 PC는 안녕하십니까?\n\n공익활동단체들의 홈페이지는 잘 운영되고 있나요?\n\n인공지능과 chatGPT로 업무 효율을 높일 수 있다는데\n\n비영리조직과 공익활동가들에게도 chatGPT를 활용할 수 있을까요?\n\n비영리IT 기초부터 활용까지 잘 하고 싶은 공익활동가분들을 위해\n\n비영리IT 내공을 기를 수 있는 시간을 마련하였습니다.\n\n■ 교육대상 : IT가 불편하고 알고싶은 모든 비영리조직의 활동가\n\n・IT 용어만 들으면 멍해지고 도망치고 싶은 활동가\nd\n・IT 담당자도 아닌데 컴퓨터가 고장나면 내게 질문해서 일이 끊기는 활동가\n\n・모두 모른척해서 어쩌다 홈페이지를 맡게 된 활동가\n\n・인공지능과 chatGPT를 이해하고, chatGPT로 업무의 효율성을 높이고 싶은 활동가asdsad\n\n■ 교육장소 : 군포시공익활동지원센터(산본로 323번길 지하 1층)\n\n■ 교육일시 : 2023년 7월 6일(목)\\~7월 21일(금)\n\n・1강 비영리조직의 홈페이지 기획과 제작 7월 6일(목) 15:00\\~17:00\n\n・2강 비영리조직의 IT내공 기르기 7월 7일(금) 10:00\\~12:00\n\n・3강 비영리조직의 IT인프라 정비 7월 7일(금) 13:30\\~15:30\n\n・4강 비영리조직을 위한 인공지능과 chatGPT 활용법 7월 7일(금) 16:00\\~18:00\n\n■ 교육신청 :\n\n・전체 4강 중 필요 강의 선택하여 신청 접수\n\n■ 교육내용 :\n\n・1강 비영리조직의 홈페이지 기획과 제작 >>> 공동체IT사회적협동조합 인동준 상임이사\n\n```\n - 비영리조직이 홈페이지를 만드는 이유와 방법들\n\n - 비영리조직의 여건과 목적에 맞는 홈페이지 기획과 운영 방법\n```\n\n・2강 비영리조직의 IT내공 기르기 >>> 공동체IT사회적협동조합 인동준 상임이사\n\n```\n - IT 실무를 위한 용어와 개념 익히기\n\n - 비영리조직의 IT문화와 보안을 위한 기본원칙\n```\n\n・3강 비영리조직의 IT인프라 정비 >>> 공동체IT사회적협동조합 이정한 부이사장\nㅁ\n```\n - 비영리조직의 컴퓨터 관리와 유지\n\n - 비영리조직의 컴퓨터 구매 꿀팁\n```\n\n・4강 비영리조직을 위한 인공지능과 chatGPT 활용법 \\*개인노트북 지참 >>> 구구컬리지 박용 대표\n\n```\n - 인공지능과 chatGPT 이해하기\n\n - chatGPT 활용법(chatGPT 실험하기, 홍보문구 만들기, 업무자동화 등)\n```\n\n■ 교육문의 : 군포시공익활동지원센터(031-394-8835\\~6)sddssd\n',' **교육 내용:**\n비영리조직 IT내공 기르기\n\n**교육 장소:**\n군포시공익활동지원센터(산본로 323번길 지하 1층)\n\n**교육 대상:**\nIT가 불편하고 알고싶은 모든 비영리조직의 활동가\n\n**교육 시간:**\n2023년 7월 6일(목)\\~7월 21일(금)','2024-04-22','2024-05-31','2024-05-01','2024-05-16','2024-04-24','2024-05-09','2024-04-25','2024-05-09','09:30:00','23:30:00','120',2,'2024-03-23 13:21:26','2024-04-21 20:43:00','Ongoing',NULL,'N'),(92,1,'엘라스틱 서치 빅데이터 분석','“디지털 디자인의 모든 것!”\n\n프로젝트 실습과 포트폴리오까지 완성하는 ‘디지털 디자인 포트폴리오‘ 과정\n\n교육대상\n\nIT분야 취업을 희망하는 여성 구직자(개강일 기준)\n※ 새일센터 구직등록 필수, 경기도에 거주하는 미취업 여성\n\n- 웹디자이너, 광고디자이너, 시각디자이너 등으로 취업을 희망하는 분\n\n- 실무 트레이닝을 통해 능력을 업그레이드하고 싶은 디자이너\n\n- 디자인 관련학과 졸업예정자 또는 졸업이상의 학력 소지한 분\n\n- 그래픽 관련 자격증 소지자 및 컴퓨터실무능력 중급 이상\n\n- 포토샵, 일러스트 포트폴리오 제작 경험자\n\n- 취업에 결격사유가 없는 자\n\n* 유의사항 : 아래의 경우 참여 불가 \n\n- 자영업자(연 매출액 1억5천만원 미만인 경우 참여 가능, 증빙서류 제출)\n\n- 재직여성(연소득 4천8백만원 이하인 경우 참여 가능, 증빙서류 제출)\n\n- 현직공무원, 사립학교 교직원\n\n- 대학·대학원 재학생(휴학생 및 6개월 이내 졸업예정자 참여 가능, 증빙서류 제출)\n\n- 국민취업지원제도 참여자(해당 프로그램 담당 상담사와 사전 협의 필요)\n\n- 직접일자리 사업지침상 국비지원 직업교육훈련의 연례적 반복 참여는 최대 2년까지만 허용하며, \n\n2년 초과 시 1년 간 참여를 제한합니다.\n\n\n\n\n\n\n\n교육장소\n\n경기도일자리재단 여성능력개발본부(용인) 교육동 / ZOOM을 이용한 온라인 실시간 화상강의+오프라인교육\n\n※ 사정에 따라 변경될 수 있음\n\n\n\n\n\n커리큘럼\n\n← 모바일에서는 좌우로 스크롤하여 내용을 확인해주세요. →\n\n\n과목 분류	주요 내용	온라인	오프라인\n4차 산업혁명과 디자인	\n- 미래관점에서의 디자인 산업\n\n- CMF디자인 트렌드 분석, 사례\n\n- 디자인 기본개념과 구성원리\n\n12시간\n-\n디자인 툴 실습	\n- 일러스트 및 포토샵 기본다지기\n\n- 세부기능 활용 및 실무익히기\n\n- 일러스트 프로젝트 실무\n\n포토샵 프로젝트 실무 : 굿즈디자인\n\n132시간\n12시간\n인디자인	\n- 인디자인과 편집디자인 개요\n\n- 북디자인, 달력, 다이어리 디자인 및 전자책\n\n- 타이포그래피, 마스터페이지\n\n- 인디자인 활용 리플렛 제작\n\n54시간\n-\n디자인 with 피그마\n\nUX/UI 개념 이해\n\n\n- UX/UI 기초 이론\n\n- 피그마 인터페이스 익히기\n\n- 효과적인 실무 에셋 관리법\n\n- 피그마 프로젝트 실무 : 앱, 반응형웹 디자인 상세페이지, HTML, CSS\n\n\n93시간\n-\n포트폴리오 제[작	\n- 포트폴리오에 대한 이해와 제작\n\n- 개별 프로젝트 작업 및 분야별 포트폴리오 제작\n\n- 인쇄물 제작 이론 및 실무\n\n33시간	12시간',' **교육 내용**\n디지털 디자인 기초부터 웹디자이너로 취업을 준비하는 모든 것을 빠짐없이 전수\n\n**교육 장소**\n경기도 용인시 여성능력개발본부+온라인\n\n**교육 대상**\nIT 분야 취업 희망 여성, 특히 웹디자이너 희망자\n\n**교육 시간**\n온라인 12시간 (디자인 기본 개념, 툴 실습), 오프라인 총 233시간','2024-03-15','2024-05-30','2024-03-12','2024-05-17','2024-03-21','2024-03-31','2024-04-11','2024-04-30','07:00:00','17:30:00','60',2,'2024-03-23 14:53:09','2024-04-11 00:00:00','Ongoing',NULL,'N'),(93,1,'빅데이터를 위한 파이썬','\n학습시간	09:00 \\~ 18:00 ( 32시간 )	난이도	중급\n교육비 지원	고용보험 비환급	평가항목	출석률 100%\n수료기준	총점 80점 이상시 수료	정원	24 명\n교재정보	\n[PDF] 빅데이터를 위한 파이썬\n\n학습목표\nNumpy, Pandas 라이브러리를 사용한 데이터 전처리를 수행할 수 있다.\nNumpy, Pandas 라이브러리를 통해 데이터를 분석할 수 있고, 실전 데이터에 적용할 수 있다.\nPandas 를 사용하여 CSV 파일, Excel 파일, Text 파일, JSON 파일 등 다양한 파일의 입출력을 수행할 수 있다.\nMatplotlib, Seaborn, Folium 등을 사용하여 분석한 데이터들을 다양한 그래프로 시각화 할 수 있다.\nPymongo, Pandas 를 사용하여 MongoDB를 연동할 수 있다.\n학습대상\n금융 데이터, 기업 정보, 고객 정보, 지리 정보, 마케팅 정보, 인구통계 분석 등 다양한 종류의 데이터 분석을 수행하고자 하는 학습자\n데이터 전처리와 분석, 시각화를 수행하고자 하는 학습자\n다양한 데이터의 입출력과 빅데이터를 처리하는 MongoDB 를 연동하고자 하는 학습자\n파이썬의 고급 라이브러리를 활용하여 프로그램을 작성하고자 하는 개발자 및 운영자\n로그 분석 등 분석 데이터 분석 업무를 수행하고자 하는 학습자\n생명공학을 비롯 연구 업무를 수행하는 엔지니어 및 과학자\n머신러닝이나 딥러닝을 하기 전에 데이터 전처리와 데이터 분석에 대한 기초가 필요하신 학습자',' **교육 내용**: 파이썬을 이용한 빅데이터 분석. Matplotlib, Seaborn, Folium 등의 라이브러리를 사용한 데이터 시각화, MongoDB 연동 기법을 수강.\n**교육 장소**: (온라인)\n**교육 대상**: 금융 데이터, 기업 정보, 고객 정보, 지리 정보, 마케팅 정보, 인구통계 분석 등 다양한 종류의 데이터 분석을 수행하고자 하는 학습자.\n**교육 시간**: 32시간 (화요일 오전 9시 ~ 오후 6시)','2024-04-10','2024-05-31','2024-04-18','2024-05-17','2024-04-22','2024-05-17','2024-03-15','2024-03-31','12:00:00','18:30:00','90',3,'2024-03-23 22:04:39','2024-04-18 16:14:25','Ended',NULL,'N'),(94,5,'네이버 부트캠프','\n최고의 동료와 함께​\n이전에 없던 성장을 향해 ​\n최고의 커뮤니티에서 최고의 동료들과 함께 다양한 문제를 해결하며\n세상에 긍정적인 변화를 만들어 나가며 성장하고 싶은 분들을 찾습니다​\n\n모집 기간\n2023년 8월 10일(목) \\~ 2023년 9월 14일(목) 오후 5시​​\n모집 분야\n컴퓨터 비전(80여 명), 자연어 처리(80여 명), 추천 시스템(80여 명)\n\\*온라인 AI 역량 테스트에서 하나의 분야를 선택하게 되며, 선택한 분야가 심사에 반영될 수 있습니다.\n\n모집 인원\nK-Digital Training 전형(200여 명), 일반 전형(40여 명)​​\n모집 대상\n공통\n5개월의 교육기간 동안 몰입하며 AI 엔지니어라는 목표를 달성할 수 있는 분​\n교육기간 동안 코어타임(월\\~금, 10:00\\~19:00)에 모두 성실히 참여할 수 있는 분​\n끝을 보는 \'덕질\'의 성향을 갖추고 자기주도적으로 AI 엔지니어로 성장하고 싶으신 분\n협업과 커뮤니케이션에 책임감 있는 자세로 적극적으로 참여하며, 건강한 학습 커뮤니티를 만드는 데 기여할 수 있는 분​\nKDT Only\n국민내일배움카드 신규 발급 가능자 or 보유자​\nK-Digital Training 과정 등록 가능자​\n교육 일정\n2023년 11월 6일(월) \\~ 2024년 4월 2일(화)\n\\*주말 및 법정 공휴일에는 학습 일정이 없습니다.​\n\n교육 장소\n온라인: 부스트캠프 AI Tech 전용 학습 플랫폼\n오프라인: 서울 강남역 혹은 경기도 분당 인근\n\\*교육은 전면 온라인으로 진행되며, 운영 상황에 따라 필요시 선택 참여로 오프라인 과정이 진행될 수 있습니다.\n\n네이버 주관입니다\n\n\n6기 모집 일정을\n확인하세요.\n부스트캠프 AI Tech 지원을 위한 상세 일정을 확인하세요.\n모집 과정은 온라인으로 진행되며, 지원 관련 모든 안내는 개별 메일로 안내됩니다.\n\nSTEP 1\n지원서 작성\n\\~2023년 9월 14일(목) 오후 5시까지\n바로 지원하기STEP 2\n온라인 AI 역량 테스트\n2023년 9월 19일(화)​\n오후 7시 \\~ 9시\n\nSTEP 3 (선택)\nPre-Course 학습 인증 제출\n(가산점 5점 부여)\n2023년 9월 24일(일)\n오후 11시 59분까지\n학습 인증 제출하기STEP 4\n1차 심사 발표\n2023년 9월 27일(수)\n\\*합격 여부에 무관하게 모든 분들에게 결과가 안내됩니다.\n\nSTEP 5\n온라인 코딩 테스트\n2023년 10월 10일(화)\n오후 7시\\~오후 9시\n\nSTEP 6\n최종 합격자 발표\n2023년 10월 19일(목)​​\n\\*KDT 전형은 HRD-Net 등록이 추가로 진행됩니다\n\nSTEP 7 (선택)\n추가합격\n2023년 11월 13일까지 추가합격 안내가 진행됩니다.​\n\\*추가합격은 개별 연락처로 안내됩니다.​\n\nSTEP 8\n본 과정\n2023년 11월 6일(월) \\~\n2024년 4월 2일(화)\n\\*본 과정 시작 1주일 전 온보딩 클래스가 진행됩니다.​\n상황에 따라 일정은 변동이 있을 수 있습니다.\n더 자세한 안내는 부스트캠프 공식 블로그 를 참고하세요.\n1차 심사 후 KDT 전형 지원자에 한해 국민내일배움카드 발급 인증이 진행되며 개별 메일로 안내됩니다.​\n부스트캠프에서는 국민내일배움카드 및 KDT 문의에 답변드릴 수 없습니다.​\n관련 문의는 상담센터 ☎1350으로 전화하거나 관할 고용센터에서 확인하시기 바랍니다.​\n지원 전,\n꼭 확인해 주세요.\n더 생생하고 솔직한 부스트캠프 AI Tech가 궁금하다면?​\n온라인 설명회를 확인해 보세요!​바로가기\n지원 관련 안내\n부스트캠프 AI Tech 과정은 기초 AI 지식과 프로그래밍 기본 역량을 필요로 합니다.​\n\nPre-Course와 자가 진단을 통해 기초 역량을 쌓으세요.\n\n[부스트캠프 AI Tech 6기] Pre-Course\n6기 Pre-Course 학습 인증하기 (가산점 5점 부여)\n자기 진단 바로가기\n추가 학습을 위해 아래 강의를 수강해 보세요​.\n\n[파이썬 기초 지식] 모두를 위한 파이썬(PY4E)\n[알고리즘] 파이썬을 이용한 알고리즘의 이해\n[기초 수학지식] 모두를 위한 선형대수학\n[기초 수학지식] 확률론 기초 : Statistics\n테스트 관련 안내\n온라인 AI 역량 테스트는 AI 기초 지식, 기초 수학 지식과 프로그래밍 역량을 확인하는 문제로 구성되어 있습니다.​\n온라인 코딩 테스트는 프로그래밍 역량을 확인하는 문제로 구성되어 있습니다.\n프로그래밍 문항에서 사용 가능한 언어는 C++, JAVA, Python3입니다.​\n유의 사항\n부스트캠프 AI Tech는 본인 스스로 그리고 동료와 함께 성장하는 과정으로 약 5개월이라는 시간을 온전히 집중할 수 있어야 합니다. 시간, 열정, 의지 모두 단단히 각오하신 분들만 지원해 주세요.​\nKDT 전형의 경우, 2023년 10월 15일(일)까지 실물 카드 발급 및 수령이 완료되어야 합니다.\n국민내일배움카드 발급하기\n지원서 제출 후 전형은 변경할 수 없습니다.\n선발 과정 중 지원자에게 결격사유가 있는 경우 합격이 취소될 수 있습니다​.\n부스트캠프 AI Tech 선발 과정 중 테스트는 (주)그렙에서 담당합니다.\n문의 : boostcamp\\_ai@connect.or.kr',' **교육 내용** : AI 전문가 양성을 위한 이론 및 실기 교육과 프로젝트 기반 학습 프로그램\n\n\n**교육 장소** : 온라인(전면 온라인 진행, 운영 상황에 따라 선택 참여로 오프라인 수업 있음)\n\n**교육 대상** : AI 엔지니어라는 목표를 달성할 수 있는 역량을 갖춘 자\n\n**교육 주관** : 네이버','2024-04-11','2024-04-26','2024-05-08','2024-05-31','2024-04-11','2024-04-16','2024-04-22','2024-04-24','19:00:00','21:30:00',NULL,NULL,'2024-04-12 17:53:10','2024-04-27 14:36:46','Ended',NULL,'N'),(95,1,'쉽게 배우는 파이썬','파이썬을 이용한 자동화 스크립트\n\n찜하기\n\n\n\n총 학습일:390일 | 학습시간:26시간 | 난이도:중급 | 강사:김순곤 | 강의금액:77,220원 | 교재:없음\n\n네트워크·프로그래밍\n\nPause\n\nUnmute\n\nCurrent Time 0:07Duration 15:48\n\n1xPlayback RateFullscreen\n\n강의 미리보기\n\n학습수강후기( 24건 )더보기\n\n초보자도 파이썬을 처음 접하는데 어려움 없이 자세히 설명해주시고 따라 가면서 실습코딩도 해보았습니다. 직접 설명해주는 방식이라 지루하지 않고 집중할수 있었습니다. 후반부로 갈수록 강의 속도가 빨라지긴했지만 openAPI를 이용한 실습은 너무 유익했습니다. 빅데이터분석과 관련된 파이썬 중급 교육도 강의해주시면 좋겠습니다.\n\n저는 일반 사무직 근무자인데, 강사님께서 이해하기 쉽게 강의해주셔서 감사했습니다. 전반부는 어느정도 따라갈 수 있겠는데, 후반부는 조금 어려워서 복습강의 들으면서 복습하면 실력이 쑥쑥 성장할 것 같습니다.\n\n상세한 예시를 들어주면서 설명해 주셔서 듣기 매우좋았고 설명 또한 자세하게 설명해 줘서 아주 유익한 시간이었습니다.\n\n예제와 설명 너무 좋았습니다. 향후 파이썬을 이용한 웹프로그래밍 과정이 생겼으면 좋겠습니다.\n\n과정분류\n\nNCS직무분류 : (20010202) 응용SW엔지니어링강의더보기>\n\n수료기준\n\n진도80%이상\n\n신청유형\n\n상세보기\n\n평생교육바우처\n\n\n\n학습기간\n\n2024-04-15 ~ 2024-05-14\n\n※ 학습기간 30일 + 무료 추가학습기간 1년 제공\n\n강의금액 :77dot220원\n\n총 결제금액77dot220원\n\n수강신청\n\n강의목표\n\n최근에 사용자 저변이 큰폭으로 확대되고 있는 파이썬(Python)과 이를 이용한 자동화 기법을 습득합니다.\n\n파이썬이 가진 장점과 개념을 익히고 강력하고 편리한 기능에 대해 학습하고 실제 업무에 적용해봅니다.\n\n쉘스크립트에 기반한 스크립팅과 파이썬 기반의 스크립팅을 비교해 장단점을 파악합니다.\n\n폴더관리자동화, 메일송수신 자동화 등 다양한 자동화 기법을 습득합니다.\n\n강의내용\n\n파이썬이 주로 사용되는 곳과 다른 언어와 비교한 특징을 알아본다.\n\n파이썬에서 모듈 개념을 알아보고 사용법을 알아본다.\n\nprint() 함수를 대체하여 로깅 하는 방법에 대해 알아본다.\n\nimap 메일서버에 대해 이해하고, 구글 지메일 imap 서버에 접속한다.\n\n학습대상\n\nSW개발자, 파이썬 기술습득 희망자\n\n추가정보\n\n학습방법 : HTML5\n\n학습정원 : 150명\n\n수료기준\n\n※ 환산점수 총점이 총점 80점 이상시 수료\n\n※ 진도 80% 이상 진행 필수',' **교육 내용**: 파이썬을 이용한 자동화 스크립트\n\n**교육 장소**: 온라인\n\n**교육 대상**: SW개발자, 파이썬 기술습득 희망자\n\n**교육 시간**: 26시간(총 학습일 390일)','2024-04-07','2024-04-27','2024-04-25','2024-04-27','2024-04-23','2024-05-18','2024-04-28','2024-05-04','11:00:00','18:30:00','60',1,'2024-04-14 13:27:11','2024-04-27 14:36:47','Interviewing',NULL,'N'),(96,1,'asdasdadsasd','여기에 프로그램 세부 내용을 작성해주세요.ssdasdas',' **교육 내용:** 다양한 스케줄 생성 알고리즘 소개\n**교육 장소:** 교육연구정보원 학술강의실\n**교육 대상:** 스케줄 문제에 관심 있는 사람\n**교육 시간:** 2022년 9월 1일 오후 3시 ~ 오후 5시','2024-04-03','2024-04-27','2024-04-16','2024-04-25','2024-04-21','2024-04-30','2024-05-01','2024-05-17','07:30:00','20:30:00','60',3,'2024-04-25 15:00:58','2024-04-25 15:17:16',NULL,'2024-04-25 15:17:16','Y'),(97,1,'김지창','여기에 프로그램 세부 내용을 작성해주세요.ㅁㄴㅇㅁㅇㄴsada',' **교육 내용 :** 신입사원 교육\n**교육 장소 :** 회사 강당\n**교육 대상 :** 신입사원\n**교육 시간 :** 2023년 3월 8일 오전 10시 ~ 오후 12시','2024-04-01','2024-04-30','2024-04-09','2024-04-19','2024-04-23','2024-04-30','2024-04-01','2024-04-16','09:00:00','20:30:00','90',1,'2024-04-25 15:19:51','2024-04-25 15:22:28',NULL,'2024-04-25 15:22:28','Y'),(98,1,'여기에 프로그램 세부 내용을 작성해주세요.','여기에 프로그램 세부 내용을 작성해주세요.여기에 프로그램 세부 내용을 작성해주세요.',NULL,'2024-04-09','2024-04-26','2024-04-03','2024-04-26','2024-04-03','2024-04-27','2024-04-16','2024-04-27','10:30:00','18:30:00','90',2,'2024-04-26 14:26:06','2024-04-26 14:26:38',NULL,'2024-04-26 14:26:38','Y'),(99,1,'> 여기에 프로그램 세부 내용을 작성해주세요.','> 여기에 프로그램 세부 내용을 작성해주세요.',NULL,'2024-04-16','2024-04-26','2024-04-09','2024-04-26','2024-04-02','2024-04-26','2024-04-09','2024-04-26','09:26:00','17:30:00','90',2,'2024-04-26 14:26:57','2024-04-28 17:58:37','Ended','2024-04-28 17:58:37','Y');
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

-- Dump completed on 2024-04-29 17:28:15
