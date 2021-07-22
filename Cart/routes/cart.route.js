const router = require('express').Router()
const cartController = require('../controllers/cart.controller')

router.post('/addToCart', cartController.addToCart)
router.post('/deleteFromCart', cartController.deleteFromCart)
router.post('/updateCart', cartController.updateCart)


module.exports = router