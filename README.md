# job-of-better

취업 컨설팅을 위한 웹 사이트로, 교육생과 프로그램 관리 및 학생 모집 기능을 제공합니다.

> [!Important]
> 프로젝트 루트 경로의 `.env` 파일을 통해 DB 비밀번호, JWT 비밀키 등을 관리합니다.  
> 텍스트 에디터를 사용하여 이를 수정한 후 웹 서버 설치를 진행해 주세요.


## Features

- 인증
  - 로그인
  - 회원가입
- 학생
  - 회사, 교육 프로그램 선택
  - 자기소개서 입력
  - 이력서 입력
  - 학생 마이페이지
- 회사
  - 학생 관리
  - 교육 프로그램 관리
  - 회사 마이페이지

## System Requirements

- Mac OS: macOS 10.9 (Mavericks) 이상
- Linux: 커널 버전 3.10 이상을 권장(Ubuntu 18.04 LTS 이상, CentOS 7 이상, Debian 9 이상 등)

## Getting Started

### 사전 요구사항

> [!Note]
> 이 프로젝트는 Docker와 Docker Compose를 사용하여 로컬 환경에서 쉽게 실행할 수 있도록 구성되어 있습니다.  
> 다음 단계를 따라 프로젝트를 설정하고 실행하세요.   
> Docker 설치 방법은 [Docker 공식 문서](https://docs.docker.com/desktop/)를 참조하세요.
 
### **설치 및 실행 단계**

1. **프로젝트 클론**

   Git을 사용하여 이 프로젝트를 로컬 시스템으로 클론합니다.
    ```bash
    git clone https://github.com/dealim/job-of-better
    cd job-of-better
    ```

1. **환경변수 설정**
   
   프로젝트 루트 경로에 `.env` 파일을 생성한뒤 다음과 같이 입력합니다.
   ```
   ## required ##
   
    MYSQL_URL=mysql-server:3306
    MYSQL_ROOT_PASSWORD=<DB ROOT 비밀번호>
    MYSQL_DATABASE=<DB 이름>
    MYSQL_USER=<DB 사용자 계정>
    MYSQL_PASSWORD=<DB 사용자 비밀번호>
    
    REACT_APP_ENV=production
    REACT_APP_PROXY=https://springboot-app:9090
    
    JWT_SECRET_KEY=<생성된 JWT Secret Key>

   ## optional ##
   
    #GCP에서 받은 서비스키는 프로젝트 root 경로에 위치시킨뒤, 파일명을 환경변수로 설정합니다.
    VERTEX_AI_SERVICE_KEY_FILENAME=<GCP vertex-ai 서비스 키(json) 파일명> 

    AWS_BUCKET_NAME=<AWS BUCKET NAME>
    AWS_ACCESS_KEY=<AWS ACCESS KEY>
    AWS_SECRET_KEY=<AWS SECRET KEY>
    AWS_REGION=<AWS REGION>
   ```
    - JWT 키는 최소 32바이트 길이를 권장합니다. 비밀키 생성에는 [password generator](https://passwords-generator.org/)를 사용할 수 있습니다.
    - 이 프로젝트는 VERTEX-AI 와 AWS 버킷을 사용하고 있습니다.  
    - 키가 없어도 프로젝트를 실행해 볼 수 있으나, 파일 업로드와 ai 교육 요약 기능이 제한됩니다.
5. **Docker 이미지 빌드 및 컨테이너 실행**

   프로젝트 루트경로로 이동하여 Docker Compose를 사용해 서비스를 빌드하고 실행합니다.
    ```bash
    docker-compose up --build
    ```
   빌드가 완료되고, Spring Boot, React, MySQL 총 세 개의 컨테이너가 실행됩니다.

6. **웹사이트 접속**
   
   브라우저를 열고 `http://localhost:3000`으로 접속합니다. 애플리케이션의 홈페이지가 표시됩니다.

## Architecture


## Folder Structure

```

```

## Roles


## Demo Video

## Demo Pictures

## License
MIT License Copyright (c) 2024 dealim
