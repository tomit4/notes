## Basic Docker Usage with Node/Express backend

This small project was taken from an article over at [nodejs.org](https://nodejs.org/en/docs/guides/nodejs-docker-webapp).

### Of Note:

Ensure that you have a .dockerignore file so that you don't copy your
node_modules to the docker image:

```
node_modules
npm-debug.log
```

### Build, run, test:
```
docker build . -t <your username>/node-web-app
```
```
docker run -p 49160:8080 -d <your username>/node-web-app
```

Note that this is exposing docker's port 8080 to the host machine's port 49160
in this case, so after running the image you can visit it on your host machine
by going to localhost:49160, or for something this simple you can just use curl:

```
curl -i localhost:49160
```

If you want to go inside the container to check out the inside:

```
docker exec -it <container id> /bin/bash
```

### Further Reading:

[Building Efficient Dockerfiles - Node.js](https://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/)

[Introducing `npm ci` for faster, more reliable builds](https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable)
