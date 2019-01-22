const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

// parse the inputs
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// set up the general routing path
app.use('/api', require('./api.js'))

app.listen(port, () => console.log('listening on the port'))