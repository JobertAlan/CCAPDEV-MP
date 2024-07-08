require('dotenv').config(); // Enables us to use variables declared in the .env file

// Makes it require the express package
const express = require('express'); // <- '' package that we require

// Database require
const mongoose = require('mongoose');

// Routes 
const reviewRoutes = require('./routes/reviewRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
//const cafeRoutes = require('./routes/cafeRoutes.js')

// Stores the express app
const app = express();

// Middleware <-- Basically this just looks at the requests made to the webpage and then spits them out in the console log for "easy" debugging
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// More middleware
app.use(express.json());

// to allow file uploads
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));


// Connect to mongoDB database + start up the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listens for requests
        app.listen(process.env.PORT, () => {
        console.log('Listening on port', process.env.PORT)  // Basically this is making the server that the webapp runs on and will be on localhost:5000
        });
    })
    .catch((error) => {
        console.log(error)
    })



// Use nodemon "server.js" so that it re-runs the application whenever it detects changes in the project; similar to using the liveServer extension in VsCode
// Cancel it by doing Ctrl + C

// Alternatively, use "npm run dev" to do the exact same thing as above ^^ 
// This is because I added a "dev: 'nodemon server.js'" line in the package.json file


// Sample get request route

// app.get('/', (req, res) => {    // Gets the route '/' from the page and then responds with the message prompt
//     res.json({mssg: 'Welcome to the app'})
// });

// Put your functions down here: ------------------------------------------------------------------

// Routes
app.use('/reviews', reviewRoutes); // makes it so this only fires when the url looks like /cafes
app.use('/user', userRoutes);
//app.use(reviewRoutes);


