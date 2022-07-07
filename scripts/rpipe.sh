#!/bin/bash

# https://www.linuxjournal.com/content/using-named-pipes-fifos-bash

# To be used in conjunction with wpipe.sh (demonstrating mkfifo, or named pipes)

pipe=/tmp/testpipe

if [[ ! -p $pipe ]]; then
    mkfifo $pipe
fi

while true; do
    if read line < $pipe; then
        if [[ "$line" == 'quit' ]]; then
            break
        fi
        echo $line
    fi
done

echo "Exiting"

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
