const mongoose = require('mongoose ');
const User = require('../../Models/User.js');
const Cab = require('../../Models/Cab.js');

const bookCab = async (req, res) => {
    const { userId, cabId } = req.body;
    try {
        let user = await User.findById(userId);
        let cab = await Cab.findById(cabId);
        if (!user || !cab) {
            return res.status(400).json({ msg: "User or Cab not found" });
        }
        if (user.isDriver) {
            return res.status(400).json({ msg: "Driver can't book a cab" });
        }
        if (user.cabId) {
            return res.status(400).json({ msg: "User already has a cab" });
        }
        if (cab.userId) {
            return res.status(400).json({ msg: "Cab already has a user" });
        }
        const ride = new Ride({
            rider: userId,
            driver: cab.driver.id,
            from_location: user.location,
            to_location: cab.location,
            distance: distance(user.lat, cab.lat, user.long, cab.long),
            fare: distance(user.lat, cab.lat, user.long, cab.long) * 20,
        });
        await ride.save();

        user.cabId = cabId;
        cab.userId = userId;
        await user.save();
        await cab.save();
        res.json({ msg: "Cab booked" });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports = bookCab;