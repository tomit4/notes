#!/bin/bash

if [[ "$(id -u)" -ne 0 ]]; then
    echo "[ERROR] You must run this script as root!"
    exit 0
else
    echo "You are root!"
fi
