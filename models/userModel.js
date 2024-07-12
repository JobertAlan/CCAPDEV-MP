// Defines what reviews should contain

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');


const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^.+@(?:[\w-]+\.)+\w+$/;
    return re.test(email)
};

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please fill a valid email address']
    },
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
    isOwner: {
        type: Boolean,
        default: false
    },
    picturePath: {
        type: String
    }
    
});

// Signup method
userSchema.statics.signup = async function (email, password, firstName, lastName) {
    
    // Field Validation
    if (!validator.isStrongPassword(password)) {
        throw Error ('Password needs to be longer and requires symbols, numbers, and case-mixed letters.')
    }
    
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("Email already in use")
    }

    // hehe asin = salt get it
    const asin = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, asin)

    const user = await this.create({ email, password: hash, firstName, lastName })

    return user

}

// Signin method
userSchema.statics.signin = async function (email, password) {

    // Field Validation
    if (!email || !password) {
        throw Error('Please fill all fields')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Wrong email or password")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Wrong email or password")
    }

    return user
}

module.exports = mongoose.model('User', userSchema);