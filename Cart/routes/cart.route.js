const router = require('express').Router()
const cartController = require('../controllers/cart.controller')

router.post('/addToCart', cartController.addToCart)


module.exports = router