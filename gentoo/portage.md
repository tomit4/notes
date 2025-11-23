# Portage (Gentoo Package Manager)

Gentoo's Package Manager is extensive. This doc is just to go over the very
basics that are specific to my workflow/machine.

## Basics

Updating all packages can be done:

```sh
emaint sync &&
emerge -avuDN @world &&
dispatch-conf &&
emerge -a --distclean &&
```

## Unmasking

Oftentimes you might receive an error like the following:

```
These are the packages that would be merged, in order:

Calculating dependencies... done!

!!! All ebuilds that could satisfy "=dev-java/eclipse-ecj-4.15" have been masked.
!!! One of the following masked packages is required to complete your request:
- dev-java/eclipse-ecj-4.15::gentoo (masked by: package.mask)
/var/db/repos/gentoo/profiles/package.mask:
# Miroslav Šulc <fordfrog@gentoo.org> (2020-02-27)
# >=dev-java/ant-eclipse-ecj-4.10 depends on masked >=virtual/{jdk,jre}-11
# www-servers/tomcat >= 9 depends on masked dev-java/eclipse-ecj


For more information, see the MASKED PACKAGES section in the emerge
man page or refer to the Gentoo Handbook.
```

Quick fix of this is simply to `emerge` the package with the autounmask flags
before installing:

```sh
touch /etc/portage/package.accept_keywords/zzz_autounmask &&
emerge mypackage --autounmask-write --autounmask &&
dispatch-conf &&
# hit u in the dispatch-conf ui
emerge -av mypackage
```

## USE Flags

USE flags can get complicated, see the
[Gentoo Wiki](https://wiki.gentoo.org/wiki/USE_flag) on the subject.

## CFLAGS

CFLAGS can indeed adjust compilation speed and binary size depending on
settings. See [GCC optimization](https://wiki.gentoo.org/wiki/GCC_optimization)
for the full details.

Of interest are
[`-march`](https://wiki.gentoo.org/wiki/GCC_optimization#-march),
[`-O`](https://wiki.gentoo.org/wiki/GCC_optimization#-O),
[-pipe](https://wiki.gentoo.org/wiki/GCC_optimization#-pipe)

As long as you set `-O2` or `-O3`, this should be a good compromise with the
above. Of interest, but is more dangerous/experimental to play around is
[LTO](https://wiki.gentoo.org/wiki/LTO) and
[PGO](https://wiki.gentoo.org/wiki/GCC_optimization#Profile_Guided_Optimization_(PGO)).

## More

This is just a note saying that this document is very very sparse on purpose.
Always consult the Gentoo wiki, this document is meant more as a resource for
myself than any sort of actual guide.
