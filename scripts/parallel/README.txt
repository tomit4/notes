NOTE: You will need to download GNU parallel for this (doas pacman -S parallel)

This is just some notes regarding what's in here.  The html files were created using a simple for loop:

for (( i=0; i<=10; i++ )); do
    touch $i.html
done

Then in the command line, I copied a command from the bash.pdf book I'm reading in order to better understand GNU parallel, a command line program that allows for  parallel processes to be executed (similar to xargs):

find . -type f -name '*.html' -print | parallel gzip

This will use the find command within the current directory, of a the type file, with the name all files that end in .html, and then send to standard output the results via the -print flag, afterwards which those
results are piped to GNU parallel which then asynchronously processes them through gzip (and thusly, compresses all .html files).

Note that GNU parallel is a powerful command line tool, you can execute a series of commands in sequence by reading them from a file and then passing them through parallel using the -j flag:

parallel -j 10 < file
