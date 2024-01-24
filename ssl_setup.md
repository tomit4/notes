## Setting Up SSL

### Introduction

This document is meant to act as a short instruction on how to set up
SSL certificates for applications running via docker, and served up via NGINX.
It is also a short introduction to Domain Registration, and setting up your
first VPS. These topics are rarely covered in beginner web development topics as
they are usually relegated to the realm of DevOps and Systems Administrators,
but it is in my opinion this skill is worth having for any person wanting
to work in tech.

You'll need a beginner understanding of Docker, NGINX, Git, SSH, and the
Linux Command Line. In this short tutorial, we'll be covering purchasing and
setting up a Domain via the NameCheap Registrar. Additionally we'll assume you
have a Linode/Akamai instance running with basic firewall, ssh rules, and
fail2ban set up on a basic Linux VPS. Afterwards which we will be allocating A records so that
our VPS from Linode has DNS records, which allow LetsEncrypt via Certbot to "see" our domain.

We'll spin up our docker container(s), exposing at least one docker container's port to our Host VPS,
and then configure NGINX to reverse proxy this port out onto the live internet.
Lastly we'll utilize LetsEncrypt's certbot to establish ssl certificates which
we will then redirect our reverse proxy through, giving us HTTPS encryption.

### Purchasing a Domain

There are many businesses where one can purchase domains. Known as Domain
Registrars, these businesses negotiate the registration of domain names with the
[ICANN](https://www.icann.org/), otherwise known as The Internet Corporation for Assigned Names and Numbers.
I personally use [NameCheap](https://www.namecheap.com/), but other popular
Domain Registrars include [Google Domains](https://domains.google/) and [PorkBun](https://porkbun.com/).
Once you've thought of a good Domain Name where your planned website/application
will live on the website, search the registrar to see their pricing. Sign up if
the price is agreeable to you and purchase the domain. Signing up for a domain
is a yearly subscription, so you will want to look carefully to see how much you will
be charged per year as oftentimes the first year (at least on NamepCheap) is at
a discount, and the yearly renewal fee is more expensive. Keep in mind that
prices do occassionally go up with inflation, and that should you ever fail to
renew your Domain Name, the price of purchasing the same domain name later down
the line is likely to be significantly higher to repurchase.

### Purchasing a VPS

Like Domain Registrars, there are many options for Cloud Hosting via a
VPS(Virtual Private Server), the most popular being that of [AWS](https://aws.amazon.com/),
or Amazon Web Services. I have not, at the time of this writing, worked with AWS, as their
ecosystem is very specific and could be argued to be a skillset in its own right
which simply incorporates aspects of VPS hosting.

Other, more hands on, and more bare bones alternatives include services like
[Digital Ocean](https://www.digitalocean.com/), [Linode/Akamai](https://www.linode.com/), and [Vultr](https://www.vultr.com/). There are a multitude of others, but I am most familiar with Linode, so that is what we are going to cover.

Unfortunately, the setting up of a VPS is a subject of its own, so this document
will assume that you have a basic understanding of the Linux command line, and
can follow [Linode's basic setup](https://www.linode.com/docs/products/compute/compute-instances/guides/create/). I recommend getting the cheapest shared CPU option if you are just starting out, especially if you're just starting out and want to learn the basics of VPS Cloud administration.

Once set up, you'll be assigned an IP address which should be open to the
internet via ssh. If you are familiar with setting up a bare bones Linux
distribution like Gentoo, Debian, or Arch Linux, then this will be very familiar
to you. However, if you are simply very comfortable in the Linux command line,
then you should be fine to work in this environment as well.

I won't be covering how to set up basic security infrastructure on your VPS,
sufficient to say you should at least set up firewall rules (only necessary
ports should be open to the public), ssh rules (no root login), complex password
set up(no obviously easy to guess passwords), and fail2ban (maximum number of
login attempts should be set up). Once all is in place, you should store your
VPS's raw IP address securely like you would other sensitive credential
information. While this ip address is visible on the internet to anyone curious
via tools like dnslookup, it is not advisable to make it overly easy to find out by just leaving it
laying around (don't post it on social media, don't commit the ip address up to
github, etc).

### Setting up NGINX and Docker

For the sake of brevity, I'll simply point you to Linode's documentation on
[setting up NGINX](https://www.linode.com/docs/guides/getting-started-with-nginx-part-1-installation-and-basic-setup/).

You'll also need docker and docker-compose for this tutorial:

```bash
sudo apt install docker docker-compose
```

It's likely you'll need to enable docker using systemd:

```
systemctl enable docker
```

01/24/2024
NOTE: This document is getting rather lengthy and I realize that this will need
extensive research, images, and command line tutorials to get truly right. Turn
this into a blog post (or 2), and put it there.
