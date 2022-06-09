#!/bin/bash

# Variable assignment is rather straightforward in bash

name="brian"
echo $name
# prints:
# brian

# If we want to assign a number to a variable, we want to encase it within a subshell:

my_number=$((1))
echo $my_number
# prints
# 1

# Let's say we wanted to add to that number now, we could do that like so:

my_number=$(($my_number + 1))
echo $my_number
# prints
# 2

# Let's say we wanted to continually add to a number up to ten within a for loop:

for (( i=0; i<=10; i++ )); do
    echo "$name's current number is: $i"
done
