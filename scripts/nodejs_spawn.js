//This file is just to demonstrate how nodejs can, like python, execute bash commands, here we have it execute the ls command on our Documents folder.This utilizes node's native 'util' modules, as well as child_process, spawn.  This is one way of doing it. Further below we can also use the more versatile exec() method.

/*
const util = require('util'),
    spawn = require('child_process').spawn,
    ls = spawn('ls', ['-lh', '/home/brian/Documents'])

ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data)
})

ls.stderr.on('data', function (data) {
    console.log('stderr ' + data)
})

ls.on('exit', function (code) {
    console.log('child process exited with code ' + code)
})

*/

// Outputs:
//stdout: total 12K
//drwxr - xr - x  5 brian brian 4.0K Dec 12 23: 47 Code
//drwxr - xr - x 17 brian brian 4.0K Dec 12 23: 26 notes
//drwxr - xr - x  2 brian brian 4.0K Dec 12 23: 47 programming_books

//child process exited with code 0


let util = require('util'),
    exec = require('child_process').exec,
    child

child = exec('ls -lh /home/brian/Documents',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout)
        console.log('stderr: ' + stderr)
        if (error !== null) {
            console.log('exec error: ' + error)
        }
        // Splits the output's lines into separate strings to be iterated over
        //const lsArr = stdout.split(`\n`)
        //console.log(lsArr)
    }
)

//Outputs:
//stdout: total 12K
//drwxr - xr - x  5 brian brian 4.0K Dec 12 23: 47 Code
//drwxr - xr - x 17 brian brian 4.0K Dec 12 23: 26 notes
//drwxr - xr - x  2 brian brian 4.0K Dec 12 23: 47 programming_books

//stderr:

