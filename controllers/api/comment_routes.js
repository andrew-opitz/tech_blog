const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Got it!')
})

module.exports = router