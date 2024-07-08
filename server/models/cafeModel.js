
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = require('userModel')

const cafeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    picturePath: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
    
});

module.exports = mongoose.model('Cafe', cafeSchema);