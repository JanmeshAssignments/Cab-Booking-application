const User = require('../../Models/User.js');
const Ride = require('../../Models/Ride.js');

const NoOfTimesUserChoseHyderabadAsDropPoint = async (req, res) => {
    try {
        let user = await User.findById(req.user.id
        );
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        if (user.isDriver) {
            return res.status(400).json({ msg: "User is a driver" });
        }
        let rides = await Ride.find({ rider: req.user.id });
        let count = 0;
        for (let i = 0; i < rides.length; i++) {
            if (rides[i].to_location == "Hyderabad") {
                count++;
            }
        }
        res.json({ count });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports = NoOfTimesUserChoseHyderabadAsDropPoint;