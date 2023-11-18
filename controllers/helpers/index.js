const User = require('../../models/User')
const Post = require('../../models/Post')


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
        const user = await User.findByPk(req.session.user_id, {
            attributes: ['id', 'username']
        })

        req.user = user.get({plain: true})
    }
    
    next()
}

module.exports = { loggedIn, isAuthed, authenticate }