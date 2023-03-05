#!/usr/bin/env bash

# simple cron script to notify to possibly run trim script
LAST_UPDATE=$(cat "$HOME"/.fsdate)

notify-send "fstrim alert!, last fstrim on:
${LAST_UPDATE}"
