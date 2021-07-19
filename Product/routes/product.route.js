const router = require('express').Router()
const productController = require('../controllers/product.controller')

router.post('/product', productController.product)
router.get('/allproducts', productController.allProducts)
router.post('/addproduct', productController.addProduct)

module.exports = router