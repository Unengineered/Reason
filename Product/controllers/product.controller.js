const httpError = require('http-errors')
var { productSchema } = require('../helpers/validation_schema')
var Product = require('../models/product.model')

module.exports = {
    product: async (req, res, next) => {
        try {

            const product_id = req.body.product_id

            if (!product_id)
                throw httpError.BadRequest('product_id is required')

            const product = await Product.findById(product_id)
            console.log(product)
            res.send(product)


        } catch (error) {
            next(error)
        }
    },
    addProduct: async (req, res, next) => {

        try {
            const productArray = req.body
            var savedProductArray = []

            await productArray.forEach(async (product) => {
                try {
                    result = await productSchema.validateAsync(product)
                    product = await Product(result)
                    savedProduct = await product.save()
                    savedProductArray.push(savedProduct)
                    console.log(savedProductArray)

                } catch (error) {
                    throw httpError.BadRequest(error)
                }

            });

            res.send("Products added successfully")

        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }

    }
}