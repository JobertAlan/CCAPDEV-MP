const express = require('express')

const router = express.Router()

// Put your routes here:

//Routes to the main
router.get('', (req, res) => {
    res.render('index')
})

router.get

router.get('/about', (req, res) => {
    res.render('about')
})

module.exports = router;