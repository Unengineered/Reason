const router = require('express').Router()
const storeController = require('../controllers/store.controller')

router.post('/', storeController.store)
router.get('/', storeController.stores)

module.exports = router