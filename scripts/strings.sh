# There are many string methods in BASH.  The following exemplify just a handful of them.

# Replace pattern in string.

a='I am a string'
echo "${a/a/A}"
# prints
# I Am a string

# Replace all matches of a pattern in a string.

echo "${a//a/A}"
# prints
# I Am A string

# Match the first character at the beginning.

echo "${a/#I/y}"
# prints
# y am a string

# Match a achater only at the end.

echo "${a/%g/N}"
I am a strinN

# Replace a pattern with nothing:

echo "${a/g/}"
#prints
# I am a strin

# Add a prefix to array items:

A=(hello world)
echo "${A[@]/#/R}"
# prints
# Rhello Rworld

# Section 15.4: Substrings and subarrays

var='0123456789abcdef'

# Define a zero-based offset
# Returns from after the third index:
printf '%s\n' "${var:3}"
# prints
# 3456789abcdef

# Offset and length of substring
printf '%s\n' "${var:3:4}"

# Negative length counts from the end of the string
printf '%s\n' "${var:3:-5}"
# prints
# 3456789a

# Also just prints from the end of the string if no second parameter is provided.
printf '%s\n' "$var: -6"
# prints
# abcdef

# you can also do the same with parentheses to be more concise:
printf '%s\n' "${var:(-6)}"
