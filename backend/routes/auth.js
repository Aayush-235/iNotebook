const express = require("express")
const router = express.Router()
const User = require("../models/User")
// . means = current dir
// ..means = parent dir (one level up)


//Create a User using : "/api/auth"
// does not reqire Auth
router.get('/', (req, res) => {
    console.log(req.body)
    const user = User(req.body)
    user.save()
    res.send("Hi User!!!")
})

//  router.get('/', (req, res) => {
//     console.log(req.body)
//     res.send(req.body)
// })




module.exports = router