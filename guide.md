### MAC 기준 CERT 생성
1. brew install certbot
2. sudo certbot certonly --standalone -d tomhoon.my
3. 확인하기
   > /etc/letsencrypt/live/tomhoon.my/fullchain.pem
   > /etc/letsencrypt/live/tomhoon.my/privkey.pem


### copy certs
#### 서버에 있는 certs를 docker로 옮김
#### 이미지 생성 전 메뉴얼로 쳐줘야함
#### 이미 있다면 안해도됨
- cp /etc/letsencrypt/live/tomhoon.my/*.pem ./certs/


---


### make image
- docker build -t default-nginx-image .


### make & run docker container 
### docker nginx -> docker spring boot를 위해 아래 설정이 필요
   > 네트워크 묶기
   > 도커 컨테이너 사설 Ip를 default.conf에 설정

   
- docker run -d -p 980:80 -p 443:443 --network chatting-network --name default-nginx-container default-nginx-image
