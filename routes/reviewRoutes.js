const express = require('express');

// Creates an instance of the route for us
const router = express.Router();

// Attached handles to do routes for us

// Sample routes that do things for us 
router.get('/reviews', (req, res) => {
    res.json({mssg: 'GET all reviews'})
})

router.get('/:id', (req, res) => {
    res.json({mssg: 'GET single review'})
})

router.post('/new/review', (req, res) => {
    res.json({mssg: 'POST a new review'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a new review'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'PATCH a new review'})
})


// Exports the router 

module.exports = router;