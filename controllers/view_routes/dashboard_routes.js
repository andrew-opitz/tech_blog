const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('dashboard_view', {
        layout: 'main'
    })
})

module.exports = router