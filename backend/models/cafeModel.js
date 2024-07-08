// Defines what reviews should contain

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const cafeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: '0'
    },
    ownerID: {
        type: Number
    }

});