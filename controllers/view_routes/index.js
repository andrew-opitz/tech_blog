const router = require('express').Router()
const dashboard_routes = require('./dashboard_routes')
const home_routes = require('./home_routes')


router.use('/dashboard', dashboard_routes)
router.use('/home', home_routes)






module.exports = router