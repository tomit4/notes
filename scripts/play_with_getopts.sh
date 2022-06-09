#!/bin/bash

# Very essentially getopts allows us to create commands with flags
# Usually getopts is used in conjunction with a while loop, which takes in a series of flag strings which are expected,
# it then defines a variable (in this case $opt) which then is used within a case statement to define its behavior

while getopts "ab" opt; do
    case $opt in
        a)
            echo "-a was triggered!" >&2
            # after we have sent the echo to standard output, we shift the remaining arguments by one so that we can reference them later
            shift 1
            # we can of course exit with a success status if we don't want to continue with operations after the -a flag is invoked
            #exit 0
            ;;
        b)
            echo "-b was triggered also!" >&2
            shift 1
            #exit 0
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            #exit 1
            ;;
    esac
done
# this is why we used shift earlier, so to utilize it later in our script after the while loop is done checking our various flags.
echo $1
