const router = require('express').Router()
const featuresController = require('../controllers/features.controller')

router.post('/', featuresController.features)


module.exports = router