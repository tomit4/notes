# a basic example of how to write a standard input output shell in perl, it invokes system library's shell to write shell commands when invoked
# to invoke: perl foo.pl

use strict;
use warnings;
# my $string = "shell:"
# print "$string\n";

while(<>) {
    system($_);
}

exit 0;
