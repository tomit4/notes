#!/usr/bin/env bash
error() {
    printf "error: %s\n" "$1" 1>&2
    # second argument is not required (defaults to 2)
    # if second argument is provided, it must be a number,
    # this is to assign an error code number to the exit command
    ${2:+exit $2}
}
error "$@"
