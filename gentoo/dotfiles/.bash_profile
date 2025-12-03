# /etc/skel/.bash_profile

# This file is sourced by bash for login shells.  The following line
# runs your .bashrc and is recommended by the bash info pages.
if [[ -f ~/.bashrc ]] ; then
	. ~/.bashrc
fi

# if test -z "${XDG_RUNTIME_DIR}"; then
#	export XDG_RUNTIME_DIR=/tmp/xdg/"${UID}" -xdg-runtime-dir
#	if ! test -d "${XDG_RUNTIME_DIR}"; then
#		mkdir -p "${XDG_RUNTIME_DIR}"
#		chmod 0700 "${XDG_RUNTIME_DIR}"
#	fi
# fi

if test -z "${XDG_RUNTIME_DIR}"; then
        export XDG_RUNTIME_DIR=/run/user/${UID}
fi

if test -d "${XDG_RUNTIME_DIR}"; then
        perms="$(stat -c '%a %u' "${XDG_RUNTIME_DIR}")"
        if [[ "${perms}" != "700 ${UID}" ]]; then
                export -n XDG_RUNTIME_DIR
                echo "WARNING! XDG_RUNTIME_DIR has incorrect permissions"
        fi
else
        mkdir -p "${XDG_RUNTIME_DIR}"
        chmod 0700 "${XDG_RUNTIME_DIR}"
fi
