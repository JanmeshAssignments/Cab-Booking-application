const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    age: {
        type: Number,
        required: true
    },
    cabId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cab'
    },
    isDriver: {
        type: Boolean,
        required: true
    }, vehicleType: {
        type: String,
        required: false
    },
})

module.exports = User = mongoose.model('user', Userschema);