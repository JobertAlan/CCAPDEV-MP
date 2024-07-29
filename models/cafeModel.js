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
    ownedBy: {
        type: String,
        required: true
    },
    bglink: {
        type: String
    }

});

module.exports = mongoose.model('Cafe', cafeSchema);