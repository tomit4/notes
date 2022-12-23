#!/usr/bin/env bash

# Prompt user for hex value
echo -n "Enter hex color code: "
read hex

# Convert hex to RGB
r=$((16#${hex:1:2}))
g=$((16#${hex:3:2}))
b=$((16#${hex:5:2}))

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
    if [[ $(awk "BEGIN {print (${l} > 0.5)}") -eq 1 ]]; then
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

# Assign alpha value (default is 1.0)
a=1.0

# Output HSLA values
echo ${h} ${s} ${l} ${a}
