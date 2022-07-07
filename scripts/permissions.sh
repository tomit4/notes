#!/bin/bash

myid=$(id -u)
echo "your userid is ${myid}"
if [[ $myid -ne 0 && $myid -ne 1000 ]]; then
    echo "[ERROR] You must run this script as root!"
    exit 0
elif [ $myid -eq 1000 ]; then
    echo "You are ${USER}!"
else
    echo "You are root!"
fi
