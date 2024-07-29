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
const Review = require('./models/reviewModel')



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


// Handlebar engine settings
const expbs = require('express-handlebars')
const hbs = require('hbs')
app.set('view engine', 'hbs')
app.engine('hbs', expbs.engine({ 
    extname: '.hbs', 
    defaultLayout: 'main',
    helpers: {
        // Customer helpers 
        truncate: function (text, length, ending) {
            if (text.length > length) {
                return text.substring(0, length) + (ending || '...')
            }
            else {
                return text
            }
        },
        toLocale: function (date) {
            // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
            return date.toLocaleString();
        }
    }
 }))

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



// Put your functions down here: ------------------------------------------------------------------

// Routes + Controllers

app.get('/', (req, res) => {
    if (req.session.user) {
        const userData = req.session.user;
        res.render('index', {userData})
    }
    else {
        // res.sendFile(__dirname + '/public/html/index.html')
        res.render('index')
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

    
    if (!email || !password) {
        // res.send("Invalid credentials. <a href='/login'>Please try again.");
        res.status(400).send("Invalid credentials. <a href='/login'>Please try again.");
        return;
    }

    const user = await User.findOne({ email })

    if (user === null) {
        // res.send("Invalid credentials. <a href='/login'>Please try again.");
        res.status(400).send("Invalid credentials. <a href='/login'>Please try again.");
        return;
        
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        // res.send("Invalid credentials. <a href='/login'>Please try again.");
        res.status(400).send("Invalid credentials. <a href='/login'>Please try again.");
        return;
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
app.get('/profile', isAuthenticated, async (req, res) => {
    const userData = req.session.user
    // console.log(userData)

    let hasCafe = await Cafe.findOne({}).select({ownedBy: userData._id})

    let context = {
        userData,
        hasCafe
    }


    res.render('profile', context)
})

// Cafe Logic

// Get all cafes regardless of user session
app.get('/cafe/browse', async (req, res) => {

    const userData = req.session.user

    const cafes = await Cafe.find({}).lean()
    //console.log(cafes)

    const context = {
        userData,
        cafes
    }

    res.render('cafes', context)
}) 

app.get('/cafe/search', async (req, res) => {
    
    const cafeName = req.query.search.trim().toLowerCase();

    try {
        const cafe = await Cafe.findOne({ name: new RegExp(`^${cafeName}$`, 'i') }).lean() // Case-insensitive search

        if (cafe) {
            res.redirect(`/cafe/${cafe._id}`);
        } 
        else {
            // res.status(404).render('error', { message: 'Cafe not found' });
            res.redirect('/')
        }
    } 
    catch (err) {
        console.error('Error finding cafe:', err);
        // res.status(500).render('error', { message: 'Internal server error' });
        res.redirect('/')
    }

})

app.get('/cafe/:id', async (req, res) => {
    const cafeId = req.params.id

    const cafe = await Cafe.findById(cafeId).lean()

    const reviews = await Review.find({cafeReviewed: cafeId}).lean()

    const reviewUserData = await Promise.all(reviews.map(async (review) => {
        const user = await User.findById(review.postedBy, 'firstName').lean()
        return {
            ...review,
            firstName: user ? user.firstName : 'Cannot find name'
        }
    }))

    

    if (cafe) {
        res.render('cafe', {cafe, reviews: reviewUserData } )
    }
    else {
        res.status(404).send('cafe not found')
    }
})

// Make a cafe
app.post('/profile/postcafe', isAuthenticated, async (req, res) => {
    const { name, description} = req.body
    const ownedBy = req.session.user._id

    if (!name || !description) {
        res.send("Field needed. <a href='/profile'>Try again.</a>")
    }

    const hasCafe = await Cafe.findOne({ ownedBy: ownedBy })

    if (!hasCafe) {
        const cafe = await Cafe.create({ name, description, ownedBy })
    }
    
    res.redirect('/profile')
})


// Review Logic

app.post('/cafe/:id/postreview', isAuthenticated, async (req, res) => {
    const { reviewTitle, reviewDescription, reviewRating } = req.body
    const reviewedBy = req.session.user._id
    const cafeReviewed = req.params.id

    if (!reviewTitle || !reviewDescription || !reviewRating) {
        res.redirect(`/cafe/${cafeReviewed}`)
    }

    const review = await Review.create({ 
        title: reviewTitle, 
        description: reviewDescription, 
        rating: reviewRating,
        postedBy: reviewedBy,
        cafeReviewed: cafeReviewed })
    
    res.redirect(`/cafe/${cafeReviewed}`)
})
