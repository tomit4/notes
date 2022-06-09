#!/bin/bash

touch temp.txt

# trap is a powerful command that allows us to chain an execution of commands AFTER a particular command is executed.
# to demonstrate this, we tell trap to hold onto the 'rm temp.txt' command, which removes the temp.txt file we just created above, note however, that it will only do that upon exit, as specified below.

trap 'rm temp.txt' err exit

# Now we will list all files in our directory to show that indeed, temp.txt still exists...

ls

# however, by running this program, we will then exit this shell, and thusly invoke the trap command above, if we invoke ls after invoking this shell script, you will notice that temp.txt no longer exists.
exit
