#!/bin/bash

if [ -d "$HOME/.recycle-bin" ] ; then
    doas rm -r "$HOME/.recycle-bin/" && doas shutdown -h now
else
    doas shutdown -h now
fi
