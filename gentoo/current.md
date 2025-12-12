# Current Tasks

## Brief Intro

This document ins solely here as a sort of note to my future self regarding
various Gentoo related things I'm working on.

## Kernel 6.18

I've downloaded Kernel 6.18 and it's giving us a few issues. First and foremost
the gentoo kernel devs have turned off iptables in the kernel by default,
forcing us to choose between the `xtables-legacy-multi` or `xtables-nft-multi`
via `eselect`:

```sh
eselect tables list
```

On the old kernel (6.12), we want to stay on 1, as it allows `ufw`/`iptables` to
just work out of the box. On the new kernel (6.18), we want to switch this
profile as it allows docker to run (sort of, see below), but `ufw` outright will
not work as it relies on iptables.

What this means in essence is we have to convert over to `nftables`, which I've
successfully tested is, while certainly more involved than `ufw`, is not that
difficult.

[Gentoo Wiki's nftables entry](https://wiki.gentoo.org/wiki/Nftables)

You may also want to review the
[Gentoo Wiki's iptables entry](https://wiki.gentoo.org/wiki/Iptables).

Now, the issue still remains that `docker` also breaks because it heavily
depends on `iptables`, and `nftables` support is
[experimental as of version 29](https://docs.docker.com/engine/network/firewall-nftables),
a version that Gentoo currently does not have in its
[repos](https://packages.gentoo.org/packages/app-containers/docker).

I have found evidence that there is a compatibility layer between `iptables` and
`nftables` which some have gotten to work on Debian called `iptables-compat`. I
have enabled a USE flag on `nftables` called `xtables` which supposedly tries to
address this compatibility. I have not yet tested this on kernel 6.18, but will
do so when we have time.

## Zen Kernel 6.18

This all came about while learning about Gentoo Kernel compilation for the first
time, and while I have gotten a version of 6.12 working, 6.12.59 specifically.
While stable, I am more used to the bleeding edge of Artix Linux and would like
to have the Zen Kernel patches applied. The Zen Kernel via the Gentoo repos is
only within the last few versions and that is why I started playing around with
this.

In short, get the regular 6.18 kernel working, save the .config, redownload the
zen kernel, apply this config and run `make olddefconfig` and you should not
have these incompatibility issues. See `updating.md` for details on how to
upgrade to the zen kernel once you have the regular kernel compiled and working.
