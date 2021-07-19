const router = require('express').Router()
const productController = require('../controllers/product.controller')

router.post('/product', productController.product)
router.post('/addproduct', productController.addProduct)

module.exports = router