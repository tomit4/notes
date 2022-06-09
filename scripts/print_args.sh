#!/bin/bash

# This simple script demonstrates the use of the special iterator "$@", which will take in an infinite number of arugments passed and print them out.
# This could prove useful when you don't know how many arguments you are going to have, such as when iterating over a series of files.

for i in "$@"; do
    printf '%s\n' "$i"
done
