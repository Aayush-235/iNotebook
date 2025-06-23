const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "mySuperSecretKey";

// . means = current dir
// ..means = parent dir (one level up)

//ROUTE--1
//Create a User using : POST "/api/auth/craeteuser"

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail()
],
    async (req, res) => {
          let success=false
        // IF THERE ARE ERROR => RETURN BAD REQUSET AND THE ERROR ARRAY...
        const error = validationResult(req);
        if (!error.isEmpty()) {
            success=true
            return res.status(400).json({ success, error: error.array() })
        }
        try {
            let user = await User.findOne({ email: req.body.email })

            if (user) {
                success=true
                return res.status(400).json({ success, error: "Email already exists" })
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
            success=true
            res.json({success, authToken})
        }
        catch (err) {
            res.status(500).send("Internal Server Error")
        }


    })

//ROUTE--2
//Authentication of a User using : POST "/api/auth/login"

router.post('/login', [
    body('password', 'Password cannot be blank').exists(),
    body('email', 'Enter a valid email').isEmail()
],
    async (req, res) => {
        let success=false
        // IF THERE ARE ERROR => RETURN BAD REQUSET AND THE ERROR ARRAY...
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        const { email, password } = req.body

        try {

            let user = await User.findOne({ email });
            if (!user) {
                success = true
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })
            }

            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                success = false
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })
            }

            const data = {
                user: user.id,
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            success = true
            res.json({ success, authToken })


        } catch (err) {
            res.status(500).send("Internal Server Error")

        }


    })


//ROUTE--3
//get login_user details using : POST "/api/auth/getuser"


router.post('/getuser', fetchuser, async (req, res) => {

    try {

        //const userId = req.user.id --->>> here this is not work because we can add data in the authToken is just simple,not an object. if the data we add in the authToken is object then we can definetly write req.user.id. here req.user is give me _id of mongodb user

        const userId = req.user
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (err) {
        res.status(500).send("Internal Server Error")

    }


})

module.exports = router