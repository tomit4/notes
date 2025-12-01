# Kiwix-Serve Install

Go to [kiwix-build github page](https://github.com/kiwix/kiwix-build) and follow
the instructions there.

After invoking `kiwix-build`, go to:

`kiwix-build/BUILD_native_dyn/INSTALL`

From there:

```sh
sudo cp -r kiwix-build/BUILD_native_dyn/INSTALL/lib/* /usr/local/lib/ &&
sudo cp -r kiwix-build/BUILD_native_dyn/INSTALL/bin/* /usr/local/bin &&
sudo ldconfig
```
