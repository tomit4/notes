# Ensure XDG_RUNTIME_DIR points to the correct location
if [ -z "$XDG_RUNTIME_DIR" ]; then
    export XDG_RUNTIME_DIR="/run/user/$(id -u)"
    # create if it doesn't exist
    [ ! -d "$XDG_RUNTIME_DIR" ] && mkdir -p "$XDG_RUNTIME_DIR" && chmod 0700 "$XDG_RUNTIME_DIR"
fi

# Start dbus session if it's not already running
if [ -z "$DBUS_SESSION_BUS_ADDRESS" ]; then
    eval "$(dbus-launch --sh-syntax --exit-with-session)"
fi


[[ -z $DISPLAY && $(tty) = /dev/tty1 ]] && exec startx
