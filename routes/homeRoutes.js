const express = require('express')

const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const router = express.Router()

const requireAuth = require('../middleware/requireAuth')

//router.use(requireAuth)


// Homepage render
router.get('/', (req, res) => {
    res.sendFile('../public/html/index.html', { root: __dirname })
})

module.exports = router;