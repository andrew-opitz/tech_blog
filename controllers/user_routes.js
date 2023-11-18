const router = require('express').Router()
const User = require('../models/User')

router.post('/register', async (req, res) => {
    const user = await User.create(req.body)

    req.session.user_id = user.id

    res.redirect('/')
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    if (!user) {
        req.session.errors = ['No user found with that username.']
        return res.redirect('/login')
    }
    const validPass = await user.validatePass(req.body.password)

    if(!validPass) {
        req.session.errors = ['Password is incorrect.']

        return res.redirect('/login')
    }

    req.session.user_id = user.id

    res.redirect('/')
})

router.get('/logout', (req, res) => {
    req.session.destroy()

    res.redirect('/')
})

module.exports = router