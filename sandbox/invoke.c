#include <unistd.h>

int
main(void)
{
    /* the execl function is further described in the man pages, but is placed here essentially to exemplify how to invoke a command from within a c program */
   execl("/usr/bin/st", "my terminal", NULL);
   return 0;
}
