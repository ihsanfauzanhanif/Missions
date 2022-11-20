const express = require('express')
const connection = require('./config/connection')
const route = require('./routes/profile')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json({
    limit: '10mb'
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/profile', route)
app.listen(port, () => {
    console.log("Server is running");
})