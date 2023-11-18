const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')

const { loggedIn, isAuthed, authenticate } = require('./helpers')


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
router.get('/post/edit/:id', isAuthed, authenticate, async (req, res) => {
    const editID = req.params.id
    const post = await Post.findByPk(editID)

    res.render('edit_post_form', {
        user: req.user,
        post: post.get({ plain: true }),
        title: 'Edit Post ' + post.id
    })
})

router.get('/dashboard', isAuthed, authenticate, async (req, res) => {
    try {
        const currentUserWithPosts = await User.findAll({
          where: {
            id: req.session.user_id,
          },
          include: 'posts',
        });
    
        if (currentUserWithPosts.length === 0) {
          // Handle the case where the user is not found
          return res.status(404).send('User not found');
        }
    
        res.render('dashboard', {
          user: currentUserWithPosts[0].get({ plain: true }),
        });
      } catch (error) {
        console.error('Error fetching user with posts:', error);
        res.status(500).send('Internal Server Error');
      }
    })



module.exports = router