const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {

    res.json({
        name: "Aayush Savaliya",
    })
})

module.exports = router