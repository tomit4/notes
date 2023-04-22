const express = require('express')
const route = express.Router()
const app = express()
// const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

// middleware
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
)
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, 'public')))
// may not be necessary...
// app.use(express.json())

// routes
// route.get('/', (req, res) =>
    // res.sendFile(__dirname + '/index.html'))

app.get('/stream', (req, res) => {
    console.log('Client Connected')
    res.setHeader('Content-Type', 'text/event-stream')
    // res.setHeader('Access-Control-Allow-Origin', '*')
    let i = 0
    const intervalId = setInterval(() => {
        // const date = new Date().toLocaleString()
        // res.write(`data: ${date}\n\n`)
        res.write(`data: hello: ${i++}\n\n`)
    }, 1000)

    res.on('close', () => {
        console.log('Client closed connection')
        clearInterval(intervalId)
        res.end()
    })
    // send(res)
})

// server
app.listen(8080, () => console.log('listening on 8080'))
