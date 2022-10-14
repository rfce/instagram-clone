const express = require('express')
const loginUser = require('../../controllers/loginUser')
const registerUser = require('../../controllers/registerUser')
const router  = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)

module.exports = router
