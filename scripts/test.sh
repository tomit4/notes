#!/bin/bash

my_number=$1
my_other_number=$2

# the test keyword can be used to return a true or false statement based off of what parameters we pass to it, generally speaking though, we won't get an output unless we explicitly place 'test' within an 'if' statement.
if (test "$my_number" != "$my_other_number"); then
    echo "yeah, those are NOT equal!"
else
    echo "nah, those two numbers are equal!"
fi

