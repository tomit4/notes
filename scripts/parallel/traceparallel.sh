#!/bin/bash
# Note you will need to install both parallel and traceroute to use this (doas pacman -S parallel traceroute)
{
    echo foss.org.my ;
    echo debian.org ;
    echo freenetproject.org ;
#} | parallel traceroute
} | parallel -k traceroute # makes sure that the output of parallel is displayed in the order that the arguments passed were given (i.e. foss.org.my results are displayed first)
