require('dotenv').config(); // Enables us to use variables declared in the .env file

// Makes it require the express package
const express = require('express'); // <- '' package that we require

// Database require
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken')
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Require ExternalWare
const requireAuth = require('./middleware/requireAuth')
const bcrypt = require('bcrypt')
const validator = require('validator')

// Models
const User = require('./models/userModel')
const Cafe = require('./models/cafeModel')



// Stores the express app
const app = express();

// Middleware <-- Basically this just looks at the requests made to the webpage and then spits them out in the console log for "easy" debugging
app.use((req, res, next1) => {
    console.log(req.path, req.method)
    next1()
})

// More middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true}))
app.use(cookieParser());
const hbs = require('hbs')
app.set('view engine', 'hbs')

// to allow file uploads
const fileUpload = require('express-fileupload');
app.use(fileUpload());


// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));

//static folder
app.use(express.static('public'));

const path = require('path')


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

    var hour = 3600000;
app.use(session({
    
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: hour * 24 * 21},
}))

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login')
    }
}
// Use nodemon "server.js" so that it re-runs the application whenever it detects changes in the project; similar to using the liveServer extension in VsCode
// Cancel it by doing Ctrl + C

// Alternatively, use "npm run dev" to do the exact same thing as above ^^ 
// This is because I added a "dev: 'nodemon server.js'" line in the package.json file

// Put your functions down here: ------------------------------------------------------------------


// Routes + Controllers

app.get('/', (req, res) => {
    if (req.session.user) {
        const userData = req.session.user;
        res.render('homepage', {userData})
    }
    else {
        res.sendFile(__dirname + '/public/html/index.html')
    }
})

// Login logic
app.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/profile')
    }
    res.sendFile(__dirname + '/public/html/login.html')
})


app.post('/login', express.urlencoded({ extended: true }), async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user === null) {
        res.send("Invalid credentials. <a href='/login'>Please try again.");
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        res.send("Invalid credentials. <a href='/login'>Please try again.");
    }

    else {
        req.session.user = user
        res.cookie("sessionId", req.sessionID)

        res.redirect('/profile')
    }
    
})


// Sign up logic
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/html/signup.html')
})

app.post('/signup', express.urlencoded({ extended: true}), async (req, res) => {
    const {email, password, firstName, lastName} = req.body

    console.log(req.body)

    if (!email || !password || !firstName || !lastName) {
        return res.send("All fields are required. <a href='/signup'>Please try again.</a>");
    }

    if (!validator.isStrongPassword(password)) {
        res.send("Password needs to be stronger bruv. <a href='/signup'>Please try again.</a>")
    }

    const exists = await User.findOne({ email })

    if (exists) {
        res.send("Invalid credentials. <a href='/signup'>Please try again.</a>");
    }

    // Salting the password
    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, salt)
    
    const user = await User.create({ email, password: hash, firstName, lastName })

    req.session.user = user
    res.cookie("sessionId", req.sessionID)

    res.redirect('/profile')
})

// Logout Logic
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('sessionId')
        res.clearCookie('connect.sid')
        res.redirect('/')
    })
})

// Profile
app.get('/profile', isAuthenticated, (req, res) => {
    const userData = req.session.user
    console.log(userData)
    res.render('profile', {userData})
})

// Cafe Logic

// Get all cafes regardless of user session
app.get('/cafe/browse', async (req, res) => {
    const cafes = await Cafe.find({})
    console.log(cafes)
    res.render('cafes', {cafes})
}) 

app.post('/profile/postcafe', isAuthenticated, async (req, res) => {
    const { name, description} = req.body
    const ownedBy = req.session.user._id




    if (!name || !description) {
        res.send("Field needed. <a href='/profile'>Try again.</a>")
    }

    const cafe = await Cafe.create({ name, description, ownedBy })
    
    res.redirect('/profile')
})
