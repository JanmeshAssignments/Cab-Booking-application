const express = require("express");
const addRider = require('./Rider/addRider.js')


router = express.Router();

const jwtSecret = "secret";

//@route POST api/rider 
//@desc Register rider
//@access Public
router.post("/",addRider);


module.exports = router;