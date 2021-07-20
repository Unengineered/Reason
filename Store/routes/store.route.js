const router = require('express').Router()
const storeController = require('../controllers/store.controller')

router.post('/', storeController.store)
router.get('/allStoresSQL', storeController.allStoresSQL)
router.get('/allStoresMongo', storeController.allStoresMongo)
router.post('/addStores', storeController.addStores)
router.post('/deleteStores', storeController.deleteStores)

module.exports = router