
// Works off of the model in the models folder
const User = require('../models/userModel');
const mongoose = require('mongoose');

// Get all users
const getUsers = async (req, res) => {
    const users = await User.find({});

    res.status(200).json(users);
}


// Get a user
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'});
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'No such user'});
    }

    res.status(200).json(user);
}



// Create new user
const createUser = async (req, res) => {
    // Instantiates a request object
    const {password, firstName, lastName, email, isOwner} = req.body

    try { // Creates an user document from the above template and then sends it as a response and is stored as a json in MongoDB Atlus
        const user = await User.create({password, firstName, lastName, email, isOwner})
        res.status(200).json(user)
    } catch (error) {   
        res.status(400).json({error: error.message}) // Sends the error message
    }
}


// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'});
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(404).json({error: 'No such user'});
    }

    res.status(200).json(user)
}


// Update a user WIP
const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'});
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(404).json({error: 'No such user'});
    }

    res.status(200).json(user);
}




module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}