const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../../Models/User.js');
const Cab = require('../../Models/Cab.js');
const Ride = require('../../Models/Ride')
const geocoding = require('reverse-geocoding');

const bookCab = async (req, res) => {
    const userId = req.user.id;
    const { cabId, start_lat, end_lat, start_long, end_long } = req.body;
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
        let start_city = "";
        let end_city = "";
        const options1 = {
            method: 'GET',
            url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
            params: { location: `${start_lat},${start_long}`, language: 'en' },
            headers: {
                'X-RapidAPI-Key': '84823881b1msh9b722652b319c59p175e83jsn789bc9e1aed2',
                'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
            }
        };
        await axios.request(options1).then(function (response) {
            start_city = response.data.results[0].locality;
        }).catch(function (error) {
            console.error(error);
        });
        const options2 = {
            method: 'GET',
            url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
            params: { location: `${end_lat},${end_long}`, language: 'en' },
            headers: {
                'X-RapidAPI-Key': '84823881b1msh9b722652b319c59p175e83jsn789bc9e1aed2',
                'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
            }
        };
        await axios.request(options2).then(function (response) {
            end_city = response.data.results[0].locality;
        }).catch(function (error) {
            console.error(error);
        });
        // console.log(start_city, end_city);
        // res.json({ city: start_city, end_city })
        // console.log(cab)
        const ride = new Ride({
            rider: userId,
            driver: cab.driver,
            from_location: { start_lat, start_long },
            from_city: start_city,
            to_city: end_city,
            to_location: { end_lat, end_long },
            distance: distance(start_lat, end_lat, start_long, end_long),
            fare: distance(start_lat, end_lat, start_long, end_long) * 20,
        });
        await ride.save();

        user.cabId = cabId;
        cab.userId = userId;
        await user.save();
        await cab.save();
        res.json({ msg: "Cab booked",ride });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

function distance(lat1,
    lat2, lon1, lon2) {

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return (c * r);
}

module.exports = bookCab;