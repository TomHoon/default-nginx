### 0. 사전내용
1. Docker 내부라 private ip로 바인딩
2. 주의)Spring Boot내에 Cors처리 되면 Cors가 난다.

### 1. MAC 기준 CERT 생성
1. brew install certbot
2. sudo certbot certonly --standalone -d tomhoon.my
3. 확인하기
   > /etc/letsencrypt/live/tomhoon.my/fullchain.pem
   > /etc/letsencrypt/live/tomhoon.my/privkey.pem
  
---


### 2. copy certs
#### 서버에 있는 certs를 docker로 옮김
#### 이미지 생성 전 메뉴얼로 쳐줘야함
#### 이미 있다면 안해도됨
- cp /etc/letsencrypt/live/tomhoon.my/*.pem ./certs/


---


### 3. make image
- sudo docker build -t default-nginx-image .


---


### 4. make & run docker container 

---


### 5. docker nginx -> docker spring boot를 위해 아래 설정이 필요
   > 네트워크 묶기
   > 도커 컨테이너 사설 Ip를 default.conf에 설정


---


   
- docker run -d -p 580:80 -p 443:443 --network chatting-network --name default-nginx-container default-nginx-image
