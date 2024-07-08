// Defines what reviews should contain

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }

});