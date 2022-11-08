const express = require("express");
const addDriver = require('./Driver/addDriver.js')

router = express.Router();


//@route POST api/rider
//@desc Register rider
//@access Public
router.post('/',addDriver);
module.exports = router;