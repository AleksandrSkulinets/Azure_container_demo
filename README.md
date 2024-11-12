# Azure_container_demo
This is an example how to run multi container app in azure web apps

Before you begin, ensure that you have the following installed on your local machine:

- Docker
- Docker Compose

- ## Step 1: Set Up Your Docker Compose File

The following is an example of a `docker-compose.yml` file for your app. This configuration includes three services: `client`, `server`, and `mysql`.

```yaml
version: '3.8'

services:
  client:
    build:
      context: ./client
      dockerfile: Dockerfile.prod
    ports:
      - "80:80"  # NGINX serving on port 80
    depends_on:
      - server

  server:
    build:
      context: ./server
      dockerfile: Dockerfile.prod
    expose:
      - "5000"  
    environment:
      - NODE_ENV=production
      - MYSQL_HOST=mysql  
      - MYSQL_USER=root
      - MYSQL_PASSWORD=password
      - MYSQL_DATABASE=mealapp
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: mealapp
    volumes:
      - mysql-data:/var/lib/mysql
    expose:
      - "3306"

volumes:
  mysql-data:
```
Explanation of Docker Compose File
client: This service builds the client container from the ./client directory using the Dockerfile.prod. It exposes port 80 and depends on the server container.
server: The server is built from the ./server directory and listens on port 5000. It uses environment variables for MySQL connection details.
mysql: The MySQL container uses the mysql:8.0 image and initializes with a root password and database name.

My nginx.conf file
```server {
    listen 80;

    # Serve React app
    root /usr/share/nginx/html;  # Location of your React build files
    index index.html;

    # Serve static files directly
    location / {
        try_files $uri /index.html;
    }

    # Proxy API requests to the Express server
    location /api/ {
        proxy_pass http://server:5000;  # Redirect to the 'server' service on port 5000
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Optional: Configure logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
}
```
Azure Web Apps do not allow you to open arbitrary ports for inbound traffic. Any attempt to use other ports (like port 8080, 5000, or others) will not be allowed. This is for security, stability, and maintenance reasons.
- ## Step 2: Compose your docker images and push them to the DockerHub
- run ```docker-compose up --build```
- to see all your build images run ```docker images```
- tag image of your service (in my case it will be client and server)
```docker tag <source_image> <dockerhub_login>/<target_image>:tag```
in my case it should look like 
```docker tag coocking-db-server aleksandr3/coocking-db-server:latest```
now push your ```docker push <dockerhub_login>/<target_image>:tag```
push both client and server to dockerhub.
- ## Step 3: Create compose file for azure and test it in your local docker if needed
- my compose file now looks like this
```yaml
 version: '3.8'

services:
  client:
    image: aleksandr3/coocking-db-client  
    depends_on:
      - server
    ports:
      - "80:80"  

  server:
    image: aleksandr3/coocking-db-server 
    expose:
      - "5000"
    environment:
      - NODE_ENV=production
      - MYSQL_HOST=mysql
      - MYSQL_USER=root
      - MYSQL_PASSWORD=password
      - MYSQL_DATABASE=mealapp
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: mealapp
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
```

where aleksandr3 is my dockerhub login and coocking-db-client is my image that I've pushed in step 2
now run your compose file locally to test it:
```docker-compose -f <your-compose-file-name>.yml up```
- ## Step 4: Create Azure web app at azure portal
- folow the steps spicified on images to crete new web app
- ![Create new web app](https://github.com/AleksandrSkulinets/Azure_container_demo/blob/main/images/1.png?raw=true)



