const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = 3001

// parse the inputs
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// allow for CORS
app.use(cors())

// set up the general routing path
app.use('/api', require('./api.js'))

app.listen(port, '0.0.0.0', () => console.log('listening on the port ', port))

module.exports = app

// Intranet IP: '10.1.1.144'