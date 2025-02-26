This is a simple pacman hook that will update the mandb (the database of man
pages) whenever you update.

It was taken from this Artix form post:

https://forum.artixlinux.org/index.php/topic,1080.0.html

very simply:

doas cp mandb-update.hook /usr/share/libalpm/hooks

You can also uncomment this line in /etc/pacman.conf:

HookDir = /etc/pacman.d/hooks/

You may need to create this directory. Inside of it you can create a .hook file:

```sh
touch wireshark-dumpcap.hook
```

Here is a sample hook:

```
[Trigger]
Operation = Upgrade
Type = Package
Target = wireshark-cli

[Action]
Description = Fixing permissions for dumpcap...
When = PostTransaction
Exec = /bin/sh -c 'chgrp wireshark /usr/bin/dumpcap && setcap cap_net_raw,cap_net_admin=ep /usr/bin/dumpcap'
```
