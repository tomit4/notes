#!/usr/bin/env bash

# convert hexadecimal colors to bash rgb format!
function hex2rgb() {
	local raw copy hex r g b alpha modifier delim pipe
  delim=";" pipe=cat
  function hex2rgb_usage() {
    cat<<HEX2RGB_EOL

$(cyn)h$(grn)e$(ylw)x$(orn)2$(red)r$(mag)g$(blu)b$(reset) · $(ital)Convert hexadecimal colors to bash-friendly RGB$(reset)

$(bold && undl)USAGE$(reset)

  \$ $(bold && hex2rgb 8dddff)hex2rgb$(reset && dark) [-t|-c|-r] [-d delimiter] [-b|-f] <$(reset && ital)hex-color ...$(reset && dark)>$(reset)

$(bold && undl)OPTIONS$(reset)

  $(ital && bold && ylw)-b, --background$(reset)         format output as a $(bold && undl)background$(reset) color
  $(ital && bold && ylw)-f, --foreground$(reset)         format output as a $(bold && undl)foreground$(reset) color
  $(ital && bold && ylw)-t, --tee$(reset)                pipe output to stdout and to the clipboard
  $(ital && bold && ylw)-c, --copy$(reset)               pipe output to the clipboard
  $(ital && bold && ylw)-r, --raw$(reset)                outputs raw rgb values, no escape sequences
  $(ital && bold && ylw)-d, --delim$(reset)              specify a delimiter for output (default is ';')

$(bold && undl)EXAMPLES$(reset)

  \$ hex2rgb 8cc055
    $(2rgb 8cc055)

  \$ hex2rgb -d ', ' -r -- ff3a00
     $(hex2rgb ff3a00)$(hex2rgb -d ', ' -r -- ff3a00)$(reset)

HEX2RGB_EOL
  }
  while [[ "$1" == -* ]]; do
    case $1 in
      (-[bB]|--background)
        modifier=48;;
      (-[fF]|--foreground)
        modifier=38;;
      (-[tT]|--tee)
        pipe=tee;;
      (-[cC]|--copy)
        pipe=pbcopy;;
      (-[rR]|--raw)
        pipe=cat; raw=1;;
      (-[dD]|--delim)
        [ -n "$2" ] && { delim=$2; shift; };;
      (-[eE]|--esc)
        [ -n "$2" ] && { esc=$2; shift; };;
      (-[hH]|"-?"|"?"|--help)
        hex2rgb_usage
        return;;
      (--)
        shift; break;;
      (-*)
        echo "Unknown option: $1" >&2;
        hex2rgb_usage
        return 1;;
      (*)
        break;;
    esac
    shift;
  done
  if (($# > 0)); then
    for hex in "$@"; do
	  	hex="${hex//'#'/}"
      if [ "${#hex}" = "3" ]; then
        # expand shorthand
        hex="${hex:0:1}${hex:0:1}${hex:1:1}${hex:1:1}${hex:2:1}${hex:2:1}"
      elif [ "${#hex}" = "4" ]; then
        # extract alpha channel (4th digit) from hex, convert it to decimal range 0-1.0
        alpha="$(echo "ibase=16; ${hex:3:1}" | bc -l)"
        # expand shorthand
        hex="${hex:0:1}${hex:0:1}${hex:1:1}${hex:1:1}${hex:2:1}${hex:2:1}"
      elif [ "${#hex}" = "6" ]; then
        # expand shorthand
        hex="${hex:0:2}${hex:2:2}${hex:4:2}"
      elif [ "${#hex}" = "8" ]; then
        # extract alpha channel (7-8th digits) from hex, convert to decimal range 0-1.0
        alpha="$(echo "ibase=16; ${hex:6:2}" | bc -l)"
        # expand shorthand
        hex="${hex:0:2}${hex:2:2}${hex:4:2}"
      fi

      printf -v r "%d" 0x"${hex:0:2}"
      printf -v g "%d" 0x"${hex:2:2}"
      printf -v b "%d" 0x"${hex:4:2}"
      if [ -z "$raw" ]; then
        __osc "${modifier:-38}" "2" "$r" "$g" "$b" | $pipe
      else
        printf "%s%d%s%d%s%d" "${modifier:+"${modifier}${delim}2${delim}"}" "$r" "$delim" "$g" "$delim" "$b" | $pipe
      fi
    done
  else
    hex2rgb_usage
    return 1
  fi
}

# helper function to render the color with escape sequence as a sort of preview 
function 2rgb() {
  printf $(hex2rgb "$@")' \\033['$(hex2rgb -d ';' -r "$@")'m \033[0m'
}

alias bold="__osc 01"
alias undl="__osc 04"
alias ital="__osc 03"
alias dark="__osc 02"
alias flsh="__osc 05"
alias inv="__osc 07"
alias reset="__osc 00"
alias blk="__osc 38 02 00 00 00"
alias red="__osc 01 31"
alias grn="__osc 01 32"
alias ylw="__osc 01 33"
alias orn="__osc 01 38 02 255 143 51"
alias blu="__osc 01 34"
alias mag="__osc 01 35"
alias cyn="__osc 01 36"
alias wht="__osc 38 02 255 255 255"
alias gry="__osc 37"
alias blk_b="__osc 48 02 00 00 00"
alias red_b="__osc 01 41"
alias grn_b="__osc 01 42"
alias ylw_b="__osc 01 43"
alias orn_b="__osc 01 48 02 255 143 51"
alias blu_b="__osc 01 44"
alias mag_b="__osc 01 45"
alias cyn_b="__osc 01 46"
alias wht_b="__osc 48 02 255 255 255"

function __osc() {
  local esc=033 str ifs=$IFS;
  IFS=';'; str="$*"; IFS=$ifs;
	printf '\033['${str:-0}m
}
alias osc=__osc
