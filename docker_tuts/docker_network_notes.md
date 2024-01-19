### An Introduction to Docker Networks

Docker containers can "talk" to each other via a networking service known as a "docker bridge".
This acts very much like a central network server, or router, which takes the myriad of network
requests from various docker containers and "orchestrates" them, allowing docker containers to
interact.

#### Creating A Basic Network From Scratch

Creating a network instance involves the following command:

```bash
docker network create web_server --driver
```

This will return a long hash that acts as the network id.

We can inspect the status of this network, as well as how many containers are
running on this network via the following command:

```bash
docker inspect web_server
```

This will return a JSON output, under the "Containers" field, you will see that
there are no containers currently running on this docker network.

We can now demonstrate the basic interaction between two docker containers by
pulling in docker images, such as an nginx that provides an api to an alpine
linux server:

```bash
docker pull nginx:1 && docker pull alpine:3
```

Now let's use our images to create the server(nginx) and client(alpine) using
docker run. Note here how we specify the network using the '--network' flag:

```bash
docker run -dit --name server --network web_server nginx:1
```

```bash
docker run -dit --name server --network web_server alpine:3
```

If we now reinvoke our docker inspect command, we will see under the
"Containers" field, we will see our two containers:

```bash
docker inspect web_server
```

Let's go ahead and inspect our client server further by "entering" the container
using an interactive shell:

```bash
docker attach client
```

Two test our interactivity, let's use the classic curl command to test the
network (ensure it is installed using alpine's package manager, apk):

```bash
apk add curl && \
curl http://server:80
```

You should now see the default success page from nginx displayed as HTML
("Welcome to nginx!")

You can escape the container using (ctrl+p+q), ...or just type exit??

We can now attach more clients to this established network very much like
before:

```bash
docker run -dit --name client2 --network web_server alpine:3 && docker attach
client2
```

```bash
apk add curl && \
curl http://server
```

Detatch from this container, and running:

```bash
docker inspect web_server
```

Should show the third container in the JSON output.

You additionally can inspect all docker containers running on a network using
the following command:

```bash
docker network ls
```

Which will output a more CSV style output similar to other docker ls commands.

#### Creating a Basic Docker Network With Existing Containers

Additionally we can set up a network between existing containers.

Firstly, let's create a simple network called 'secure-network' like so:

```bash
docker network create secure-network
```

Very similar to our above section, we will now take an nginx image and run it
over our new secure-network like so. This is assuming a container named 'finance'
has already been created. The name 'finance' here is to hammer home the point
that this container contains sensitive information that can only communicate
over our 'secure-network' docker network:

```bash
docker run -d --name finance --network=secure-network nginx:latest
```

If we then print out our running docker containers, we should see that this
container is running:

```bash
docker ps
```

Now if we inspect this container:

```bash
docker inspect finance
```

We'll see a lengthy JSON output with data about our container. This includes the
"Networks" field, which instead of showing the default "bridge" subfield, it
should now show our custom "secure-network" as main subfield name under our
"Network" field (you can run docker inspect $OTHER_CONTAINER_NAME on a a
container that isn't running on a network, you will see that this field
is indeed "bridge").

We can now test the security of our network by entering one of our bridge
containers and testing the connection via ping. Copy the ipaddress located in
the subfield "IPAddress" of our finance container. Then enter another container
that is not on this secure_network, and is instead using the default bridge
network. From that container, attempt to ping the copied ipaddress and you will
note that you cannot, because the finance container is no longer exposed to the
host bridge network.

If we wish to not isolate the docker container from the host network (we want to
directly expose the docker container's ports to the host), we can do so
by passing the 'host' field when we create our docker container like so:

```bash
docker run -d --name host-demo --network=host nginx:latest
```

If we then inspect the host-demo:

```bash
docker inspect host-demo
```

We'll see under the "Networks" field that the "IPAddress" field is blank, that
is because, as mentioned earlier, this docker container is exposed directly to
our host network.
