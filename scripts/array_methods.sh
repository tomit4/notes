#!/bin/bash

# There are many interesting array methods within bash, this file simply contains some examples of a few of them.

# Deleting an entire array or single element of an array.
#array=(a b 1 "c")

#echo ${array[@]}

# prints
# a b 1 c

#unset array
# deletes entire array

#echo ${array[@]}
# prints nothing

# Create an Array from a string, similar to the JavaScript split(' ') method.

#stringVar="Apple Orange Banana Mango"
#arrayVar=(${stringVar// / })

#echo ${arrayVar[@]}
# prints
# Apple Orange Banana Mango

# Note that the above example is a classic.  It uses a space as a delimiter in an otherwise simple regex search and delineate function.  The first parameter passed after the double forward slash syntax // , is a simple empty space, which is what it will look for to establish the array, the second white space I'm not exactly sure why, but it is necessary for it to process the command properly.

# Here's the same example using a plus sign as a delimiter:

#stringVar="Apple+Orange+Banana+Mango"
#arrayVar=(${stringVar//+/ })
#echo ${arrayVar[@]}
# prints
# Apple Orange Banana Mango

# Accessing the last element of an array.  Pretty simple, just use -1 as the index number:

#fruits=(banana kiwi pineapple)
#echo ${fruits[-1]}
# prints
# pinepalle
