const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "mySuperSecretKey";

// . means = current dir
// ..means = parent dir (one level up)


//Create a User using : POST "/api/auth/craeteuser"

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail()
],
    async (req, res) => {
        // IF THERE ARE ERROR => RETURN BAD REQUSET AND THE ERROR ARRAY...
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }
        try {
            let user = await User.findOne({ email: req.body.email })

            if (user) {
                return res.status(400).json({ error: "Email already exists" })
            }

            // password encryption
            const salt = await bcrypt.genSalt(10);
            const setPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: setPass
            })

            // generate authToken...
            const data = {
                user: user.id,
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            // console.log(authToken) to show the jwt_token in console
            res.json({ authToken })
        }
        catch (err) {
            res.status(500).send("Internal Server Error")
        }


    })

//Authentication of a User using : POST "/api/auth/login"

router.post('/login', [
    body('password', 'Password cannot be blank').exists(),
    body('email', 'Enter a valid email').isEmail()
],
    async (req, res) => {

        // IF THERE ARE ERROR => RETURN BAD REQUSET AND THE ERROR ARRAY...
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        const { email, password } = req.body

        try {

            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" })
            }

            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with correct credentials" })
            }

            const data = {
                user: user.id,
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ authToken })

        } catch (err) {
            res.status(500).send("Internal Server Error")

        }


    })

module.exports = router