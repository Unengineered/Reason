const router = require('express').Router()
const productController = require('../controllers/product.controller')

router.post('/', productController.product)
router.post('/addproducts', productController.addProducts)
router.get('/allProducts', productController.allProducts)
router.post('/deleteProducts', productController.deleteProducts)

module.exports = router