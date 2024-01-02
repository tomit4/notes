## Getting NVIDIA To Work On Wayland (2023/2024 Edition)

Wayland notoriously doesn't work with NVIDIA GPUs, and there's alot of documentation on this already.

This .txt file is simply to document what I've gotten to work on Wayland with a NVIDIA 2060 GPU thus far. It is impressive what is possible now, though there is still some visual artifacting that happens on the riverwm at the time of this writing (01/01/2024).

For me there are a few requirements for me to completely convert over to Wayland.

**REQUIREMENTS:**

1. I have to use NVIDIA (I'm not getting an AMD GPU just to contribute to ewaste for this alone, NVIDIA will have to continue to work towards getting Wayland to work if they don't want to incur Linus' wrath on this one).
2. Tiling Window Manager. I just can't go back to using a Floating DE, TWM's are just better.
3. Minimal RAM usage. I prefer my system to be as light weight on resource usage as possible. This means the TWM, Terminal Emulator, Compositor, must be as light weight as possible. This is not a hard rule, ultimately I need a system that can do a lot, but I don't want my background processes running all the time consuming more RAM than is necessary.
4. Video Conferences. Zoom/Jitsi via the browser are a must. This is not yet
   tested, but to work properly, I'll be needing this to be stable before
   converting to Wayland.
5. Gaming. Yeah, it's a requirement. All work and no play and all that. Not a
   huge deal, already got Cyberpunk working via Steam, just has some artifcating
   (see below in ALREADY WORKING section).

**NICE TO HAVES:**

1. Fading Inbetween WorkSpaces (I know, TABS in RiverWM).
2. Golden Section Spiraling tiling of workspaces like default BSPWM.
3. Cursor Disappears on Typing (exists as config flag in riverwm).
4. DMENU like application picker (currently experimenting, lots of options).
5. RedShift Like App (just installed gammastep, gonna experiment).
6. Xclip Like Clipboard manager for saving to clipboard from terminal without highlighting+ctrl+shift+c...yeah. (currently use catx aliased as xclip -sel clip, see ydotool and/or wtype).
7. Devour For MPV and other applications (don't need a running terminal taking up screen real estate, needs research).
8. NeoVim clipboard save (currently doesn't work on Wayland, can simply yank to clipboard in Neovim with single config flag, and works on X11, but not Wayland).
9. Espanso text expansion (simple, has a wayland, compile, get rid of systemd warnings, and try it out).

**ALREADY WORKING:**

1. Foot Terminal/RiverWM (lightest weight I could find with most customization, comparable to BSPWM, Suckless Terminal, and Picom in resource usage).
2. NVIDIA GPU (kind of works, lots of configuration necessary, but I actually can play Cyberpunk 2077). Only issue is bad artifacting/stuttering (pockets of squares/glitching effect on heavy movement on screen, probably have to wait on NVIDIA update for this one to work).

**INSTRUCTIONS IN CASE OF NEED TO DUPLICATE EFFORTS:**

The following is a step by step series of instructions on how to get Wayland working again should you somehow need to reinstall everything (doomsday scenario):

Here are the current nvidia packages you have installed:

```
lib32-nvidia-utils 545.29.06-1
nvidia-dkms 545.29.06-1
nvidia-utils 545.29.06-1
opencl-nvidia 545.29.06-1
```

And here is a list of the current wayland protocol related packages you have:

```
egl-wayland 2:1.1.13-1
lib32-wayland 1.22.0-1
qt5-wayland 5.15.11+kde+r60-1
wayland 1.22.0-1
wayland-protocols 1.32-1
xorg-xwayland 23.2.3-1
```

Once all installed, ensure that you also install your niceties:

```
river
foot
swaybg
wlr-randr
```

This should be enough to get started, but to ensure Nvidia works well with steam
and other applications, there was some significant configuration necessary. When
I first started, the wrong resolution, no cursor, and like bspwm, river has
little official documentation as it is still pre 1.0 release.

Let's first deal with getting NVIDIA working. In /etc/environment, paste the
following:

```

QT_QPA_PLATFORMTHEME="gtk2;wayland;xcb"
QT_STYLE_OVERRIDE=gtk
QTWEBENGINE_CHROMIUM_FLAGS="-blink-settings=darkModeEnabled=true -enable-features=OverlayScrollbar,OverlayScrollbarFlashAfterAnyScrollUpdate,OverlayScrollbarFlashWhenMouseEnter"
RADV_PERFTEST=aco
GBM_BACKEND=nvidia-drm
__GLX_VENDOR_LIBRARY_NAME=nvidia
WLR_NO_HARDWARE_CURSORS=1
ENABLE_VKBASALT=1
LIBVA_DRIVER_NAME=nvidia
```

You'll also want to ensure nvidia is set as the default GPU used by both grub on
initramfs:

1. edit your initial ramdisk config (backup first):

```
doas nvim /etc/mkinitcpio.conf
```

2. Under the MODULES=() line, between the parentheses enter:

```
nvidia nvidia_modeset nvidia_uvm nvidia_drm
```

3. Regenerate your initramfs images:

```
doas mkinitcpio -P
```

Next you'll need to enable direct management via grub:

1. Edit your grub config:

```
doas nvim /etc/default/grub
```

2. Look for the line that starts with GRUB_CMDLINE_LINUX_DEFAULT and append it:

```
nvidia-drm.modeset=1
```

3. And update you grub config

```
doas grub-mkconfig -o /boot/grub/grub.cfg
```

4. Probably overkill, but also set it in the kernel modules as well:

```
doas touch /etc/modprobe.d/nvidia_drm.conf && \
doas nvim /etc/modprobe.d/nvidia_drm.conf
```

And add this to the config file:

```
options nvidia_drm modeset=1 fbdev=1
```

**CONCLUSION**

Once all set up, simply switch to a separate tty (ctrl + alt + F<your_choice>).
Log in, and type the name of your window manager (river). I still have to
research how to set up a lot via river, foot, and many other tools, but luckily
I can use X11 until Nvidia catches up with Wayland (solve that artifcating issue
NVIDIA, come on!!), and in the meanwhile, I can start to get ready for this
eventual migration. Lastly, I'll have to look into how to get river to start up
in TTY1, as .xinitrc obviously won't work for that...
