const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DriverSchema = new Schema({
    user: {
        type: string,
        ref: 'users'
    },
    location: {
        type: String
    },
    status: {
        type: Boolean,
        required: true
    },
    age: {
        type: Number,
        required: true

    },

    bio: {
        type: String
    },
});

module.exports = Driver = mongoose.model('driver', DriverSchema);