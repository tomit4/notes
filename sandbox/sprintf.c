/* https://www.tutorialspoint.com/c_standard_library/c_function_sprintf.htm */

#include <stdio.h>
#include <math.h>

int main() {
    char str[80];

    sprintf(str, "Value of Pi = %f", M_PI);
    puts(str);

    return(0);
}
