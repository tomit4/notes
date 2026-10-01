# Notes on Updating Llama.cpp

Llama cpp can sometimes not compile on Gentoo easily, here are some low hanging
fruit notes on what has gotten it working in the past.

If the gcc version is out of sync, then simply force the version on your Gentoo
system:

```sh
cmake -B build -DGGMAL_CUDA=ON DCMAKE_CUDA_HOST_COMPILER=/usr/bin/gcc-<version number here>
```

Afterwards which, remove the `build` directory from the llama.cpp directory:

```sh
rm -r ./build
```

And then rebuild the binaries:

```sh
cmake --build build -j6
```

Usually this fixes most problems.
