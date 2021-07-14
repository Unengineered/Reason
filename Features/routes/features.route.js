const router = require('express').Router()
const featuresController = require('../controllers/features.controller')

router.get('/', featuresController.features)


module.exports = router