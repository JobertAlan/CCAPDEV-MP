const express = require('express');

// Importing functions from the userController.js file
const {
    createCafe,
    getCafes,
    getCafe,
    deleteCafe,
    updateCafe
} = require('../controllers/cafeController');
// const requireAuth = require('../middleware/requireAuth')

// router.use(requireAuth)

// Creates an instance of the route for us
const router = express.Router();

// Attached handles to do routes for us

router.get('/', getCafes);

router.get('/:id', getCafe);

router.post('/', createCafe);

router.delete('/:id', deleteCafe);

router.patch('/:id', updateCafe);


// Exports the router 

module.exports = router;