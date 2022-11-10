const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router = express.Router();
const jwtSecret = "secret";
const addRider = async (req, res) => {
    const { name, email, password, username, phone, age } = req.body;
    try {
        let rider = await User.findOne({ email, username, phone });
        if (rider) {
            return res.status(400).json({ msg: "User already exists" });
        }
        user = new User({
            name,
            email,
            password,
            username,
            phone,
            age,
            isDriver: false

        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(
            payload,
            jwtSecret,
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

module.exports = addRider;