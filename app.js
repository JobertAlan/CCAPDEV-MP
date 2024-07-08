// Start the app by entering "npm run dev" into your console

// To require the dotenv package
require('dotenv').config()

// Required packages
const express = require('express')
const expressLayout = require('express-ejs-layouts')

// Instantiates the express app
const app = express()
const PORT = 5000 || process.env.PORT;

// Holds our static files like css, images, and other js files
app.use(express.static('public'))

// For template use
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.use('/', require('./server/routes/main'))




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})