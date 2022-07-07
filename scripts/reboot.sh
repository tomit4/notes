#!/bin/bash

last_line_first_word=$(awk '{w=$1} END{print w}' $HOME/.zshrc)

if [[ $last_line_first_word == "export" ]] ; then
    sed -i '$ d' $HOME/.zshrc
fi

if [ -d "$HOME/.recycle-bin" ] ; then
    doas rm -r "$HOME/.recycle-bin/" && doas reboot
else
    doas reboot
fi
