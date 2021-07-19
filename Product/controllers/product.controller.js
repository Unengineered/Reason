const httpError = require('http-errors')
var sqlClient = require('../configs/mysql.config')
var { productSchema } = require('../helpers/validation_schema')
var Product = require('../models/product.model')

module.exports = {
    product: async (req, res, next) => {
        try {

            const product_id = req.body.product_id

            if(!product_id)
                throw httpError.BadRequest('product_id is required')
        
            const product = await Product.findById(store_id)
            console.log(product)
            res.send(product)
            

        } catch (error) {
            next(error)
        }
    },

    allProducts: async (req, res, next) => {
        try {

            const fetchStoresSQL = 'SELECT * FROM products'
            // get stores list
            sqlClient.query(fetchStoresSQL, function (error, results, fields) {

                try {
                    if (error)
                        throw httpError.ServiceUnavailable('MySQL error: ' + error)
                    console.log(results)
                    res.send(results)
                } catch (error) {
                    next(error)
                }

            })

        } catch (error) {
            next(error)
        }
    },
    addProduct: async (req, res, next) => {

        try {

            const result = await productSchema.validateAsync(req.body)

            const product = await Product(result)
            const savedProduct = await product.save()

            const addProductSQL = `INSERT INTO products(product_id, name, picture) VALUES('${savedProduct._id}','${savedProduct.name}}', '${savedProduct.featured_picture}');`
            // save to mysql
            sqlClient.query(addProductSQL, function (error, results, fields) {

                try {
                    if (error)
                        throw httpError.ServiceUnavailable('MySQL error: ' + error)
                    console.log(results)
                    res.send(savedProduct)

                } catch (error) {
                    next(error)
                }

            })




        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }

    }
}