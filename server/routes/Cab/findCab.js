const mongoose = require('mongoose');
const Cab = require('../../Models/Cab.js');


const findCab = async (req, res) => {
    const {lat, long} = req.body;
    try {
        let cab = await Cab.find();
        let cabList = sortingCabs(cab,lat,long);
        if (cabList.length === 0) {
            return res.status(400).json({ msg: "Cab can't be found" });
        }
        res.json(cabList);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

}


function sortingCabs(cab,lat,long) {
    for (let i = 0; i < cab.length; i++) {
        cab[i].distance = distance(lat, cab[i].lat, long, cab[i].long);
    }
    cab.sort((a, b) => (a.distance < b.distance) ? 1 : -1);
    let cabList = [];
    for (let i = 0; i < cab.length; i++) {
        if (cab[i].distance > 5) {
            break;
        }
        cabList.push(cab[i]);
    }
    return cabList;
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

module.exports = findCab;