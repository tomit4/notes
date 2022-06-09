#!/bin/bash

# Here we source/import the source_functions.sh file, which has a function called check_root() which checks
# to see if the file is being executed as root.  If the file is executed by a non-root user, then the check_root() function
# let's the user know that the file must be executed as root and then exits with an error status of 1.

# If the user is root, the source_functions.sh file has no other code, but this file continues on to echo back at the user that
# "I am root"

source source_functions.sh
check_root

echo "I am root"
