const express = require('express');

// Importing functions from the userController.js file
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/userController');

// Creates an instance of the route for us
const router = express.Router();

// Attached handles to do routes for us

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);


// Exports the router 

module.exports = router;