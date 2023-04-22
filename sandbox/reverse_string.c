/* https://www.w3schools.in/c-programming/examples/reverse-a-string-in-c */

#include <stdio.h>
#include <string.h>

int main(void) {
    char mystrg[60];
    int leng, g;

    printf("Program in C for reversing a given string\n");
    printf("Please isnert the string you want to reverse: ");
    scanf("%s", mystrg);

    leng = strlen(mystrg);

    /* goes through the mystrg[] array backwards */
    for(g = leng - 1; g >= 0; g--) {
        printf("%c", mystrg[g]);
    }
    printf("\n");
    return 0;
}
