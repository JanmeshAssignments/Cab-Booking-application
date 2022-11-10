const express = require("express");
const addDriver = require('./Driver/addDriver.js')
const fetchUser = require('../Middleware/fetchUser.js');
const highestEarningDayOfDriver = require('./Driver/highestEarningDayOfDriver.js')
const totalEarningsMadeInTheParticularDayRange = require('./Driver/totalEarningsMadeInTheParticularDayRange.js')
const totalSuccessFullRidesCompletedInLastWeek = require('./Driver/totalSuccessFullRidesCompletedInLastWeek.js')

router = express.Router();


//@route POST api/rider
//@data {name, email, password, username, phone, age}
//@desc Register rider
//@access Public
router.post('/', addDriver);

//@route GET api/driver/highestearningdayofdriver
//@desc Highest earning Day of Driver
//@access Driver
router.get('/highestearningdayofdriver', fetchUser, highestEarningDayOfDriver);

//@route POST api/driver/totalEarningMadeinTheParticularDayRange
//@data {startDate, endDate}
//@desc Total Earning Made in The Particular Day Range
//@access Driver
router.post('/totalearningmadeintheparticulardayrange', fetchUser, totalEarningsMadeInTheParticularDayRange);

//@route GET api/driver/totalSuccessFullRidesCompletedInLastWeek
//@desc Total Success Full Rides Completed In Last Week
//@access Driver
router.get('/totalsuccessfullridescompletedinlastweek', fetchUser, totalSuccessFullRidesCompletedInLastWeek);



module.exports = router;