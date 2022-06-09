#!/bin/bash

# In Section 12.6 of Bash Notes for Professionals, an introduction to Associative Arrays is given, in which the author expands upon the Bash Syntax of arrays becoming similar to Objects in traditional programming languages (or dictionaries in Python).

# Essentially we can define an index name within an Array.  This essentially makes them akin to Objects.

# Declare an associative arrays

declare -A aa

aa[hello]=world
aa[ab]=cd
aa["key with space"]="hello world"

# You can also declare an array more simply by writing it all in one line like so:

#aa=([hello]=world [ab]=cd ["key with space"]="hello world")

#echo ${aa[hello]}

# prints
# world

#echo ${aa[ab]}

# prints
# cd

# Note that from trying to use this as an actualy command it doesn't work, there probably is a way to cd from a file like this, but there was no apparent answer found online.

#echo ${aa["key with space"]}

# prints
# "hello world"

# You can access, and therefore echo, a list of the associative array keys like so:

# Note that it is the exclamation point here that accesses the keys, without it we access the values.

#echo "${!aa[@]}"

# prints
# key with space ab hello

#echo "${aa[@]}"

# prints
# hello world cd world

# Iterating over associative array keys and values

#for key in "${!aa[@]}"; do
    #echo "Key: ${key}"
    #echo "Value: ${aa[$key]}"
#done

# prints

#Key: key with space
#Value: hello world
#Key: ab
#Value: cd
#Key: hello
#Value: world

# Associative Arrays are, in essence, objects, though I don't know if they can have their own methods at this time (bash has surprised me thus far, but I would be very surprised if it had this functionality).  Nevertheless, let's establish a format for declaring a large Associative Array, like so (section 13.1 of the GoalKicker Bash book).

declare -A assoc_array=([key_string]=values \
                        [one]="something" \
                        [two]="another thing" \
                        [three]='mind the blanks' \
                        ["four"]="count the blanks of this key later!" \
                                            [IMPORTANT]='SPACES DO ADD UP!!!' \
                        [1]='there are no integers!' \
                        [info]="to avoid history expansion" \
                        [info2]="quote exclamation mark with single quotes" \
                        )

#echo # just a blank line
#echo now here are the values of assoc_array:

#echo ${assoc_array[@]}
# This is nice, but unfortunately not that useful, as while it does print the entirity of the associative array, it does so on one line, and only includes the values

#echo # just a blank line
#echo this is better:

#declare -p assoc_array # -p == print

# This will still print all in one line, but includes the entire array, key/value pairs are printed.

# Now let's access just the keys:

#echo # just a blank line
#echo accessing the keys:
#echo the keys in the assoc_array are ${!assoc_array[*]}

# Now let's loop through the array and print it out nicely

#echo # just a blank line
#echo printing the key/value pairs nicely:
#for key in "${!assoc_array[@]}"; do
    #printf "key: \"%s\"\nvalue: \"%s\"\n\n" "$key" "${assoc_array[$key]}"
#done

# Note that associative arrays and arrays of integers do not work the same way when attempting to access their values for arithmetic.  It is important to make this distinction when attempting to perform operations on their values.

#echo # just a blank line
#echo demonstrating difference between associative arrays, and integer arrays:
#echo this works: \${assoc_array[\$i]}: ${assoc_array[$i]}
#echo this does NOT work: \${assoc_array[i]}: ${assoc_array[i]}

# let's use this in an example:
i=1
echo ${assoc_array[\$i]}: ${assoc_array[$i]}

# Doesn't quite work yet, see chapter 13.1 of Bash Notes for Professionals from GoalKicker.com to continue


