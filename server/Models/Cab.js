const mongoose = require('mongoose');

const CabSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    vehicleModel: {
        type: String,
        required: true
    },
    vehicleColor: {
        type: String,
        required: true
    },
    vehicleCapacity: {
        type: Number,
        required: true
    },
    vehicleImage: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
});

module.exports = Cab = mongoose.model('cab', CabSchema);