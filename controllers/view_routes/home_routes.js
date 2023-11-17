const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('login_form', {
        layout: 'main',

    })
})

module.exports = router