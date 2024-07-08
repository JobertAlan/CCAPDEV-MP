// Defines what reviews should contain

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^.+@(?:[\w-]+\.)+\w+$/;
    return re.test(email)
};

const userSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please fill a valid email address']
    },
    isOwner: {
        type: Boolean,
        required: true
    }
    
});

module.exports = mongoose.model('User', userSchema);