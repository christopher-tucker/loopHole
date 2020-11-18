FROM node:10.19.0
COPY . /loopHole
WORKDIR /loopHole
RUN npm install
CMD npm start
EXPOSE 3000


# docker run -p 0.0.0.0:80:3000 -d --restart unless-stopped --name loophole-container christuckerdocker/loop-hole

# sudo docker login
# sudo docker build .
# Successfully built 130b903ff981
# tuckcity@ctucker-linux:~/dev/loopHole$ sudo docker tag 130b903ff981 christuckerdocker/loop-hole
# tuckcity@ctucker-linux:~/dev/loopHole$ sudo docker push christuckerdocker/loop-hole