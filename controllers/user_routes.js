const router = require('express').Router()
const User = require('../models/User')

router.post('/register', async (req, res) => {
    try {
        
        const user = await User.create(req.body);
       
    
        req.session.user_id = user.id;
        
    
        res.redirect('/');
      } catch (error) {
        
        req.session.errors = ['Please try again.']
        res.redirect('/register');
      }

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

router.get('/logout', async (req, res) => {
    const user = User.findOne({
        where: {
            id: req.session.user_id
        }
    })
    if (!user) {
        req.session.errors = ['Please try again']

        return res.redirect('/')
    }
    req.session.destroy()

    res.redirect('/')
})

module.exports = router