const express = require('express');

// Importing functions from the userController.js file
const {
    createUser,
    signIn,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/userController');

// Creates an instance of the route for us
const router = express.Router();

// Attached handles to do routes for us

router.get('/users', getUsers);

router.get('/:id', getUser);

router.post('/signup', createUser);

router.post('/signin', signIn);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);


// Exports the router 

module.exports = router;