#!/usr/bin/env bash

# Prompt user for RGB or RGBA values
echo -n "Enter RGB or RGBA values: "
read r g b a

# Convert RGB to HSL
r=$((r/255))
g=$((g/255))
b=$((b/255))

max=${r}
min=${r}

if [[ ${g} -gt ${max} ]]; then max=${g}; fi
if [[ ${b} -gt ${max} ]]; then max=${b}; fi
if [[ ${g} -lt ${min} ]]; then min=${g}; fi
if [[ ${b} -lt ${min} ]]; then min=${b}; fi

l=$(((max+min)/2))

if [[ ${max} == ${min} ]]; then
  h=0
  s=0
else
  d=$((max-min))
  if [[ $(echo "${l} > 0.5" | bc -l) -eq 1 ]]; then
    s=$((d/(2-max-min)))
  else
    s=$((d/(max+min)))
  fi
  case ${max} in
    ${r}) h=$(((g-b)/d))
      if [[ ${h} -lt 0 ]]; then h=$((h+6)); fi
      ;;
    ${g}) h=$((2+(b-r)/d))
      ;;
    ${b}) h=$((4+(r-g)/d))
      ;;
  esac
  h=$((h*60))
fi

# Output HSLA values
echo ${h} ${s} ${l} ${a}
