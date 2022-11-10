const express = require("express");
const router = express.Router();
const addCab = require("./Cab/addCab.js");
const bookCab = require("./Cab/bookCab.js");
const findCab = require("./Cab/findCab.js");
const fetchUser = require("../Middleware/fetchUser.js");
const completingARide = require("./Cab/completingARide.js");
const jwtSecret = "secret";

//@route POST api/cab/addcab
//@desc Register cab
//@access Driver
router.post("/addcab", fetchUser, addCab);

//@route POST api/cab/bookCab
//@desc Book cab
//@access User
router.post("/bookcab", fetchUser, bookCab);

//@route POST api/cab/findCab
//@desc Find cab
//@access public
router.post("/findcab", fetchUser, findCab);

//@route POST api/cab/completingARide
//@desc Completing a ride
//@access Driver
router.put("/completingaride", fetchUser, completingARide);
module.exports = router;