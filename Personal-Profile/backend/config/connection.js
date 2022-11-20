const mongoose = require('mongoose')
require('dotenv').config()

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_ADDR}/${process.env.DB_NAME}?retryWrites=true&w=majority`
const connection = mongoose.connect(url)
.then(() => console.log("Connection to database success"))
.catch((err) => console.log("Connection to database failed"))

module.exports = connection