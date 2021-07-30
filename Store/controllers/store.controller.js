const httpError = require('http-errors')
var sqlClient = require('../configs/mysql.config')
var { storeSchema } = require('../helpers/validation_schema')
var Store = require('../models/store.model')

module.exports = {
    store: async (req, res, next) => {
        try {

            const store_id = req.body.store_id

            if (!store_id)
                throw httpError.BadRequest('store_id is required')

            const store = await Store.findById(store_id)

            // // var allProducts = []
            // var sections = store.sections

            // sections.forEach(section => {
            //     var products = section.products
            //     var productsCopy = products
            //     products = []
            //     productsCopy.forEach(product => {
            //         const productDetailSQL = `SELECT * FROM products WHERE product_id = '${product}'`
            //         // get stores list
            //         sqlClient.query(productDetailSQL, function (error, results, fields) {
            //             if (error)
            //                 throw httpError.BadRequest('MySQL error: ' + error)
            //             data = {
            //                 name: results[0].name,
            //                 price: results[0].price,
            //                 picture: results[0].thumbnail,
            //                 background : results[0].background,
            //                 product_id : product
            //             }
            //             products.push(data)
            //             console.log(products)
            //         })
            //     })
            //     console.log(products)

            //     section.products = products
            // })

            // store.sections = sections
            res.send(store)


        } catch (error) {
            next(error)
        }
    },

    allStoresSQL: async (req, res, next) => {
        try {

            const fetchStoresSQL = 'SELECT * FROM stores'
            // get stores list
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

    allStoresMongo: async (req, res, next) => {
        try {

            Store.find({}, function (err, stores) {
                var storeMap = {};

                stores.forEach(function (store) {
                    storeMap[store._id] = store;
                });

                res.send(storeMap);
            });

        } catch (error) {
            next(error)
        }
    },

    addStores: async (req, res, next) => {

        try {

            var stores = req.body

            await stores.forEach(async store => {
                try {
                    const result = await storeSchema.validateAsync(store)

                    const storeObject = await Store(result)
                    const savedStore = await storeObject.save()

                    const addStoreSQL = `INSERT INTO stores(store_id, name, picture) VALUES('${savedStore._id}','${savedStore.name}', '${savedStore.store_picture}');`
                    // save to mysql
                    sqlClient.query(addStoreSQL, function (error, results, fields) {

                        if (error)
                            throw httpError.BadRequest('MySQL error: ' + error)
                        else {
                            console.log(results)
                        }

                    })
                } catch (error) {
                    next(error)
                }
            })
            res.send('added stores successfully')


        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }

    },

    deleteStores: async (req, res, next) => {
        try {
            const storeArray = req.body

            await storeArray.forEach(async (store) => {
                try {
                    await Store.findByIdAndDelete(store)

                    var deleteStoreSQL = `DELETE FROM stores WHERE store_id='${store}';`

                    // delete from mysql
                    sqlClient.query(deleteStoreSQL, function (error, results, fields) {

                        if (error)
                            throw httpError.BadRequest('MySQL error: ' + error)
                        console.log(results)

                    })

                } catch (error) {
                    next(error)
                }

            });

            res.send("Store/s deleted successfully")

        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },

    updateStores: async (req, res, next) => {
        try {
            const storeArray = req.body

            await storeArray.forEach(async (store) => {
                try {
                    console.log(store)
                    await Store.findByIdAndUpdate(store.id, store.updatedData)
                    data = store.updatedData
                    var setQuery = '';
                    if (data.name)
                        setQuery += `name = '${data.name}', `
                    if (data.store_picture)
                        setQuery += `picture = '${data.store_picture}', `

                    setQuery = setQuery.slice(0, -2)
                    const updatestoreSQL = `UPDATE stores SET ${setQuery} WHERE store_id = '${store.id}';`
                    console.log(updatestoreSQL)
                    // save to mysql
                    sqlClient.query(updatestoreSQL, function (error, results, fields) {

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