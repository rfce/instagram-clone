const express = require('express')
const loginUser = require('../../controllers/loginUser')
const registerUser = require('../../controllers/registerUser')
const searchUsers = require('../../controllers/searchUsers')
const profileData = require('../../controllers/profileData')
const userInfo = require('../../controllers/userInfo')
const router  = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post("/profile", profileData)
router.post("/search", searchUsers)
router.post("/info", userInfo)

module.exports = router
