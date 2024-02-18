## FSTRIM BASICS

fstrim should be run regularly to clean up disk space.
You can think of it as a more modern form of disk defragmentation.
It potentially can extend the life of an ssd hard drive.

fstrim should be run once a week, but should also not be more often.
The most basic essential command to run fstrim is:

```bash
sudo fstrim -a -v -m 1MB
```

Be conscientious when running fstrim like this, as the -a flag indicates we wish
to run fstrim on all mounted file systems that accept this command. The -m 1MB
indicates we wish to only trim in minimum of 1 megabyte chunks. The -v flag
indicates we wish to see 'verbose' output (like many UNIX/UNIX-like commands).
