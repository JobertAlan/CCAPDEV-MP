const express = require('express');

// Importing functions from the userController.js file
const {
    createReview,
    getReviews,
    getReview,
    deleteReview,
    updateReview
} = require('../controllers/reviewController');

// Creates an instance of the route for us
const router = express.Router();

// Attached handles to do routes for us

router.get('/', getReviews);

router.get('/:id', getReview);

router.post('/', createReview);

router.delete('/:id', deleteReview);

router.patch('/:id', updateReview);


// Exports the router 

module.exports = router;