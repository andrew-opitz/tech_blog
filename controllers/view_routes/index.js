const router = require('express').Router()
const dashboard_routes = require('./dashboard_routes')
const home_routes = require('./home_routes')
const User = require('../../models/User')


router.use('/dashboard', dashboard_routes)
router.use('/', home_routes)

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
}





module.exports = router