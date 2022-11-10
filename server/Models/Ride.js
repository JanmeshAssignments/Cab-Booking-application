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
        start_lat: {
            type: Number,
            required: true
        },
        start_long: {
            type: Number,
            required: true
        }
    },
    to_location: {
        end_lat: {
            type: Number,
            required: true
        },
        end_long: {
            type: Number,
            required: true
        }
    },
    from_city: {
        type: String,
        required: true
    },
    to_city: {
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