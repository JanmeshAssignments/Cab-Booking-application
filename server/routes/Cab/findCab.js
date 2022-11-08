const mongoose = require('mongoose');
const Cab = require('../../Models/Cab.js');
const distance = require('./distance.js');


const findCab = async (req, res) => {
    const [lat, long] = req.body;
    try {
        let cab = await Cab.find();
        let cabList = sortingCabs(cab);
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


function sortingCabs(cab) {
    for (let i = 0; i < cab.length; i++) {
        cab[i].distance = distance(lat, cab[i].lat, long, cab[i].long);
        cab[i].fare = cab[i].distance * 20;
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


module.exports = findCab;