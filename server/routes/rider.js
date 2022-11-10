const express = require("express");
const fetchUser = require("../Middleware/fetchUser");
const addRider = require('./Rider/addRider.js')
const bookingsInACertainTimeFrame = require('./Rider/bookingsInACertainTimeFrame.js')
const totalAndAverageSpendingInLastWeek = require('./Rider/totalAndAverageSpendingInLastWeek')
const chooseHyderabad = require('./Rider/chooseHyderabad')
router = express.Router();

const jwtSecret = "secret";

//@route POST api/rider 
//@desc Register rider
//@access Public
router.post("/",addRider);

//@route POST api/rider/bookingsInACertainTimeFrame
//@desc Get total successful rides completed in a certain time frame
//@access rider
router.post("/bookingsInACertainTimeFrame", fetchUser, bookingsInACertainTimeFrame);


//route GET api/rider/totalAndAverageSpendingInLastWeek
//@desc total and avergae spending in last week
//@access rider
router.get("/totalAndAverageSpendingInLastWeek",fetchUser,totalAndAverageSpendingInLastWeek)

//route GET api/rider/chooseHyderabad
//@desc no. of times user rider hyderbad as droppoint
//@access rider
router.get("/chooseHyderabad",fetchUser,chooseHyderabad)


module.exports = router;