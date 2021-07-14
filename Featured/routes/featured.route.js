const router = require('express').Router()
const featuredController = require('../controllers/featured.controller')

router.get('/', featuredController.featured)


module.exports = router