#!/bin/bash

# https://www.linuxjournal.com/content/using-named-pipes-fifos-bash

# To be used in conjunction with rpipe.sh (demonstrating mkfifo, or named pipes)

pipe=/tmp/testpipe

if [[ ! -p $pipe ]]; then
    echo "Reader not running"
    exit 1
fi

if [[ "$1" ]]; then
    echo "$1" > $pipe
else
    echo "Hello from $$" > $pipe
fi

# Example Output:
# $ sh rpipe.sh &
# [3] 23842
# $ sh wpipe.sh
# Hello from 23846
# $ sh wpipe.sh
# Hello from 23847
# $ sh wpipe.sh
# Hello from 23848
# $ sh wpipe.sh quit
# Reader exiting
