#!/bin/bash
# https://gist.github.com/apk/2414478
# WebSocket shell, start & browse to http://<Host>:6655/
# Requires bash 4.x, openssl.
# Author: rootshell@corelogics.de (which isn't me, apk)
coproc d { nc -l -p 6656 -q 0; }
nc -l -p 6655 -q 1 > /dev/null <<-ENDOFPAGE
	HTTP/1.1 200 OK

	<html><head><script language="javascript">
	  var url = location.hostname + ':' + (parseInt(location.port) + 1);
	  var ws = new WebSocket('ws://' + url + '/test');
	  ws.onmessage = function(msg) {
	    document.f.out.value += msg.data + '\n';
	    document.f.out.scrollTop = document.f.out.scrollHeight;
	  }
	  ws.onclose = function() { alert('Connection closed.'); }
	  function send() {
	    ws.send('' + document.f.in.value);
	    document.f.in.value='';
	  }
	</script></head><body><form name="f"><textarea name="out" cols="100"rows="40"></textarea>
	<input value="" type="text" size="120" id="in" onkeypress="if(event.keyCode==13){send();return false;}" />
	</form></body></html>
ENDOFPAGE

until read line; line=`tr -d '\r\n'<<<$line`; test -z "$line"; do
    test "${line:0:18}" = "Sec-WebSocket-Key:" && key=${line:19}
    test "${line:0:22}" = "Sec-WebSocket-Version:" && ver=$line
done <&${d[0]}
rkey=`echo -n ${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11|openssl dgst -sha1 -binary|base64`
echo -ne "HTTP/1.1 101 Switching Protocols\r\n" >&${d[1]}
echo -ne "Upgrade: websocket\r\nConnection: Upgrade\r\n" >&${d[1]}
echo -ne "Sec-WebSocket-Accept: $rkey\r\n$ver\r\n\r\n" >&${d[1]}

doasync() {
    bash -c "$1" | while read line; do
        while [ "${#line}" -gt 0 ]; do
            l2=${line:0:80}
            len=`echo -n "$l2" | wc -c | tr -d ' '`
            echo -ne "\x81\x`printf '%02x' $len`$l2"
            line=${line:80}
        done
    done &
}

while true; do
    reclen=$((`od -j 1 -N 1 -t dI -A n <&${d[0]}` - 128))
    for i in `seq 0 3`; do
        mk[$i]=`od -N 1 -t dI -A n <&${d[0]}`
    done
    msg=""
    for i in `seq 0 $(($reclen - 1))`; do
        bt=`od -N 1 -t dI -A n <&${d[0]}`
        bt=$(($bt ^ ${mk[$(($i % 4))]}))
        msg="$msg$(echo -e "\x`printf '%02x' $bt`")"
    done
    test "$msg" = "exit" && break
    doasync "$msg" >&${d[1]}
done
echo >&${d[1]}-
