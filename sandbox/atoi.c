/* https://www.tutorialspoint.com/c_standard_library/c_function_atoi.htm */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int val;
    char str[20];

    strcpy(str, "98993489");
    val = atoi(str);
    printf("String value = %s, Int value = %d\n", str, val);

    strcpy(str, "tutorialspoint.com");
    val = atoi(str);
    printf("String value = %s, Int value = %d\n", str, val);

    return 0;
}
