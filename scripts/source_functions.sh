# This file is meant to be exported, or otherwise known in bash as "sourced" in another file.
# We can simply define a function here called check_root() that when invoked will check to see if the file is being executed as root.

check_root() {
    if [[ $EUID -ne 0 ]]; then
        echo "This script must be run as root"
        exit 1
    fi
}
