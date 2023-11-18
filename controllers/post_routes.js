const router = require('express').Router()

const User = require('../models/User')
const Post = require('../models/Post')

function isAuthed(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }

    next()
}

async function authenticate(req, res, next) {
    const user_id = req.session.user_id

    if(user_id) {
        const user = await User.findByPk(req.session.user_id)

        req.user = user
    }
    
    next()
}
router.post('/post', isAuthed, authenticate, async (req, res) => {
    const post = await Post.create(req.body)
    await req.user.addPost(post)

    res.redirect('/')
})

module.exports = router