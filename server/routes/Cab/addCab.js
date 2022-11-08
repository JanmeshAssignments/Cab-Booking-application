const mongoose = require('mongoose');
const Cab = require('../../Models/Cab.js');

const addCab = async (req, res) => {
    const user = req.user;
    const {  vehicleNumber, vehicleModel, vehicleColor, vehicleCapacity, vehicleImage, lat, long } = req.body;
    try {
        let cab = await Cab.findOne({ vehicleNumber });
        if (cab || user.isDriver === false) {
            return res.status(400).json({ msg: "Cab can't be added" });
        }
        cab = new Cab({
            driver: req.user.id,
            vehicleNumber,
            vehicleModel,
            vehicleColor,
            vehicleCapacity,
            vehicleImage,
            lat,
            long
        });
        await cab.save();
        res.json(cab);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

}