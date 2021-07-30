const router = require('express').Router()
const storeController = require('../controllers/store.controller')

router.get('/:store_id', storeController.store)
router.get('/allStoresSQL', storeController.allStoresSQL)
router.get('/allStoresMongo', storeController.allStoresMongo)
router.post('/addStores', storeController.addStores)
router.post('/deleteStores', storeController.deleteStores)
router.post('/updateStores', storeController.updateStores)

module.exports = router