const httpError = require('http-errors')
var { productSchema } = require('../helpers/validation_schema')
var Product = require('../models/product.model')
var sqlClient = require('../configs/mysql.config')

module.exports = {
    product: async (req, res, next) => {
        try {

            const product_id = req.params.product_id
            if (!product_id)
                throw httpError.BadRequest('product_id is required')

            const product = await Product.findById(product_id)
            console.log(product)
            res.send(product)


        } catch (error) {
            next(error)
        }
    },

    allProductsMongo: async(req,res,next) =>{
        try {

            Product.find({}, function(err, products) {
                var productMap = {};
            
                products.forEach(function(product) {
                  productMap[product._id] = product;
                });
            
                res.send(productMap);  
              });

        } catch (error) {
            next(error)
        }
    },

    allProductsSQL : async (req, res, next) => {
        try {

            const fetchStoresSQL = 'SELECT * FROM products'
            // get products list
            sqlClient.query(fetchStoresSQL, function (error, results, fields) {

                try {
                    if (error)
                        throw httpError.BadRequest('MySQL error: ' + error)
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

    addProducts: async (req, res, next) => {

        try {
            console.log(req.body)
            const productArray = req.body
            var savedProductArray = []

            await productArray.forEach(async (product) => {

                try {

                    result = await productSchema.validateAsync(product)
                    product = await Product(result)
                    savedProduct = await product.save()
                    savedProductArray.push(savedProduct)
                    console.log(savedProductArray)

                    const addProductSQL = `INSERT INTO products(product_id, price, thumbnail, name, background, store) VALUES('${savedProduct._id}','${savedProduct.price}', '${savedProduct.thumbnail['url']}', '${savedProduct.name}', '${savedProduct.thumbnail['background']}', '${savedProduct.store}');`
                    // save to mysql
                    sqlClient.query(addProductSQL, function (error, results, fields) {

                        try {
                            if (error)
                                throw httpError.BadRequest('MySQL error: ' + error)
                            console.log(results)

                        } catch (error) {
                            next(error)
                        }

                    })

                } catch (error) {
                    next(error)
                }

            });

            res.send("Products added successfully")

        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }

    },

    deleteProducts : async (req, res, next) => {

        try {
            const productArray = req.body

            await productArray.forEach(async (product) => {
                try {
                    await Product.findByIdAndDelete(product)

                    const deleteProductSQL = `DELETE FROM products WHERE product_id='${product}';`
                    // save to mysql
                    sqlClient.query(deleteProductSQL, function (error, results, fields) {

                        try {
                            if (error)
                                throw httpError.BadRequest('MySQL error: ' + error)
                            console.log(results)

                        } catch (error) {
                            next(error)
                        }

                    })

                } catch (error) {
                    next(error)
                }

            });

            res.send("Products deleted successfully")

        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }

    },
    updateProducts: async (req, res, next) => {
        try {
            const productArray = req.body

            await productArray.forEach(async (product) => {
                try {
                    var savedProduct = await Product.findByIdAndUpdate(product.id, product.updatedData)
                    console.log(savedProduct)
                    data = product.updatedData
                    var setQuery = '';
                    if(data.price)
                        setQuery += `price = ${data.price}, `
                    if(data.thumbnail.url)
                        setQuery += `thumbnail = '${data.thumbnail.url}', `
                    if(data.thumbnail.background)
                        setQuery += `background = '${data.thumbnail.background}', `
                    if(data.name)
                        setQuery += `name = '${data.name}', `
                    if(data.store)
                        setQuery += `store = '${data.store}', `
                    
                    setQuery = setQuery.slice(0, -2)
                    const updateProductSQL = `UPDATE products SET ${setQuery} WHERE product_id = '${product.id}';`
                    console.log(updateProductSQL)
                    // save to mysql
                    sqlClient.query(updateProductSQL, function (error, results, fields) {

                        try {
                            if (error)
                                throw httpError.BadRequest('MySQL error: ' + error)
                            console.log(results)

                        } catch (error) {
                            next(error)
                        }

                    })
                
                } catch (error) {
                    next(error)
                }

            });

            res.send("Store/s updated successfully")

        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },
}