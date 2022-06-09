#!/bin/sh

# overwrite: copy standard intput to output after EOF
# version 1. BUG here

PATH=/bin:/usr/bin

case $# in
1)      ;;
*)      echo `Usage: overwrite file` 1>&2; exit 2
esac

new=/tmp/overwr.$$
trap `rm -f $new; exit 1` 1 2 15

cat >$new       # collect the input
cp $new $1      # overwrite the input file
rm -f $new

# this file is used solely as a first example of how to think about
# programming in the shell language.

# cp is used instead of mv so the permissions and owner of the output file aren'the
# changed if it already exist.
# Appealingly simple as this version is, it has a fatal flaw: if the user types
# DEL during the cp, the original input file will be ruined. We must prevent and
# interrupt from stopping the overwriting of the input file. (see ow_v2.sh)
