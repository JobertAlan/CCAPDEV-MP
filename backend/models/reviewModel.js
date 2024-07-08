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
    },
    upvotes: {
        type: Number,
        default: '0'
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    editedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    cafeName: {
        type: Schema.Types.ObjectId, ref: 'Cafe'
    }

});

module.exports = mongoose.model('Review', reviewSchema);