const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtSecret = "secret";
const User = require('../Models/User.js');

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = await User.findById(data.user.id);
        next();
    }
    catch (err) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchUser;