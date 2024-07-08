// Start the app by entering "npm run dev" into your console

// To require the dotenv package
require('dotenv').config()

// Required packages
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')

// Instantiates the express app
const app = express()
const PORT = 5000 || process.env.PORT;

// Middleware <-- Basically this just looks at the requests made to the webpage and then spits them out in the console log for "easy" debugging
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// More middleware
app.use(express.json());

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));


// Connect to mongoDB database + start up the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listens for requests
        app.listen(process.env.PORT, () => {
        console.log('Listening on port', process.env.PORT)  // Basically this is making the server that the webapp runs on and will be on localhost:3000
        });
    })
    .catch((error) => {
        console.log(error)
    })

// Holds our static files like css, images, and other js files
app.use(express.static('public'))

// For template use
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')


//Instantiate routes here:
const mainRoutes = require('./server/routes/mainRoutes.js')
//const reviewRoutes = require('./server/routes/reviewRoutes.js')
const userRoutes = require('./server/routes/userRoutes.js')


// Routes here:

app.use('/', mainRoutes) // Route to landing page
//app.use('/reviews', reviewRoutes); // makes it so this only fires when the url looks like /cafes
app.use('/user', userRoutes);

