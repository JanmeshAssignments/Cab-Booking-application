const User = require('../../Models/User.js');
const Ride = require('../../Models/Ride.js');

const totalSuccessFullRidesCompletedInLastWeek = async (req, res) => {
    const { userId } = req.body;
    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        if (!user.isDriver) {
            return res.status(400).json({ msg: "User is not a driver" });
        }
        let rides = await Ride.find({ driver: userId });
        let totalRides = 0;
        for (let i = 0; i < rides.length; i++) {
            if (rides[i].status == "completed") {
                totalRides++;
            }
        }
        res.json({ totalRides });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports = totalSuccessFullRidesCompletedInLastWeek;