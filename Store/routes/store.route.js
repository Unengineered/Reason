const router = require('express').Router()
const storeController = require('../controllers/store.controller')

router.post('/store', storeController.store)
router.get('/allStores', storeController.allStores)
router.post('/addStore', storeController.addStore)

module.exports = router