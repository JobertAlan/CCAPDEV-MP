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
        type: Schema.Types.ObjectId, ref: 'User'
    }

});

module.exports = mongoose.model('Cafe', cafeSchema);