// Importing required modules
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Defining the user schema using Mongoose
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        maxlength: [6, 'Password cannot exceed 6 characters'],
        select: false // Excluding password from query results
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    // Check if the password has been modified before hashing
    if (!this.isModified('password')) {
        next();
    }
    // Hashing the password using bcrypt with a cost factor of 10
    this.password = await bcrypt.hash(this.password, 10);
});

// Method to generate a JWT (JSON Web Token) for the user
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
};

// Method to check if the entered password is valid
userSchema.methods.isValidPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Method to generate a reset token for password recovery
userSchema.methods.getResetToken = function () {
    // Generate a random token
    const token = crypto.randomBytes(20).toString('hex');

    // Generate a hash and set it to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    // Set the token expiration time to 30 minutes
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    // Return the unhashed token (to be sent via email)
    return token;
};

// Creating a Mongoose model for the 'User' schema
let model = mongoose.model('User', userSchema);

// Exporting the User model
module.exports = model;
