docker build -t myexpressapp:1.0 .


docker run -p 3000:3000 --name express-container -e "NODE_ENV=production" myexpressapp:1.0

docker stop express-container
docker rm express-container

docker run -it --rm docker.io/library/url-shortener-app sh