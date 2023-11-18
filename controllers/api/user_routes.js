const router = require('express').Router()
const {loggedIn, isAuthed, authenticate} = require('../authentication')

router.get('/', (req, res) => {
    res.send('Got it!')
})

router.post('/auth/login', authenticate, (req, res) => {

})
// post, put delete
module.exports = router