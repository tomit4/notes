/* https://www.w3schools.in/c-programming/examples/reverse-a-string-in-c */
#include <stdio.h>

void revAString(char strg[]) {
    int g, numb;
    int tmpry = 0;

    // grabs the length of the given string
    for(numb = 0; strg[numb] != 0; numb++);
    printf("numb(string length) = %d\n", numb);
    for(g = 0; g < numb / 2; g++) {
        tmpry = strg[g];
        printf("tmpry = %c\n", tmpry);
        strg[g] = strg[numb - 1 - g];
        printf("strg[g] = %c\n", strg[g]);
        strg[numb - 1 - g] = tmpry;
        printf("strg[numb - 1 - g] = %c\n", strg[numb - 1 - g]);
    }
    for (g = 0; g < numb; g++)
        putchar(strg[g]);
    printf("\n");
}

int main(void) {
    char strg[60];
    printf("Please insert the string you wish to get reversed: ");
    scanf("%s", strg);
    revAString(strg);
    return 0;
}
