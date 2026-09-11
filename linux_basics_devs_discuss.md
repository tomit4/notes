# Linux Basics

## Introduction

This is an informal document just documenting some very basic things about Linux
that I've found over the years.

## Terminology

**Linux**

Also known as GNU/Linux (GNU standing for GNU's not UNIX), is an operating
system that is FOSS (Free and Open Source) under the GPL-2 License (GNU Public
License, version 2). It is free to distribute and modify the source code and it
is required by the license to include the source code with the application
itself.

Linux is named after its founder Linus Torvalds, who first released the Linux
Kernel in 1991.

**Kernel**

The Kernel is a computer program that sits at the core of the computer operating
system, after the bootloader initializes from the initial BIOS, it looks for a
Kernel image which subsequently takes control of the entire computer system,
including I/O, memory, device drivers. The Kernel arbitrates conflicts between
processes concerning such resources, and optimizes the use of common resources,
such as CPU, cache, file system, and network sockets.

**Bootloader**

A computer program that locates and boots an Operating System. When a computer
is powered on, it typically does not have an operating system or its loader in
RAM. The computer first executes a relatively small program stored in the boot
ROM, which is read-only memory along with some needed data, to initialize
hardware devices such as CPU, motherboard, memory, storage, and other I/O
devices, etc.

**Init System**

The initialization system, termed init system, is the first user-space (as
opposed to kernel space) process started during booting of the operating system.
Init is a daemon process that continues running until the system is shut down.
It is the direct or indirect ancestor of all other processes and automatically
adopts all orphaned processes (processes killed for which no parent process can
be discerned.) Init is started by the kernel during the booting process. If no
init process can be found, a kernel panic will occur, in which the Operating
System will be refused to load until an administrator points the kernel to which
process it should look for as init. Modern Linux distributions often ship with
systemd as the default init system, though other init systems such as openrc,
runit, s6, and more exist and are utilized by more niche Linux distributions.

**Distribution/Distro**

A Linux Distribution, known colloquially as a distro, is an operating system
that includes the Linux kernel for its kernel function. Distros are designed for
a wide variety of applications from servers, desktops, embedded devices, and
more. A distro typically includes a Linux kernel and many other components.
These commonly include an init system, a package manager, various GNU tools a
libraries, documentation (usually through the form of man pages), network
configuration software, the getty TTY setup program (an initial teletype or
terminal interface through which users interact via a shell.)

It is worth noting that many distributions are actually forks of a smaller
number of source distributions from which they stem. These "source"
distributions are, in this writer's opinion, the ones of particular
significance, as they are less specialized and more customizable by the user for
their particular needs.

Some of these distributions include:

Debian, Arch, Red Hat, Gentoo, Alpine, Slackware, OpenSuse.

Common distributions based off of these source distributions are:

Linux Mint, Ubuntu, Fedora, PopOS!, CachyOS, Kali Linux.

There are thousands of Linux distributions, but the source distributions are the
ones that, in my humble opinion, truly matter.

Other distributions of note are:

NixOS, Void, Artix, Devuan, VanillaOS, Parrot OS, Garuda Linux.

**Package Manager**

A package manager is software for installing, updating, configuring, and
removing softwtare for the host system in a consistent manner. Those involved
with software development are familiar with package managers such as `npm`,
`pip`, `cargo`. On Windows, there are package managers such as Winget and
Chocolatey, while on MacOS there is Homebrew.

On Linux, the package manager takes a central stage as it is the software
through which all installations of software and all updates to the operating
system take place. As mentioned in the section on distributions, the package
manager for that distribution is one of the main differentiating factors between
distributions. Unlike Windows and MacOS, Linux asks the user to take a more
hands-on approach to upgrades to the OS, in that the user is the one decide when
and how updates to the OS take place.

Here is a list of package managers and their main distros they ship with:

Arch/pacman, Debian/apt, Red Hat/dnf, Gentoo/emerge, Alpine/apk

**Shell**

In the context of a computer Operating System, an operating system shell, or
just the shell, is a computer program that provides relatively broad and direct
access to the system on which it runs. The shell is a command-line interface, or
CLI, and should not be confused with the terminal or terminal emulator.

Modern Linux usually comes pre-installed with the Bourne-Again Shell, or `bash`,
though other shells such as the Z-shell, `zsh`, the Fish shell, `fish`, the
KornShell `ksh`, the C Shell, `csh`, and others are available.

## On OS Updates

When choosing a Linux distribution, there are release cycles that should be
considered. "Rolling" release distributions are Linux distributions for which
the maintainers maintain a constantly updating series of packages that are
reviewed for general security, but not necessarily stability. Due to this, one
using a rolling release distribution is given access to the latest versions of
all software on their system, with the drawback being that if certain bugs exist
in the program, the user might be one of the first of many to encounter them.

Some examples of rolling release distributions include Arch and Arch based
distributions and Gentoo.

This is in contrasted with a fixed schedule release cycle distribution, in which
major updates are scheduled every few months or years after rigorous testing has
been done to ensure that the packages and the OS remain stable. This means that
users of these distributions can reliably utilize their systems without worry
that their systems or software might be unstable/unpredictable, with the
drawback that access to the newest versions of the software is sometimes
delayed.

Some examples of fixed schedule release distributions include Debian and Red Hat
Linux.

Regardless of which Linux distribution one utilizes, security patches do come
through on all Linux distributions that are essential to maintaining a secure
OS, and so it is advised to intentionally and often when using Linux. As
mentioned earlier, Linux does not force updates and it is imperative that users
update their Linux OS frequently to ensure that their system remains up to date
with these security updates. On Rolling release distributions, it is advisable
to update at most once a day and at least once a month. On fixed schedule
release distributions, it is advised to update at least once a month or whenever
a major security patch is released.

## Common GNU tools

This section will very briefly cover various CLI tools anyone using Linux via a
shell should be familiar with:

---

`cd`

This stands for "change directory", and is used to navigate the file system.
Here are some examples:

`cd /`

go to the root directory

`cd ~`

go to the user's home directory

`cd ..`

go up one subdirectory

`cd some_folder`

navgiate into the `some_folder` directory

---

`ls`

This stands for "list", and is used to list the contents of either the current
directory, or the specified directory.

`ls`

list the contents of this directory

`ls -a`

list the contents of this directory including hidden files

`ls -l`

list the contents of this directory in a top down list

`ls -h`

list the contents of this directory in a human readable fashion

`ls -s`

list the contents of this directory and print the allocated size of each file

`ls -i`

list the contents of this directory and print the inode, or index number of each
file

`ls -liash`

do all of the aforementioned all at once

`ls some_directory`

list the contents of the `some_directory` directory

`ls ..`

list the contents of the sub-directory "above" the one currently navigated into

---

`cp`

copy specified files.

`cp this_file this_new_file`

`cp -r this_directory this_new_directory`

---

`rm`

remove/delete specified files.

`rm this_file`

`rm -r this_directory`

---

`touch`

create a new file

`touch new_file`

---

`mkdir`

create a new directory

`mkdir new_dir`

---

`grep`

This stands for "grab regular expression", and can be used to search files
within the current or specified file/directory for certain keywords that follow
a specified regular expression pattern.

See `man grep` for more info

---

`sed`

This stands for "stream editor", and is used to perform basic text
transformations on an input stream and/or file.

---

`awk`

`awk` is a programming language on its own, and is a pattern scanning and
processing language for text. It mainly is useful for editing and searching
files much like `sed` and `grep`, but is more powerful in how it handles
specifically field separations. It is particularly useful for parsing CSV files,
among other things.

---

`echo`

This stands for what it sounds like, it basically echos the text back to you,
`echo` is helpful mainly when looking for the value environment variables or
when utilized in combination with other commands via redirection operators.

## Redirection Operators

---

`|`

This is a pipe operator and is part of a series of "redirection operators", this
essentially says, take the output of this command and put it as input into this
other command. For example, if one has folders/files named `Audio` and `session`
in the current directory, one could list out all files/directories using `ls`,
and then pipe them into `grep` to find all output from `ls` that has the letters
`io` in them like so:

`ls | grep io`

---

`>`

This is the overwrite operator, say I have a file called `temp.txt` with some
text that I don't care about, then I can overwrite the entire file like so:

`echo "this text overwrites everything" > temp.txt`

This is what is also known as "clobbering", or the ability to completely
overwrite a file.

---

`>>`

This is often the safer choice than `>`, as it simply "appends" to the end of
the file whatever you `echo`:

`echo "this goes at the end." >> temp.txt`

## Useful Tools

There is a vast swath of useful tools on Linux, far too many to go into here.
But here is a list of some of my favorites, and a brief reasoning why I think
they are useful:

`crond`

This is the cron daemon, and is used to schedule tasks that run in the
background. This is particularly useful on servers, where one might want to run
an automated script that backs up a database every day, or every month, or every
year, depending on one's needs.

`ssh`

This is the secure shell, and is used to remotely login to Virtual Private
Servers, most of which run Linux or BSD.

`top`

This displays the processes running on the system.

`htop`

A graphical version of top.

`btop`

A modern graphical version of top (highly recommended).

`df`

displays the file system and how much of the hard drive is being used.

`lsblk`

lists all the block devices (hard drives, usb drives, external hard drives) on
the system

`mount`

mount an device to the operating system (useful for mounting usb drives,
external hard drives, e-readers, etc.)

`umount`

unmounts a device from the operating system
