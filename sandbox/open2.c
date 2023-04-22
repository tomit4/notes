#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE * fptr;
    char c;

    // Open file
    fptr = fopen("file.txt", "r");
    if (fptr == NULL) {
        printf("Cannot open file \n");
        exit(0);
    }

    // Read contents form file
    c = fgetc(fptr);
    while (c != EOF) {
        printf("%c", c);
        c = fgetc(fptr);
    }

    fclose(fptr);
    return 0;
}
