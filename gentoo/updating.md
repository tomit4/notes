# Updating Gentoo

Gentoo has a lot of little nuances that are worth noting.

## Basic Updating

Not too much to go into depth on here.

```sh
emerge --sync
emaint -a sync
```

```sh
eselect news read all | less
```

```sh
emerge -auDN @world
```

```sh
emerge -a --depclean
```

## Unmasking

Sometimes you'll have to unmask packages that are considered unstable (usually
by tacking on the `amd64` flag). Consult
/etc/portage/package.accept_keywords/package.unmask file for formatting.

## Use Flags

Adjusting program flags are one of the major features of Gentoo. To unmask
packages, just dump it into /etc/portage/package.use/package.use file.

If during installation of a new package you get a warning to add necessary use
flags, you can do so by manually editing aforementioned package.use file or
using:

```sh
dispatch-conf
```

## Updating Kernels

This is a bit more involved. Firstly you'll need sys-kernel/gentoo-sources. If
you need a specific version, you'll usually first have to unmask it by version
number (see unmasking above).

Once installed navigate to `/usr/src/linux-version-you-want-to-use`.

Inside that linux version, you'll need to compile the kernel. I've opted to use
modprobed-db for this purpose as it creates a minimal config by simply
periodically running a cron job to see what modules/flags need to be set in the
kernel. This file lives in `~/.config/modprobed.db`.

To use this as your default navigate into the kernel folder in `/usr/src` and
run:

```sh
make LSMOD=$HOME/.config/modprobed.db localmodconfig
```

This will generate the `.config` file necessary. You might still need to adjust
certain flags if you find the kernel doesn't work or doesn't have the features
you want. In that case run:

```sh
make menuconfig
```

And adjust the config options that are missing/misconfigured.

If all seems to be to your liking however, just make the kernel:

```sh
make -j$(nproc)
```

Or specify the amount of jobs you want make to run at a time, I like 6.

After compiling (could take a while depending). Install the modules:

```sh
make modules_install
```

And also install the kernel:

```sh
make install
```

## NVIDIA Drivers

The NVIDIA drivers have to be reinstalled for every kernel you install, in order
to do this, you'll first need to either `eselect` your new kernel or manually
symlink the new kernel yourself. The reasons you might want to manually symlink
it is if you manually changed the name of your kernel in the `.config` file.

To use the `eselect version`, simply run:

```sh
eselect kernel list
```

And choose the new kernel:

```sh
eselect kernel set 2
```

Or whichever number your kernel is. If you instead wish to manually update the
symbolic link, you can do so by invoking:

```sh
ln -sf /usr/src/linux-kernel-you-want-to-use /usr/src/linux
```

Either way, this will select your kernel and now you can install the NVIDIA
modules you need:

```sh
emerge -a @module-rebuild
```

Once this is done, go ahead and reboot. If all went well, you'll have a new
kernel installed and ready to go!

## Uninstalling Old/Unwanted Kernels

Okay, so there is a package for this called `eclean`, but I'd prefer to take a
hands on approach to this as removing kernels should be done with care. Removing
your last working kernel is NOT something you ever want to do (and why you
should always backup /boot along with almost everything on your system).

Navigate to `/boot`. There you will find files like:

```
config-6.12.54-gentoo-dist
initramfs-6.12.54-gentoo-dist.img
System.map-6.12.54-gentoo-dist
vmlinuz-6.12.54-gentoo-dist
```

And if you ever recompiled the same kernel, it will also generate `.old` files.

```
config-6.12.54-gentoo-dist.old
initramfs-6.12.54-gentoo-dist.img.old
System.map-6.12.54-gentoo-dist.old
vmlinuz-6.12.54-gentoo-dist.old
```

Once you have confirmed these are your old/unwanted kernels, remove them
carefully using rm, make sure not to use the wildcard `*` character here as you
can easily accidentally remove something you want here.

```
rm config-6.12.54-gentoo-dist
rm initramfs-6.12.54-gentoo-dist.img
rm System.map-6.12.54-gentoo-dist
rm vmlinuz-6.12.54-gentoo-dist
```

And make sure to regenerate your grub config so that it's made "aware" of the
changes.

```sh
grub-mkconfig -o /boot/grub/grub.cfg
```

And that's it!
