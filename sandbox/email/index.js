require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())

const route = express.Router()
const port = process.env.PORT || 8080

app.use('/v1', route)

const transporter = nodemailer.createTransport({
    port: 465,
    host: process.env.HOST,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS
        },
    secure: true
})


// separate out concerns, one server serves the page, another sends the email
route.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

route.post('/text-mail', (req, res) => {
    const {subject, body} = req.body
    // create a from field in the html form
    // const {from, subject, body} = req.body
    const mailData ={
        from: process.env.FROM,
        // from: from,
        to: process.env.TO,
        subject: subject,
        text: body,
        html: `<b>Hey There!</b><br>${body}</br>`
    }

    transporter.sendMail(mailData, function (err, info) {
        if (err) {
            return console.log(err)
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId })
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
