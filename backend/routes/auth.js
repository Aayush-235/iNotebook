const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    res.send("you are in auth.js")
})
router.get('/moreinfo', (req, res) => {
    res.send("More info is here!!!")
})

module.exports = router