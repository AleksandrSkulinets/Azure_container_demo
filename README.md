# Azure_container_demo
This is an example how to run multi container app in azure web apps

Prerequisites
Installed Software:<br>
Docker: Ensure Docker is installed and running on your local machine.<br>
Docker Compose: Needed to manage the multi-container configuration.<br>
Application Setup:<br>
Have your application prepared with a docker-compose.yml file.<br>
Alternatively, you can clone a demo application from this GitHub repository. 

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
Explanation of Docker Compose File:

client: This service builds the client container from the ./client directory using the Dockerfile.prod. It exposes port 80 and depends on the server container.

server: The server is built from the ./server directory and listens on port 5000. It uses environment variables for MySQL connection details.

mysql: The MySQL container uses the mysql:8.0 image and initializes with a root password and database name.

Both client and server should be exposed throug Nginx, you can use this nginx.conf file

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
Note:
Azure Web Apps do not allow you to open arbitrary ports for inbound traffic. Any attempt to use other ports (like port 8080, 5000, or others) will not be allowed for security, stability, and maintenance reasons.

- ## Step 2: Compose your docker images and push them to the DockerHub
- What is Docker Hub?
Docker Hub is a cloud-based repository where developers can store, share, and manage Docker container images. It is the default registry used by Docker, making it a central platform for building, distributing, and discovering containerized applications.
  For free Docker Hub users, public repositories are an essential feature that allows you to share your container images with anyone in the world. 
  
-  run <br>
 ```docker-compose -f <your-compose-file-name>.yml up```<br>
 in my case I use<br>
 ```docker-compose -f docker-compose.yml up```<br>
 to see all your build images run 
 ```docker images```<br>
  you can see example below <br>
   ![Create new web app](https://github.com/AleksandrSkulinets/Azure_container_demo/blob/main/images/11.png?raw=true)
   Tag image of your service (in my case it will be client and server)
<br>```docker tag <source_image> <dockerhub_login>/<target_image>:tag```
<br>in my case it should look like 
<br>```docker tag coocking-db-server aleksandr3/coocking-db-server:latest```
<br>now push your images to DockerHub
<br>```docker push <dockerhub_login>/<target_image>:tag```
<br>Push both client and server images to DockerHub.

- ## Step 3: Create compose file for azure and test it in your local docker if needed
  
 Create your new compose file, it should look like this:
 
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

where "aleksandr3" is DockerHub login and "coocking-db-client" is image name that been pushed in step 2.
Now run your compose file locally to test it:<br>
```docker-compose -f <your-compose-file-name>.yml up```

- ## Step 4: Create Azure web app at azure portal
  Folow the steps spicified on images to crete new web app at Azure Portal
 ![Create new web app](https://github.com/AleksandrSkulinets/Azure_container_demo/blob/main/images/1.png?raw=true)
 ![Image 2](https://github.com/AleksandrSkulinets/Azure_container_demo/blob/main/images/2.png?raw=true)
 ![Image 3](https://github.com/AleksandrSkulinets/Azure_container_demo/blob/main/images/3.png?raw=true)
 ![Image 4](https://github.com/AleksandrSkulinets/Azure_container_demo/blob/main/images/4.png?raw=true)
 ![Image 5](https://github.com/AleksandrSkulinets/Azure_container_demo/blob/main/images/5.png?raw=true)
 ![Image 6](https://github.com/AleksandrSkulinets/Azure_container_demo/blob/main/images/6.png?raw=true)
 ![Image 7](https://github.com/AleksandrSkulinets/Azure_container_demo/blob/main/images/7.png?raw=true)
- Note: You have to wait for some time while the deployment is going on. Azure Web Apps may take a few minutes to deploy and become accessible.
 you can see deployment log example here 
![Image 8](https://github.com/AleksandrSkulinets/Azure_container_demo/blob/main/images/8.png?raw=true)
- ## Step 5: Access Your Deployed App
 Once the deployment process is complete (which may take a few minutes), your app will be available on the Azure Web App URL that you provided during the setup process. To access your app, simply navigate to the following URL:<br>
 ```https://<your-web-app-name>.azurewebsites.net```<br>
 Where <your-web-app-name> is the name you assigned to your Azure Web App. 
 Or you can find URL from your web app overveiw
 
![Image 10](https://github.com/AleksandrSkulinets/Azure_container_demo/blob/main/images/10.png?raw=true)

You should now be able to see your multi-container application live on Azure!

![Image 10](https://github.com/AleksandrSkulinets/Azure_container_demo/blob/main/images/9.png?raw=true)



