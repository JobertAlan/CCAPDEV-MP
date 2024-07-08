const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = require('userModel')

const reviewSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        required: true
    },
    picturePath: {
        type: String
    },
    upvotes: {
        type: Number,
        default: '0'
    }
    
});

module.exports = mongoose.model('Review', reviewSchema);