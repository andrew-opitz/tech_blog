const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')

function loggedIn(req, res, next) {
    if(req.session.user_id) {
        return res.redirect('/')
    }

    next()
}

function isAuthed(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }

    next()
}


async function authenticate(req, res, next) {
    const user_id = req.session.user_id

    if(user_id) {
        const user = await User.findbypk(req.session.user_id, {
            attributes: ['id', 'email']
        })

        req.user = user.get({plain: true})
    }
    
    next()
}

router.get('/', authenticate, async (req, res) => {
    const posts = await Post.findAll({
        include: {
            model: User,
            as: 'author'
        }
    })
    res.render('landing_page', {
        user: req.user,
        posts: posts.map(p => p.get({ plain: true }))
    })
})

router.get('/register', loggedIn, authenticate, (req, res) => {
    res.render('register_form', {
        error: req.session.errors,
        user: req.user
    })

    req.session.errors = []
})

router.get('/login', loggedIn, authenticate, (req, res) => {
    res.render('login_form', {
        errors: req.session.errors,
        user: req.user
    })

    req.session.errors = []
})

router.get('/post', isAuthed, authenticate, (req, res) => {
    res.render('post_form', {
        user: req.user
    })

    req.session.errors = []
})

module.exports = router