# Backing Up On Artix

## Backing Up:

Plug in your backup drive:

```sh
mount /dev/sda1 /mnt/media/usb-drive
```

```sh
doas rsync -aHAXS --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found","/home/brian/Videos/*","/home/brian/Documents/books/*","/home/brian/Downloads/*","/home/brian/Music/*","/home/brian/Pictures/*","/home/brian/Games/*"} /* /mnt/media/usb-drive/backup
```

## Restoring:

Plug in the Artix base ISO (runit):

```
artixiso login: root
```

```sh
fdisk /dev/nvme0n1
```

#### boot

```
g (!! removes all disk partitions and creates a new GPT disklabel !!)

n (new partition)
t (select type of partition)
1 (mark the partition as an EFI system partition)
p (partition number)
Partition number (1 - 128, default 1): 1
First sector: (leave blank for default)
Last sector: +300M

n (new partition)
p (partition number) 2
default
default

w
```

```sh
mkfs.fat -F 32 /dev/nvme0n1p1
```

```sh
mkfs.ext4 /dev/nvme0n1p2
```

Now here is where we deviate from the installation:

```sh
mount /dev/nvme0n1p2 /mnt
```

```sh
mkdir /mnt/boot
```

```sh
mount /dev/nvme0n1p1 /mnt/boot
```

And run the rsync backup script:

```sh
rsync -aHAXS --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"}  /mnt/media/usb-drive/backup/* /mnt
```

Now, to ensure that GRUB + mkinitcpio work:

```sh
mount --bind /dev /mnt/dev
mount --bind /proc /mnt/proc
mount --bind /sys /mnt/sys
mount --bind /run /mnt/run
```

Now chroot into the restored system:

```sh
artix-chroot /mnt
```

And regenerate grub:

```sh
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
```

```sh
grub-mkconfig -o /boot/grub/grub.cfg
```

Make sure to regenerate the initramfs (important!):

```sh
mkinitcpio -P
```

And exit and reboot:

```sh
exit
```

```sh
umount -R /mnt
```

```sh
reboot
```

## If all went well...

If all went well, you'll boot into a standard arch install, but with no Videos,
Games, Music, books, Pictures, Downloads (too large, pick the ones you want from
your backup).
