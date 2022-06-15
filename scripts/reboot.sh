#!/bin/bash

if [ -d "$HOME/.recycle-bin" ] ; then
    doas rm -r "$HOME/.recycle-bin/" && doas reboot
else
    doas reboot
fi
