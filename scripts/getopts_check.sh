#!/bin/bash

# This file was copied from Kris Occhipinti's Shell Scripting playlist on youtube. 
# You can find the video at: https://www.youtube.com/watch?v=5O4SLIDSMqg

# It introduces the basics of the getopts command, which in this particular script, sets up flags to be used, which when invoked
# will produce a different result/behavior depending on which flags are chosen.

# Here we create a funciton called main(), which is invoked at the end of this script.
function main(){
    # Firstly, the main() function invokes the check() function defined below.  It is invoked with all passed arguments, defined by the $@ syntax.
    check $@

    # If the $m argument is true, then the main() function will echo back "'m' has been chosen."
    if [ $m ]
    then
        echo "'m' has been chosen."
    fi
}

# And here we define our check() function, which uses the getopts command...
function check(){
    # Firstly we define some local variables (local to this function), OPTIND, opt, and i are all declared here, but not defined.
    # NOTE that OPTIND represents the index of the last option argument processed by the getopts builtin.
    # NOTE that OPTARG represents the value of the last option argument processed by the getopts builtin.
    local OPTIND opt i
    # while loop that uses getopts to look at each flag defined after the getopts command, in this case "cmni"
    # NOTE the colons prepending and appending the cmni flags, the first colon is to expand the variables so that any one of them can be invoked, not necessarily one after the other, the appending colon is to tell bash that we also SHOULD expect arguments after these flags.
    # Whatever flags are passed are contained within the local variable, $opt,
    while getopts ":cmni:" opt; do
        # a case statement that checks what is in the $opt variable and procedes with different processes/commands depending on what was chosen.
        case $opt in
            # if the -i flag was chosen, we echo back the choice, as well as set the global variable $input to equal the global variable $OPTARG
            i) echo "You chose 'i'";input="$OPTARG";;
            # if -c flag is chosen, we simply echo back the choice.
            c) echo "'c' is a good option";;
            # if the -m flag is chosen, the $m global variable is set to true, which is then checked in our main() function
            m) m=true;;
            # if the -n flag is chosen, teh n_func() funciton is invoked, which is defined below and simply echos back the choice.
            n) n_func ;;
            # if any other flag is chosen (i.e. a flag that was not defined by getopts above), then we invoke the help() function and exit with an error code of 1, you can think of this as the default statment in Javascript's switch/case statements
            \?) help;exit 1 ;;
        esac
    done
    # OPTIND is the index number of the current argument, and is usually defaulted to 1.  Here we shift [n] to change the current positional parameters (the arguments) to the left by n times, in this case we are telling bash to essentially look at the next flag in the $OPTIND parameter
    shift $((OPTIND -1))
    
    # Here very simply we are looking at the local $input variable and seeing if it is empty, if not, we simply output the value of $input
    if [ "$input" = "" ]
    then
        echo "No input file"
    else
        echo "Input is $input"
    fi
}

# The rest is relatively straight forward.

function help(){
    echo "Help. I need somebody"
    echo "Help. Not just anybody"
}

function n_func(){
    echo "this is the n_func"
}

main $@
