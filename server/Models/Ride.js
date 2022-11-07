const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    rider: {
        type: String,
        ref: 'rider'
    },
    driver: {
        type: String,
        ref: 'driver'
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
    }
});
module.exports = Ride = mongoose.model('ride', RideSchema);