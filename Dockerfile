FROM node:10.19.0
COPY . /loopHole
WORKDIR /loopHole
RUN npm install
CMD npm start
EXPOSE 3000


# sudo docker login
# sudo docker build .
# Successfully built 130b903ff981
# sudo docker tag 130b903ff981 christuckerdocker/loop-hole
# sudo docker push christuckerdocker/loop-hole

# to do the build and tag in once shot, try:
# sudo docker build -t christuckerdocker/loop-hole


# ========== in the container =============


# sudo docker run -p 0.0.0.0:80:3000 -d --restart unless-stopped --name loophole-container christuckerdocker/loop-hole

# sudo docker exec -it loophole-container bash


# =========================================
