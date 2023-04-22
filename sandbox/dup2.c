#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <fcntl.h>

int main() {
    int file_desc = open("dup2.txt", O_WRONLY | O_APPEND);

    /* here the newfd is the file descriptor of stdout
     * note that using our dup.c program would create a new file descriptor,
     * dup() doesn't do that, it takes a second argument through which it will
     * duplicate the file descriptor of whichever one we wish */

    dup2(file_desc, 1);

    printf("I will be printed to the file dup2.txt\n");

    return 0;
}

/* https://stackoverflow.com/questions/4171126/what-do-the-dup-and-dup2-systems-really-do */
/* EXPLANATION FROM STACKOVERFLOW:
Both make a new file descriptor corresponding to an existing open file description.
Most properties between the old and new fd (like position) are shared; the only property
I can think of that's not shared is the close-on-exec flag. The difference between dup and
dup2 is that dup assigns the lowest available file descriptor number, while dup2 lets you
choose the file descriptor number that will be assigned and atomically closes and replaces
it if it's already taken. */
