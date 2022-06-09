#!/bin/bash

# Just like in other programming languages, bash has functions.  Functions in bash do look somewhat similar to functions in other programming languages, with some caveats.  Note here how in this funciton called greet(), there is a reference to a parameter called $1, which is also preceded by the variable name by the term 'local', which probably refers to name being a local variable.  It is then assigned the value of $1, which is the first parameter to be passed after calling the function, in this case, it called "John Doe" after the funciton invocation greet.  That argument is then passed as "$1", which is then assigned to the local variable name, which then is echoed back in a string, with "Hello, " preceding it.

#greet() {
    #local name="$1"
    #echo "Hello, $name"
#}

#greet "John Doe"
# prints - Hello, John Doe

# Here we see a general reference to all parameters, which is referenced using the @ symbol. #foo() {
    #echo "$@"
#}

#foo 1 2 3
# prints - 1 2 3

# You can also create a default value of the arguments like so:

#bar() {
    #local val=${1:-25}
    #echo "$val"
#}

#bar # prints 25 by default
#bar 30 # prints 30

# You can actually reference other bash scripts' functions in other files or even in the shell itself by using the source keyword, try this from the terminal:

# source functions.sh
# greet "John Doe"
# prints - Hello, John Doe

# From the bash.pdf, we have found that the use of the 'local' reserved word, we can declare local variables within functions, which as the document states, can be very useful when used within other functions,
# This is demonstrated below:

func1()
{
    local var='A string local to func1'
    func2
}

func2()
{
    echo "In func2, var = $var"
}

var="A string within the global scope"
func1
# prints 
# In func2, var = A string local to func1

# note that even though we declared var again within the global scope, when we printed the value of var in func1(), it returned us the local variable instead, if we had not declared var prepended by the local reserved word,
# it would still have printed the same, because $var is reassigned a different value when func1OP is invoked.  That said, if we then echo $var within the global scope, we should get the global value:

echo $var
# prints
# "A string within the global scope"

