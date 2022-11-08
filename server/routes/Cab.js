const express = require("express");
const router = express.Router();
const addCab = require("./Cab/addCab.js");
const fetchUser = require("../Middleware/fetchUser.js");
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

module.exports = router;