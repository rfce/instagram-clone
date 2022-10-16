const express = require('express')
const loginUser = require('../../controllers/loginUser')
const registerUser = require('../../controllers/registerUser')
const searchUsers = require('../../controllers/searchUsers')
const userInfo = require('../../controllers/userInfo')
const router  = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post("/info", userInfo)
router.post("/search", searchUsers)

module.exports = router
