#!/bin/bash

OUT=${1%.srt}.vtt

echo "WEBVTT" >> $OUT
echo "" >> $OUT

sed 's#\([0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}\),\([0-9]\{3\}\)#\1.\2#g' $1 >> $OUT