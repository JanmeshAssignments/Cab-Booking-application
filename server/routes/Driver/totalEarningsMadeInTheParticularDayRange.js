const User = require('../../Models/User');
const Ride = require('../../Models/Ride');

const totalEarningMadeinTheParticularDayRange = async (req, res) => {
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
        console.log(rides)
        for (let i = 0; i < rides.length; i++) {
            if (rides[i].status == "completed" && rides[i].date.toISOString() >= startDate && rides[i].date.toISOString() <= endDate) {
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

module.exports = totalEarningMadeinTheParticularDayRange;