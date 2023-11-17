const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('dashboard_view', {
        layout: 'dashboard'
    })
})

module.exports = router