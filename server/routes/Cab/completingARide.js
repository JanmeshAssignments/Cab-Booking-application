const Ride = require('../../Models/Ride.js');
const User = require('../../Models/User.js');

const completingARide = async (req, res) => {
    const { rideId } = req.body;
    const user = req.user;
    try {
        let ride = await Ride.findById(rideId);
        const driver = await (User.findById(ride.driver));
        if (!ride) {
            return res.status(400).json({ msg: "Ride not found" });
        }
        if (ride.status != "pending") {
            return res.status(400).json({ msg: "Ride is not pending" });
        }
        if (!user.isDriver) {
            return res.status(400).json({ msg: "User is not a driver" });
        }
        const isDriver = user._id.toString() === driver._id.toString();
        if (!isDriver) {
            return res.status(400).json({ msg: "User is not the driver of this ride" });
        }

        ride.status = "completed";
        await Ride.findByIdAndUpdate(rideId, ride);
        res.json({ msg: "Ride completed" });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports = completingARide;