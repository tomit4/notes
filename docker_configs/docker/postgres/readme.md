## Setting up Redis With Docker

**NOTE:**

This is just a starting point for using redis within docker. Eventually we'll
need to set up an image that utilizes nodejs/npm to install our backend
dependencies, postgresql, and redis to all work within a single container. See
[this helpful tutorial](https://geshan.com.np/blog/2022/01/redis-docker/).

To run this simple container, simply invoke:

```
docker-compose -f docker-compose.yml up -d
```

And if you want to interact with the redis instance via the cli:

// NOTE FOR POSTGRES, EDIT THIS:

```
docker exec -it <CONTAINER_ID> psql -U <USERNAME>
```
