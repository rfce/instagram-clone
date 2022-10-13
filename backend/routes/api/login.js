const express = require('express')
const router  = express.Router()

router.get('/register', (req, res) => {
    res.json({
        data: 1
    })
})

module.exports = router
