const User = require('../../Models/User.js');
const Ride = require('../../Models/Ride.js');

const totalSuccessFullRidesCompletedInLastWeek = async (req, res) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const endDate = new Date();
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        if (!user.isDriver) {
            return res.status(400).json({ msg: "User is not a driver" });
        }
        let rides = await Ride.find({ driver: req.user.id });
        let map = new Map();

        for (let i = 0; i < rides.length; i++) {
            if (rides[i].status == "completed" && rides[i].date >= startDate && rides[i].date <= endDate) {
                let date = rides[i].date;
                if (map.has(date)) {
                    map.set(date, map.get(date) + rides[i].fare);
                }
                else {
                    map.set(date, rides[i].fare);
                }
            }
        }
        let max = 0;
        let maxDate = null;
        for (let [key, value] of map) {
            if (value > max) {
                max = value;
                maxDate = key;
            }
        }
        const days = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
        res.json({ maxDate: days[maxDate.getDay()], maxFare: max });

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports = totalSuccessFullRidesCompletedInLastWeek;