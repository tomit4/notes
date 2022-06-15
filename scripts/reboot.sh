#!/bin/bash

if [ -f "$HOME/.zsh_history " ] ; then
    rm "$HOME/.zsh_history"
fi

if [ -d "$HOME/.recycle-bin" ] ; then
    doas rm -r "$HOME/.recycle-bin/" && doas reboot
else
    doas reboot
fi
