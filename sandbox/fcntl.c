// From Page 84, Chapter 3 of Advanced Programming in the UNIX Environment

#include "apue.h"
#include <fcntl.h>

int main(int argc, char *argv[]) {
    int val;

    if (argc !=2)
        printf("usage: a.out <descriptor#>\n");

    if ((val = fcntl(atoi(argv[1]), F_GETFL, 0)) < 0)
        printf("fcntl error for fd %d\n", atoi(argv[1]));

    switch (val & O_ACCMODE) {
        case O_RDONLY:
            printf("read only\n");
            break;
        case O_WRONLY:
            printf("write only\n");
            break;
        case O_RDWR:
            printf("read write\n");
            break;
        default:
            printf("unknown access mode\n");
    }

    if (val & O_APPEND)
        printf(", append\n");
    if (val & O_NONBLOCK)
        printf(", nonblocking\n");
    if (val & O_SYNC)
        printf(", synchronous writes\n");

#if !defined(_POSIX_C_SOURCE) && defined(O_FSYNC) && (O_FSYNC != O_SYNC)
    if (val & O_FSYNC)
        printf(", synchronous writes\n");
#endif

    putchar('\n');
    exit(0);
}

/* EXAMPLE USES:
 * ./a.out 0 < /dev/tty
 * ./a.out 1 > temp.foo
 * ./a.out 2 2>>temp.foo
 * ./a.out 5 5<>tmep.foo
 */
