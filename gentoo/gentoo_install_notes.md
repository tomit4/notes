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

## On mirrorselect

At some point during the installation process, you'll be asked to select your
mirrors. Instead of using the handbook's method, use this instead to get the
fastest available mirrors:

```sh
mirrorselect -s3 -b10 -D
```

This will take a bit of time, but will ping and download 100KB from each mirror
and then choose the fastest 3 and append it to your `/etc/portage/make.conf`
file.

## On fstab

There is a way to automate fstab population using a package.

```sh
emerge -av sys-fs/genfstab
```

Then simply invoke it:

```sh
genfstab
```

Double check it:

```sh
cat /etc/fstab
```

## General Notes

Here is a
[general speedrun guide to installing gentoo](https://www.reddit.com/r/Gentoo/comments/td684v/need_help_for_first_time_setting_up_a_virtual/)

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

Note on Krita/Cuda/obs-studio:

Don't bother installing krita/cuda, the process is too in depth and time
consuming, if you really need krita/obs-studio, just use flatpak. If you really
need Cuda, consider using Vulkan instead (for llama.cpp).

## After Installation

There's a lot to do after installation, but one of the first things you should
do is:

**Create a New SuperUser**

```sh
adduser $USER &&
useradd -aG wheel $USER
```

In package.use add:

```sh
app-admin/doas persist
```

Then install `doas`:

```sh
emerge -av app-admin/doas
```

Edit `/etc/doas.conf`:

```sh
permit persist :wheel
```

Test it:

```sh
su $USER
doas emerge -av <some-package>
```

## Install openrc-init as PID 1

By default, while Gentoo does use openrc as the service manager, it does not use
it as init, rather wrapping SysVInit instead. OpenRC does have an init package
however that can be used as init, it just has some caveats.

[See The Gentoo Wiki For Full Details](https://wiki.gentoo.org/wiki/OpenRC/openrc-init)

Make sure your system is running fine under sysvinit before proceeding.

Openrc-init is installed by default, no need to emerge.

You just need to change this line in your `/etc/default/grub`:

```
#GRUB_CMDLINE_LINUX_DEFAULT=""
GRUB_CMDLINE_LINUX_DEFAULT="init=/sbin/openrc-init"
```

And, of course, regenerate:

```sh
grub-mkconfig -o /boot/grub/grub.cfg
```

You'll need to reinstantiate the tty's though:

```sh
cd /etc/init.d
for n in $(seq 1 6); do ln -s agetty agetty.tty$n; rc-update add agetty.tty$n default; done
```

Then reboot to have it take effect.

```sh
reboot
```

Note that some aliases for shutting down and rebooting in your `.aliases` file
are helpful here:

```sh
alias shutdown="doas openrc-shutdown -p 0"
alias reboot="doas openrc-shutdown -r 0"
```

## Common packages

There are tons of packages I like, but a few that will be necessary once X11 is
installed are:

[Matcha Themes](https://github.com/vinceliuice/Matcha-gtk-theme)
[Papirus Icon Theme](https://packages.gentoo.org/packages/x11-themes/papirus-icon-theme)
[Gobble Window Swallower](https://github.com/EmperorPenguin18/gobble/)

You can easily find the rest on Gentoo Wiki or Github.

- LXAppearance
- PAVUControl (audio)
- Gcolor3
- XFCE4-Screenshooter
- difftastic (make sure to configure for use with git)
- ripgrep
- espanso (bring your own)
- neovim (bring your own)
- bspwm/sxhkd (bring your own)
- btop (bring your own catpuccin themes)
- st (bring your own, but install official first so libs are available, then
  uninstall and put your own in `/usr/bin`)
- pipewire/pipewire-pulse/wireplumber (see `.xinitrc`)
- xbanish
- dunst
- sxiv (pic viewer)
- ripdrag
- pcmanfm
- gimp
- inkscape
- krita (flatpak)
- libreoffice (flatpak ?)
- obs-studio (flatpak!!)
- wine
- vulkan
- ufw (kernel params)
- docker (kernel params)
- nvidia-drivers (see
  [wiki](https://wiki.gentoo.org/wiki/NVIDIA/nvidia-drivers))
- [llama.cpp](https://github.com/ggml-org/llama.cpp) (compile with vulkan, not
  cuda)

You'll also need fonts:

```sh
emerge -av media-fonts/fonts-meta media-fonts/corefonts media-fonts/symbols-nerd-font
```
