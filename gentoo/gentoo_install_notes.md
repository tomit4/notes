## On Connecting to Your Wireless Network From the ISO The first time

The handbook doesn't cover exactly how to connect wirelessly the first time. It
can't solely be done via dhcpcd.

Firstly find your wireless card interface reference:

```sh
ip addr
```

Or:

```sh
ifconfig
```

It will look like `wlps60` or something like that.

The ISO comes with wpa_supplicant for connecting. First configure wpa_supplicant
with your WIFI SSID and password:

```sh
wpa_passphrase "SSID" "PASSWORD" > /etc/wpa_supplicant/wpa_supplicant.conf
```

Then configure wpa_supplicant to recognize this wifi network:

```sh
wpa_supplicant -B -i wlps60 -c /etc/wpa_supplicant/wpa_supplicant.conf
```

Then use `dhcpcd` to grab an IP address:

```sh
dhcpcd wlps60
```

And use `ping` to test:

```sh
ping 8.8.8.8
```

You might still have trouble downloading the stage 3 tarball if your DNS does
not resolve. In which case simply edit `/etc/resolv.conf` directly:

```
# /etc/resolv.conf
# Quad 9
nameserver 9.9.9.9
nameserver 149.112.112.112

# Alternatively:
# Cloudflare
nameserver 1.1.1.1
nameserver 1.0.0.1
```

## General Notes

A general speedrun guide to installing gentoo can be found at:

https://www.reddit.com/r/Gentoo/comments/td684v/need_help_for_first_time_setting_up_a_virtual/

Install a basic distribution-bin kernel first, then you can:

You can get your current compiler flags from:

zcat /proc/config.gz

You can just output it and then save it as a default that you have.

Also, you can find these same compiler flags in:

/usr/lib/modules/$(uname -r)/build/.config

You actually can use this in the /usr/src/linux-kernel-version

But you just want to make sure to run: `make olddefconfig` to update with new
options/safe defaults before running the compiling make commands documented in
the Gentoo Handbook.

Watch mental outlaws videos on configuring the kernel (one is more in depth than
the others). Make notes on the options he changes and actually research the
specific flags he configures in the handbook.

At some point you can adjust the number of threads the kernel can use, which
apparently defaults to a high number. Your Ryzen has 24 threads, but you can
find out specifically by running

```
grep -c processor /proc/cpuinfo
```

Or:

```
lscpu
```

And looking at the "Thread(s) per core" section.
