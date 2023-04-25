#!/usr/bin/env bash

# Usage: citystats states 3 house_delegation 2

# Note: Personal script to automate away some work on my citystats api, perhaps write blog post about it later?
entity=$1
entity_id=$2
query=$3
id=$4

final=$(~/scripts/jscurl "citystats.xyz/${entity}/${entity_id}/${query}/${id}" | grep "${query}" | awk -F':' '{print $2}' | awk '{sub(/^ */, "") ; print}' | sed 's/"//g' | sed 's/ /_/g')

librewolf "https://en.wikipedia.org/wiki/${final}?useskin=vector"
