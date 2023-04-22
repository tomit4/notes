#include <stdio.h>

int main(void)
{
    FILE * fp = fopen("hallo.txt", "w");

    fputc('A', fp);
    /* getchar(); */
    fputc('A', fp);
    /* getchar(); */

    return 0;
}

// creates file hallo.txt and writes "AA" to it.
