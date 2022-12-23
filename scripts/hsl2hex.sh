#!/usr/bin/env bash
set -e -o pipefail

# Prompt user for HSLA values
echo -n "Enter HSLA values: "
read h s l a

# Convert HSL to RGB
if [[ ${s} -eq 0 ]]; then
  r=$((l*255))
  g=$((l*255))
  b=$((l*255))
else
  if [[ $(echo "${l} < 0.5" | bc -l) -eq 1 ]]; then q=$((l*(1+s))); else q=$((l+s-(l*s))); fi
  p=$((2*l-q))
  r=$(printf "%.0f" $(echo "(${p}+(${q}-${p})*${hue_to_rgb(p,q,$(((h+120)%360)))})" | bc -l))
  g=$(printf "%.0f" $(echo "(${p}+(${q}-${p})*${hue_to_rgb(p,q,${h})})" | bc -l))
  b=$(printf "%.0f" $(echo "(${p}+(${q}-${p})*${hue_to_rgb(p,q,$(((h-120+360)%360)))})" | bc -l))
fi
# Convert RGB to hex
r=$((r/16))
g=$((g/16))
b=$((b/16))

hex="#$(printf "%x" ${r})$(printf "%x" ${g})$(printf "%x" ${b})"

# Output hex color code
echo ${hex}

# Helper function to convert hue to RGB
hue_to_rgb() {
  p=${1}
  q=${2}
  t=${3}

  if [[ $(echo "${t} < 0" | bc -l) -eq 1 ]]; then t=$((t+360)); fi
  if [[ $(echo "${t} > 360" | bc -l) -eq 1 ]]; then t=$((t-360)); fi
  if [[ $(echo "${t} < 60" | bc -l) -eq 1 ]]; then return $(echo "(${p}+(${q}-${p})*${t}/60)" | bc -l); fi
  if [[ $(echo "${t} < 180" | bc -l) -eq 1 ]]; then return $(echo "${q}" | bc -l); fi
  if [[ $(echo "${t} < 240" | bc -l) -eq 1 ]]; then return $(echo "(${p}+(${q}-${p})*(240-${t})/60)" | bc -l); fi
  return $(echo "${p}" | bc -l)
}
