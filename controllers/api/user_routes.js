const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Got it!')
})
// post, put delete
module.exports = router