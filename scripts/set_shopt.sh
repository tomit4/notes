##!/bin/bash

# The following scripts/notes are taken from the National Institute of Health's lecture series on the bash shell,
# and goes into detail about Shell Options, specifically the options defined by the set and shopt commands.
# You can find the introduction video here: https://www.youtube.com/watch?v=26t2LMtrDOc

# The Shell is defined by these elements:

# shell level (1, 2, 3)
# directolry location (pwd)
# set of defined variables (both regular and exported)
# set of procceses or jobs
# shell options

# Shell Options

# options are binary; either enabled or disabled
# disable accidental overwriting of files (noclobber) exiting the shell upon command failure (err exit)
# allowing recall of previously run commands (history)
# automatic notification of background job completion (notify)
# ... and many more

# Shell options are defined using set and shopt
# There are two sets of options, old (set) and new (shopt)
# All options defined by set can be configured using shopt as well
# set {+, -}o and shopt -o both display and configure the old options
# shopt displays and configures the new options

# Demonstration:

# Old Options (for now let's just see what is here, it looks like we have a series of options with a boolean on/off value)

# set -o

# prints:

# allexport      	off
# braceexpand    	on
# emacs          	off
# errexit        	off
# errtrace       	off
# functrace      	off
# hashall        	on
# histexpand     	on
# history        	on
# ignoreeof      	off
# interactive-comments	on
# keyword        	off
# monitor        	on
# noclobber      	off
# noexec         	off
# noglob         	off
# nolog          	off
# notify         	off
# nounset        	off
# onecmd         	off
# physical       	off
# pipefail       	off
# posix          	off
# privileged     	off
# verbose        	off
# vi             	on
# xtrace         	off

# Let's see what happens when we invoke set with the +o argument:

# set +o

# prints:
 
# set +o allexport
# set -o braceexpand
# set +o emacs
# set +o errexit
# set +o errtrace
# set +o functrace
# set -o hashall
# set -o histexpand
# set -o history
# set +o ignoreeof
# set -o interactive-comments
# set +o keyword
# set -o monitor
# set +o noclobber
# set +o noexec
# set +o noglob
# set +o nolog
# set +o notify
# set +o nounset
# set +o onecmd
# set +o physical
# set +o pipefail
# set +o posix
# set +o privileged
# set +o verbose
# set -o vi
# set +o xtrace

# With +o, set displays all the old options using the command that will configure them to their current state.
# Just keep this in the back of your mind for now...

# Display new options

# shopt

# prints

# autocd         	on
# assoc_expand_once	off
# cdable_vars    	off
# cdspell        	on
# checkhash      	off
# checkjobs      	off
# checkwinsize   	on
# cmdhist        	on
# compat31       	off
# compat32       	off
# compat40       	off
# compat41       	off
# compat42       	off
# compat43       	off
# compat44       	off
# complete_fullquote	on
# direxpand      	off
# dirspell       	off
# dotglob        	off
# execfail       	off
# expand_aliases 	on
# extdebug       	off
# extglob        	off
# extquote       	on
# failglob       	off
# force_fignore  	on
# globasciiranges	on
# globstar       	off
# gnu_errfmt     	off
# histappend     	on
# histreedit     	off
# histverify     	off
# hostcomplete   	on
# huponexit      	off
# inherit_errexit	off
# interactive_comments	on
# lastpipe       	off
# lithist        	off
# localvar_inherit	off
# localvar_unset 	off
# login_shell    	off
# mailwarn       	off
# no_empty_cmd_completion	off
# nocaseglob     	off
# nocasematch    	off
# nullglob       	off
# progcomp       	on
# progcomp_alias 	off
# promptvars     	on
# restricted_shell	off
# shift_verbose  	off
# sourcepath     	on
# xpg_echo       	off

# NOTE that you can display the old set -o options using shellopt -o as well (for some brevity's sake, I won't display the printed output here)

# shopt -o

# shopt -p -o (displays the same as the set +o command)

# Demonstration

# let's create a file that has important data:

# echo "really really important data" > file

# now let's say we accidentally overwrote that data:

# echo "just testing" > files

# as you can see, we just overwrote our really really important data with just testing...how can we use shopt to prevent us from accidentally overwriting this data?

# Well, the shell option noclobber can prevent us from overwriting files.

# set -o | grep noclobber

# prints:

# noclobber      	off

# And as you can see, the noclobber option is currently set to off, so let's enable it to prevent accidental file overwrites

# set -o noclobber

# set -o | grep noclobber

# prints:

# noclobber      	on

# To reverse this and turn it off, use the +o argument:

# set +o noclobber

# We also could have used shopt to do the same:

# shopt -s -o noclobber

# Now let's check to see if no clobber is now on:

# shopt -o noclobber

#prints:

# noclobber      	on

# So now let's test it:

# echo "again into the file" > file

#prints:

# bash: file: cannot overwrite existing file

# As you can see, setting the noclobber option to on using either the set -o noclobber or the shopt -o noclobber commands prevents
# us from accidentally overwriting our files from the command line.

# Another Example:

# Suppose you and your colleagues can't decide on a way of creating subdirectories:

# ls

# prints:

# file Project_1 PROJECT_2 project_3

# You can try to search for a certain directory using a lowercase p:

# ls -d *project_3

# prints:

# project_3

# This is obviously because bash by default reads everything with case sensitivity turned on (i.e. it delineates between upper and lower case) We can turn off this case insensitivity using shopt's nocaseglob option (set doesn't have this capability)

# shopt nocaseglob

# prints:

# nocaseglob     	off

# Ok, so let's turn the nocaseglob option on, this will turn off case-sensitivity in bash:
# shopt -s nocaseglob

# And let's check to be sure:
# shopt nocaseglob

# prints:

# nocaseglob     	on

# So now when we try the same search, it should include all project files regardless of upper or lower case:

# ls -d p*

# prints:

# Project_1 PROJECT_2 project_3

# One last example

# Imagine you absolutely must create a directory that begins with a hashtag (albeit there are very few situations where this would actually be necessary, but just run with it...)

# If we were to try to simply do that with bash's default settings:

# mkdir #_1

# prints:

# mkdir: missing operand
# Try 'mkdir --help' for more information.

# Obviously, this doesn't work because a hashtag is the beginning of a bash comment, and thusly bash interprets this as:

# mkdir

# With no following arguments, because it is reading it as commented out, the "_1" is a comment as far as bash is concerned.

# Luckily for us shopt has an option to turn this off.

# shopt -u interactive_comments

# Now we should be able to create such a directory:

# mkdir #_1

# ls -d #*

# should print (modern bash doesn't accept this):

# #_1

# As an aside, it is mentioned in the lecture to not do this, as using the hashtag character is extremely common and you might get yourself into trouble abandoning it

# Review

# Set, display, enable, and disable options:

# Set/Display:

# set {+,-}o
# set {+,-}o [option]

#Set/Enable/Disable
# set {+,-}?

# Shopt display, enable, and disable options:

# Shopt/Display:

# shopt [new option] #shopt options
# shopt -o [old option] # set options

# Shopt/Enable/Disable:

# shopt -u, -s [new option]
# shopt -u, -s -o [old option]

# Using set to turn debugging on/off

# set -x (turns debugger on)
# set +x (turns debugger off)


# NOTE: set/shopt options are always boolean on/off enabled/disabled.  Options are only defined in the current shell (and shell session), and are NOT defined within subshells.  Options are also only defined with the current working directory.

# More information about set and shopt can be found in the GNU man pages. Simply type man bash and search using /set or /shopt to jump to their respective sections.
