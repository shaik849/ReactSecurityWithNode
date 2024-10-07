const express = require('express')
const router = express.Router();
const user = require('../Controllers/Auth')
const middleware = require('../Middlewares/Middleware')

router.post('/signup', user.signUp)
router.post('/login', user.login)
router.get('/profile', middleware,user.profile)

module.exports = router;