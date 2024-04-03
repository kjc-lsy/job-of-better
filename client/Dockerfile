# 리액트 Dockerfile
FROM node:18.18.0 as build

# 작업 디렉토리를 /app으로 설정합니다. 이후의 명령어들은 이 디렉토리 내에서 실행됩니다.
WORKDIR /app

# 현재 디렉토리의 package.json 파일과 package-lock.json 파일을 컨테이너의 작업 디렉토리(/app)로 복사합니다.
COPY package.json ./

# npm을 사용하여 package.json에 정의된 의존성을 설치합니다.
RUN npm install --legacy-peer-deps

# 현재 디렉토리의 모든 파일을 컨테이너의 작업 디렉토리(/app)로 복사합니다.
COPY . ./

# npm run build 명령어를 실행하여 리액트 애플리케이션을 빌드합니다.
# 결과물은 /app/build 디렉토리에 생성됩니다.
RUN npm run build

# nginx:alpine 이미지를 기반으로 하는 새로운 단계를 시작합니다. 이 단계에서는 빌드된 애플리케이션을 서빙할 웹 서버를 설정합니다.
FROM nginx:alpine

# 빌드 단계에서 생성된 /app/build 디렉토리의 내용을 Nginx가 호스팅하는 디렉토리(/usr/share/nginx/html)로 복사합니다.
COPY --from=build /app/build /usr/share/nginx/html

# 기본 nginx 설정 파일을 삭제한다. (custom 설정과 충돌 방지)
RUN rm /etc/nginx/conf.d/default.conf

# Nginx 설정 파일 복사
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Nginx 포트 개방
EXPOSE 80

# Nginx 서버를 포그라운드에서 실행합니다. 이 명령어는 컨테이너가 시작될 때 실행됩니다.
CMD ["nginx", "-g", "daemon off;"]