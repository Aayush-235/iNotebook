const express = require("express")
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');

//ROUTE--1
//Get all the notes using : GET "/api/notes/fetchallnotes"

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user })
        res.json(notes)
    } catch (err) {
        res.status(500).send("Internal Server Error")
    }

})
//ROUTE--2
//Add a new notes using : POST "/api/notes/addnotes"

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


//ROUTE--3
//Update existing notes using : POST "/api/notes/updatenotes"

router.put('/updatenotes/:id', fetchuser, async (req, res) => {

    try {
        // console.log("at try block")
        const { title, description, tag } = req.body

        //Create newnotes object

        const newnotes = {}
        if (title) { newnotes.title = title }
        if (description) { newnotes.description = description }
        if (tag) { newnotes.tag = tag }
        
        //Find the note to be updated and update it

        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Note not found")
        }
        if (note.user.toString() != req.user) {
            return res.status(401).send("Not authorized")

        }

        // console.log("here")

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnotes }, { new: true })
        // note = await Notes.findOneAndUpdate({_id : req.params.id}, { $set: newnotes }, { new: true })
        res.json({ note })


    }

    catch (err) {
        // console.log("at catch block")
        res.status(500).send("Internal Server Error")
    }


})

module.exports = router