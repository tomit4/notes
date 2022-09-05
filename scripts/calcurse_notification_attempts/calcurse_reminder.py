#!/usr/bin/env python3

# https://askubuntu.com/questions/713822/how-can-i-use-the-notify-send-command-in-combination-with-the-calcurse-calendar

# python script that uses notify-send to tell you about what you have scheduled in calcurse
# parses the output and then uses system time to notify you

#  calcurse -a
#  09/05/22:
 #  - 03:40 -> 03:40
	#  do stuff!!
 #  - 03:45 -> 03:45
	#  do some more stuff!!

# invoked like so... kinda janky, can be used a bash script as well I believe...
#  calcurse_reminder 30

import subprocess
import time
import sys

warn = int(sys.argv[1])

def get(command):
    return subprocess.check_output(command).decode("utf-8")

def convert(t):
    # convert set time into a calculate- able time
    return [int(n) for n in t.split(":")]

def calc_diff(t_curr, t_event):
    # calculate time span
    diff_hr = (t_event[0] - t_curr[0])*60
    diff_m = t_event[1] - t_curr[1]
    return diff_hr + diff_m

def cleanup(done, newlist):
    # clean up "done" -lists
    for item in done:
        if not item in newlist:
            done.remove(item)
    return done

def show_time(event, s = ""):
    # show scheduled event
    hrs = str(event[0][0]); mnts = str(event[0][1])
    mnts = "0"+mnts if len(mnts) != 2 else mnts
    subprocess.call(["notify-send", s, "At "+hrs+":"+mnts+" - "+event[1]])

startups = []; times = []

while True:
    currtime = convert(time.strftime("%H:%M"))
    events = [l.strip() for l in get(["calcurse", "-a"]).splitlines()][1:]
    # arrange event data:
    groups = []; sub = []
    for l in events:
        if l.startswith("* "):
            groups.append([l.replace("* ", "")])
        elif l.startswith("- "):
            sub.append(convert(l.split("->")[0].replace("-", "").strip()))
        else:
            groups.append(sub+[l])
            sub = []
    # run notifications
    for item in groups:
        # on startup:
        if not item in startups:
            # all- day events
            if len(item) == 1:
                subprocess.call(["notify-send", "Today - "+item[0]])
            # time- specific events
            elif len(item) == 2:
                show_time(item, "Appointment")
            startups.append(item)
        # as a reminder:
        if all([len(item) == 2, not item in times]):
            span = calc_diff(currtime, item[0])
            if span <= warn:
                show_time(item, "[Reminder]")
                times.append(item)
    # clean up events
    startups = cleanup(startups, groups); times = cleanup(times, groups)
    time.sleep(30)

