const router = require('express').Router()
const profileController = require('../controllers/profile.controller')

router.post('/', profileController.profile)


module.exports = router