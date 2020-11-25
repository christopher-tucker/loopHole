FROM node:10.19.0
COPY . /loopHole
WORKDIR /loopHole
RUN npm install
CMD npm start
EXPOSE 3000




# sudo docker login
# to do the build and tag in once shot, try:
# sudo docker build . -t christuckerdocker/loop-hole
# sudo docker push christuckerdocker/loop-hole



# ========== in the container =============


# sudo docker pull christuckerdocker/loop-hole:latest
# sudo docker run --network=loophole-network -d --restart unless-stopped --name loophole-api christuckerdocker/loop-hole

# sudo docker exec -it loophole-container bash


# ================ run command for load balancer ================
# sudo docker run --name loophole-lb-container -v ~/dev/loopHole/lbconfig:/etc/nginx/ -it --rm --network=loophole-network -p 3004:80 nginx:latest