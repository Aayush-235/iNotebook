const express = require("express")
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');

//ROUTE--1
//Get all the notes using : GET "/api/auth/fetchallnotes"

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user })
        res.json(notes)
    } catch (err) {
        res.status(500).send("Internal Server Error")
    }

})
//ROUTE--2
//Add a new notes using : POST "/api/auth/addnotes"

router.post('/addnotes', fetchuser, [

    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a description (must be at least 5 characters)').isLength({ min: 5 }),
    body('tag', 'Enter a tag').isLength({ min: 3 })], async (req, res) => {

        try {

            const { title, description, tag } = req.body

            // IF THERE ARE ERROR => RETURN BAD REQUSET AND THE ERROR ARRAY...
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() })
            }

            const notes = await Notes.create({
                title,
                description,
                tag,
                user: req.user
            })

            res.json({ notes })


        } catch (err) {
            res.status(500).send("Internal Server Error")
        }


    })

module.exports = router