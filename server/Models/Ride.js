const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    rider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    from_location: {
        type: String,
        required: true
    },
    to_location: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Ride = mongoose.model('ride', RideSchema);