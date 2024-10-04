const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Pre-save hook to hash the password
personSchema.pre('save', async function (next) {
    const person = this; // Use regular function to access `this`
    // Hash password only if it is new or modified
    if (!person.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        person.password = await bcrypt.hash(person.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
});

// Method to compare passwords
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw new Error('Error comparing passwords');
    }
};

// Create the model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
