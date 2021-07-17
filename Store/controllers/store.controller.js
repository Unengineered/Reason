const httpError = require('http-errors')
var sqlClient = require('../configs/mysql.config')
var { storeSchema } = require('../helpers/validation_schema')
var Store = require('../models/store.model')

module.exports = {
    store: async (req, res, next) => {
        try {

            const store_id = req.body.store_id

            if(!store_id)
                throw httpError.BadRequest('store_id is required')
        
            const store = await Store.findById(store_id)
            console.log(store)
            res.send(store)
            

        } catch (error) {
            next(error)
        }
    },

    allStores: async (req, res, next) => {
        try {

            const fetchStoresSQL = 'SELECT * FROM stores'
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
    addStore: async (req, res, next) => {

        try {

            const result = await storeSchema.validateAsync(req.body)

            const store = await Store(result)
            const savedStore = await store.save()

            const addStoreSQL = `INSERT INTO Stores(store_id, name, picture) VALUES('${savedStore._id}','${savedStore.name}}', '${savedStore.featured_picture}');`
            // save to mysql
            sqlClient.query(addStoreSQL, function (error, results, fields) {

                try {
                    if (error)
                        throw httpError.ServiceUnavailable('MySQL error: ' + error)
                    console.log(results)
                    res.send(savedStore)

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