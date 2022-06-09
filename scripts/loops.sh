#!/bin/bash

# A standard for loop can be done similar to python for in range:
#arr=(a b c d e f)
#for i in "${arr[@]}" ; do
    #echo "$i"
#done

# A more classical approach that stems from C:

#arr=(g h i j k)
#for ((i=0; i<${#arr[@]}; i++)) ; do
    #echo "${arr[$i]}"
#done

# A while loop:

#arr=(q r s t u v)
#i=0
#while (( $i < ${#arr[@]} )) ; do
    #echo "${arr[$i]}"
    #((i++))
#done

# Iterating over an array of numbers

#for i in {1..10}; do # expands to "1 2 3 4 5 6 7 8 9 10"
    #echo $i
#done

# Continue and break statements within for loops:

# This seems like it would just print a once and that'd be that, like the example below which prints g once.  But this loop produces a five times over, which is unexpected...
#arr=(a b c d e f)
#for i in ${arr[@]} ; do
    #if [[ ${arr[i]} = a ]] ; then
        #echo "${arr[i]}"
        #continue
    #else
        #break
    #fi
#done

# This is what I would encourage my future self to use, as it is more readable and reflects how a traditional for loop looks with an if and else and continue and break statements in other programming languages.

# Note the i<${#arr[@]}; parameter in the middle there, this is very similar to the array.length parameter in JavaScript or len in Python (admitttedly it looks a little strange).  Just keep in mind that the hashtag # denotes length


#arr=(g h i j k l)
#for (( i=0; i<${#arr[@]}; i++ )) ; do 
    #if [[ ${arr[i]} = g ]] ; then
        #echo "${arr[$i]}" # just returns g...
        #continue # and then continues through the loop...
    #else
        #break # but once it hits h, it breaks out of the loop
    #fi
#done

# While loops

#i=0

#while [ $i -lt 5 ]
#do
    #echo "i is currently $i"
    #i=$[$i+1] # Note the lack of spaces around the brackets.
#done # ends the loos

# prints:
# i is currently 0
# i is currently 1
# i is currently 2
# i is currently 3
# i is currently 4

# C style for loop, this is somewhat similar to the for loop we created above which counts over the array, the following is more straight forward as the amount of iterations is hard coded, but demonstrates the flexibility with which a for loop can be implemented in bash.

#for (( i = 0; i < 10; i++ ))
#do
    #echo "The iteration number is $i"
#done

# prints:
# The iteration number is 0
# The iteration number is 1
# The iteration number is 2
# The iteration number is 3
# The iteration number is 4
# The iteration number is 5
# The iteration number is 6
# The iteration number is 7
# The iteration number is 8
# The iteration number is 9

# We can also process multiple variables inside C-style for loop:

# Note the use of commas instead of semicolons here, the semicolons help the for function delineate between parameters, while the commas can establish multiple similar "sub"-parameters within the for loop, this is potentially powerful, as it can define multiple variables and parameters within the for loop prior to it's initialization (with the 'do' syntax)

#for (( i = 0, j = 0; i < 10; i++, j = i * i ))
#do
    #echo "The square of $i is equal to $j"
#done

# prints
# The square of 0 is equal to 0
# The square of 1 is equal to 1
# The square of 2 is equal to 4
# The square of 3 is equal to 9
# The square of 4 is equal to 16
# The square of 5 is equal to 25
# The square of 6 is equal to 36
# The square of 7 is equal to 49
# The square of 8 is equal to 64
# The square of 9 is equal to 81

# Until Loop

# This is the first time I have encountered an until loop.  It checks for a truthy statement, and when it reaches it, it ends.  You can thank of this as a for/if statement or a while statment with a built in break statement.

#i=5
#until [[ i -eq 10 ]]; do #Checks if i=10
    #echo "i=$i" #Prints the value of i
    #i=$((i+1)) #Increments i by 1
#done

# prints
# i=5
# i=6
# i=7
# i=8
# i=9

