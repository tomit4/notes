#!/bin/bash

# this script will reinstall all packages fed to it from a file with one package per line
#
# tr '\ ' ' ' < input_file > output_file
#
#
for i in $( < output_file ) ; do
    if ! (pacman -Q | grep "${i}" > /dev/null)
    then
        sudo pacman -S "${i}" --noconfirm
    fi
done
