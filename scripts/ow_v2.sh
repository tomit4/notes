#!/bin/sh

# overwrite: copy standard input to output after EOF
# version 2. BUG here too

PATH=/bin:/usr/bin

case $# in
1)      ;;
*)      echo 'Usage: overwrite file' 1>&2; exit 2
esac

new=/tmp/overwr1.$$
old=/tmp/overwr2.$$
trap 'rm -f $new $old; exit 1' 1 2 15

cat >$new       # collect the input
cp $1 $old      # save original file

trap '' 1 2 15  # we are committed; ignore signals
cp $new $1

rm -f $new $old

# solving the original problem we had in ow_v1.sh:
# If a DEL happens berfore the original file is touched, then the temporary files
# are removed and the file is left alone. After the backup is made, signals are ignored
# so the last cp won't be interrupted -- once the cp starts, overwrite is commited to
# changing the original file.

# However, this implementation is still flawed (see pg 154 of The Unix Programming Environment).

# If the program providing input to overwrite gets an error, its output will be empty and overwrite will dutifully and reliably destroy the argument file. (see ow.sh for final version)
