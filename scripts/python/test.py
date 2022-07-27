# https://www.simplilearn.com/tutorials/python-tutorial/subprocess-in-python

from subprocess import Popen, PIPE

process = Popen(['cat', 'example.txt'], stdout=PIPE, stderr=PIPE)

stdout,stderr = process.communicate()

print(stdout)

#  import subprocess
#  subprocess.call(["git", "status"])
