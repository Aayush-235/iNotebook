const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');

// . means = current dir
// ..means = parent dir (one level up)


//Create a User using : "/api/auth"
// does not reqire Auth
router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then((user) => {
        return res.json(user)
    }).catch((err) => {
        {
            console.log(err)
            res.json({ error: "Please enter a unique value"})
        }
    })
})






module.exports = router