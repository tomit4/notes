### Setup

Considering that it's been a while since I've set up MySQL and Pip, I thought
I'd document some of the basics here again for my own sake:

**Setting Up Mysql**

I opted to setup mysql via docker instead of installing it on bare metal. Simply
use the contained `docker-compose.yml` file with
[docker-compose](https://github.com/docker/compose) to get a very basic mysql
instance up and running:

```sh
docker-compose up -d
```

Confirm it's running using `ps`:

```sh
docker ps
```

As long as it's up and running you can test it to be sure:

```sh
docker exec -it myjsql-basic mysql -u root -p
```

And put in the default root password from the `docker-compose.yml` file.

**Virtual Environments**

You'll want to install `pip` and also get a virtual environment running:

```sh
python -m venv .venv
```

```sh
source .venv/bin/activate
```

Once inside the virtual environment, upgrade the local `pip`:

```sh
python -m pip install --upgrade pip
```

And use that `pip` to install all the packages from `requirements.txt`:

```sh
python -m pip install -r requirements.txt
```

**Confirming MySQL Statements Were Executed:**

From within the `docker exec`'ed mysql repl, for now just use `SHOW DATABASES`
to ensure it went through:

```
mysql> SHOW DATABASES;
```

You should see output like this:

```
+--------------------+
| Database           |
+--------------------+
| employee_db        |
| information_schema |
| myapp              |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
6 rows in set (0.001 sec)
```
