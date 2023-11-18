const router = require('express').Router()

const User = require('../models/User')
const Post = require('../models/Post')

const { isAuthed } = require('./helpers')


router.post('/post', isAuthed, async (req, res) => {
    const post = await Post.create(req.body)
    const user = await User.findByPk(req.session.user_id)
    await user.addPost(post)

    res.redirect('/')
})

router.put('/post/:id', isAuthed, async (req, res) => {
    await Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })

    res.redirect('/dashboard')
})

router.delete('/post/:id', isAuthed, async (req, res) => {
    await Post.destroy({
        where: {
            id: req.params.id
        }
    })

    res.redirect('/dashboard')
})

module.exports = router