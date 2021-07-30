const router = require('express').Router()
const productController = require('../controllers/product.controller')

router.post('/addproducts', productController.addProducts)
router.get('/allProductsMongo', productController.allProductsMongo)
router.get('/allProductsSQL', productController.allProductsSQL)
router.post('/deleteProducts', productController.deleteProducts)
router.post('/updateProducts', productController.updateProducts)
router.get('/:product_id', productController.product)


module.exports = router