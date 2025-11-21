# Kernel Compilation Defaults

This document contains some basic notes of which Kernel Customization Flags
Mental Outlaw recommends in his
[video](https://www.youtube.com/watch?v=NVWVHiLx1sU) on the topic. Keep in mind
that his video was done for a kernel 5 years ago at the time of this writing,
and so it is likely we'll have to adjust. This document is just to give us, a
potential new gentoo user, a baseline of what to focus on.

Firstly, however, let's talk about what we'll need to do prior to following his
guide. The
[Gentoo AMD64 Handbook Page on Kernel Configuration](https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Kernel)
had extensive documentation and different methods for installing the Linux
Kernel. Prior to starting, it is probably a good idea to install the firmware:

```sh
emerge --ask sys-kernel/linux-firmware && \
emerge --ask sys-firmware/sof-firmware
```

Afterwards which there are methods using **installkernel** and **dracut** that
we followed first and we've documented elsewhere. This is to get the
distribution kernel installed, which we still recommend as a default method so
that you have a working kernel should you make a mistake in compiling your own.

Look at the link above or consult our other documentation on the subject should
you need to follow those instructions first.

## Installing Kernel Sources

```sh
emerge --ask sys-kernel/gentoo-sources
```

This installs kernel sources in `/usr/src/` using the specific kernel path. It
will not create a symbolic link by itself without the symlink USE flag being
enabled on the chosen kernel sources package.

It is conventional for a `/usr/src/linux` symlink to be maintained, such that it
refers to whichever sources correspond with the currently running kernel.
However, this symbolic link will not be created by default. An easy way to
create the symbolic link is to utilize eselect's kernel module.

For further information regarding the purpose of the symlink, and how to manage
it, please refer to
[Kernel/Upgrade](https://wiki.gentoo.org/wiki/Kernel/Upgrade).

First, list all installed kernels:

```sh
eselect kernel list
```

And in order to create a symbolic link called linux, use:

```sh
eselect kernel set 1
```

Where 1 is the number on the list of the kernel you just built.

## Mental Outlaw's Config:

This is my interprestation of Mental Outlaw's Config, keep in mind I have
omitted or edited some things he mentions in the video as they do not pertain to
my particular use case.

Within the makemenuconfig:

General Setup >

    > Kernel Compression Mode
        > LZ4
    > POSIX Message Queues > disabled
    > Disable process_vm_readv/writev syscalls
    > Disable uselib syscalls (old C libs)
    > Auditing support (required by SELinux)
        > Timer subsystem > Periodic timer ticks (better performance, no sleep mode)
        > Disable Old Idle dynticks config
        > Disable High Resolution Timer Support
    > CPU/Task time and stats accounting
        > Disable BSD Process Counting
        > Disable Export task/process statistics through netlink
    > Kernel log buffer size (how much space you want to use for kernel log)
        > set to 15
    > CPU kernel log buffer size contribution
        > set to 15
    > Temporary per-CPU printk log buffer size
        > set to 12
    > Disable Initial RAM filiesystem and RAM disk support (consider keeping this one)
    > Compiler optimization level
        > Select Optimize for performance
    > Choose SLAB allocator
        > choose SLUB (Unqueued Allocator)

Processor type and features >

    > Disable MPS table
    > Disable Support for extended (non-PC) x86 platforms
    > Processor family >
        > Change from Generic x86/64 to Core 2/newer Xeon (intel specific, don't change)
    > Maximum number of CPUs
        > Change to threads count on your current CPU (desktop 24)
    > Multi-core scheduler support
        > Disable if CPU thread count is low
    > Disable Reroute for broken boot IRQs
    > Disable Intel MCE features (opposite Mental Outlaw, since you're on AMD)
    > Performance monitoring
        > Uncheck all Intel options, and check all AMD options
    > Disable IOPERM and IOPL Emulation
    > Disable Intel microcode loading support
    > Disable 5-level page tables support
    > Disable NUMA Memory Allocation and Scheduler Support
    > Disable Check for low memory corruption
    > Enable MTRR cleanup support
        > setup both values to 1
    > Disable Intel Memory Protection Keys

> Power Management and ACPI options

    > Disable Suspend to RAM and standby (no sleep mode, keep enabled for laptops)
    > Disable Power Management Debug Support (same reason above)
    > If on Intel, enable Cpuidle Driver for Intel Processors

> Virtualization

    > Enable Host kernel accelerator for virtio net (not M, * it)

> Enable loadable module support

    > Disable Forced module unloading

> Enable the block layer

    > Disable Block layer debugging information in debugfs

> Networking support

    > Disable Amateur Radio support
    > Enable Bluetooth subsystem support
    > Enable Wireless
    > Enable Netlink interface for ethtool

> Device Drivers

    > Disable PCCard support
    > Block devices
        > Number of loop deviceds to pre-create at init time to 0
        > NVME Support make sure to build support into it for kernel
    > SCSI device support
        > Enable Asynchronous SCSI scanning
    > Disable Multiple devices driver support (RAID and LVM)
    > Disable Macintosh device drivers
    > Input device support
        > Mice >
            > Disable PS/2 mouse
        > Joysticks/Gamepads >
            > Disable whatever you won't be using
        > Disable Tablets
        > Disable Touchscreens
    > Graphics support
        > Maximum number of GPUs to 2
        > Enable Nouveau
        > Enable Virtual Box Graphics Card
    > File systems
        > Ensure ext4 is all enabled
        > Disable Miscellaneous filesystems
        > Disable Network File Systems (unless on NAS drive)
    > Kernel hacking
        > RCU Debugging
            > RCU CPU stall timeout in seconds to 3
    > Gentoo Linux
        > Support for init systems, system and service managers
            > OpenRC, runit and other script based systems and managers

Then just save it, it will save it to .config. Then:

```sh
make -j $(nproc) && make modules install && make install
```
