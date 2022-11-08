const User = require('../../Models/User');
const Ride = require('../../Models/Ride');

const totalSuccessFullRidesCompletedInLastWeek = async (req, res) => {
    const { startDate, endDate } = req.body;
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        if (!user.isDriver) {
            return res.status(400).json({ msg: "User is not a driver" });
        }
        let rides = await Ride.find({ driver: req.user.id });
        let toalFare = 0;
        for (let i = 0; i < rides.length; i++) {
            if (rides[i].status == "completed" && rides[i].date >= startDate && rides[i].date <= endDate) {
                toalFare += rides[i].fare;
            }
        }
        res.json({ toalFare });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports = totalSuccessFullRidesCompletedInLastWeek;