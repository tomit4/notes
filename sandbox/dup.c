#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>

int main() {
    int file_desc = open("dup.txt", O_WRONLY | O_APPEND);

    if (file_desc < 0)
        printf("Error opening the file\n");

    int copy_desc = dup(file_desc);

    /* NOTE what is happening here, the dup() call creates a secondary
     * file descriptor that duplicates the file descriptor
     * (original: file_desc, copy: copy_desc),
     * but references the same file (i.e. dup.txt) */

    write(copy_desc, "This will be output to the file named dup.txt\n", 46);
    write(file_desc, "This will also be output to the file named dup.txt\n", 51);

    return 0;
}
