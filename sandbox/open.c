#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

int main(int argc, char const *argv[]) {
    (void)argc;
    (void)argv;

    int fd;
    char buff[1000];

    printf("Enter a file you wish to open: \n");
    scanf("%s", buff);

    if ((fd = open(buff, O_RDONLY)) == -1) {
        printf("file opening failed\n");
        exit(0);
    } else {
        printf("file opening successful\n");
        printf("file descriptor: %d\n", fd);
    }

    if (read(fd, buff, sizeof(buff)) == -1) {
        printf("Error while reading file\n");
        exit(0);
    } else {
        printf("wrote %lu bytes to the file\n", strlen(buff));
        printf("File contents: %s\n", buff);
    }
}
