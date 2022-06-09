#!/bin/bash

# This file is to demonstrate the more nuanced aspects of the trap command.  Whenever the sigspec (signal code) is SIGTERM or SIGINT.  It creates an infinitely counting loop until hte user hits CTRL+Z to end the process.

# SIGINT is a keyboard termination signal, usually by CTRL+C, but in this case it can only be stopped by CTRL+Z...
# SIGTERM is initiated when some other kind of intiator is intiated to terminate the signal, it usually stops the process first by closing teh running task/open file and then terminates the signal.  This is sometiumes ignored.

# To know more about sigspecs, see:  https://www.programmersought.com/article/81145757226/

# Set a trap for SIGINT and SIGTERM signals
trap "echo The program is terminated." SIGTERM SIGINT
 
#Display message to generate SIGTERM
echo "Press Ctrl+Z stop the process"
 
#Initialize counter variable, i
i=1
 
#declare infinite while loop
while :
do
  #Print message with counter i
  echo “running the loop for $i times”
  #Increment the counter by one
  ((i++))
done
