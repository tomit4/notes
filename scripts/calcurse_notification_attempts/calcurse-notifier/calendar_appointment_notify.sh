#!/bin/bash

# https://gitlab.com/tzcrawford/calcurse-notifier/

#Will send a notification if the next appointment in the next 24 hours occurs within $1 minutes
#Set $1 to be the time (minutes) you want the notification to pop up in advance before the appointment actually happens.
#This script should be executed by cron every minute or something like that thus it cannot run exactly $1 minutes before event.
#So we use $2 to be the time +/- of $1 that it is okay to send the notification.
#Probably set $2 this to the same period between when cron runs this script

notify_within=$1
script_frequency=$2

#if there are no appointments in the next two days, the stop right away
if [ "$(calcurse -a -d 2)" = "" ] ; then
    exit 0
fi

if ! [ "$(calcurse -n)" = "" ] ; then #There is an event today with an associated time
    hours_remaining=$(calcurse -n | tail -1 | sed 's/ //g' | sed 's/\[//g' | sed 's/\].*//g' | sed 's/:..//g')
    minutes_remaining=$(calcurse -n | tail -1 | sed 's/ //g' | sed 's/\[//g' | sed 's/\].*//g' | sed 's/..://g')


    time_remaining=$( echo "$hours_remaining * 60 + $minutes_remaining" | bc ) #in minutes. just adding the hours to minutes

    #Test whether the next event is within the given time frame
    #We need bc (calculator) to do the calculation. Will return "1" if the conditional is true
    #0.95 factor because you can get notifications to pop 3 times if cron is running every 1 minute and you use script_frequency=1
    notify_boolean=$( echo "$time_remaining <= ($script_frequency*0.95 + $notify_within) && $time_remaining >= ($notify_within - $script_frequency*0.95)" | bc )
    if [ "$notify_boolean" = 1 ] ; then
        eventname="$(calcurse -n | sed -n 2p | sed 's/^   \[..:..\] //g')"
        event_in="$(calcurse -n | sed -n 2p | sed 's/^   \[//g' | sed 's/\].*//g')"
        notify-send "Appointment: ${eventname} in ${event_in}"
        # fbcli -t -1 -E message-new-instant 2>&1 >/dev/null || true #send a request to vibrate and make sound with feedbackd if possible
    fi
fi

tomorrow="$(date --date 'next day' +"%Y-%m-%d")"
daily_events="$(calcurse -a -d 2 | tr "\n" "@" | sed "0,/^.*${tomorrow}/ s///" | sed 's/^:@ \* //g' | sed 's/@ \* /, /g' | sed 's/@$//g' )" #Gives list of daily events tomorrow, Hopefully your event doesn't have "@" in it
if ! [ "$daily_events" = "" ] ; then
    current_hour="$(date +"%H")"
    current_minute="$(date +"%H")"
    minutes_today=$(( $current_hour * 60 + $current_minute )) #Minutes that have elapsed today
    minutes_left_today=$(( 24*60 - $minutes_today )) #Minutes elapsed at midnight
    notify_boolean_2="$(echo "$minutes_left_today <= ($script_frequency*0.95 + $notify_within)" | bc )" #It is $notify_within minutes of midnight!
    if [ "$notify_boolean_2" = 1 ] ; then
        notify-send "Daily Events: $daily_events"
        # fbcli -t -1 -E message-new-instant 2>&1 >/dev/null || true #send a request to vibrate and make sound with feedbackd if possible
    fi
fi
