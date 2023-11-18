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
router.delete('/post/:id', isAuthed, authenticate, async (req, res) => {
console.log('delete route hit')
    try {
        const deleteID = req.params.id
        const deletePost = await Post.findByPk(deleteID)

        await deletePost.destroy()

        res.redirect("/")
    } catch (error) {
        const validationErrors = error.errors.map((errObj) => errObj.message)
        req.session.errors = validationErrors;
        res.render("/", { errors: req.session.errors })
    }
    if (deletePost) {
        res.redirect('/')
    }
})

module.exports = router