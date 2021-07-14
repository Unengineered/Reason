const httpError = require('http-errors')
var dynamoClient = require('../configs/dynamodb.config')
var sqlClient = require('../configs/mysql.config')

module.exports = {
    store: async (req, res, next) => {
        try {

            const sid = req.body.sid
            const params = {
                TableName: 'stores',
                Key: {
                    'sid': sid
                }
            }
            // get store profile
            dynamoClient.get(params, async (err, userInfo) => {
                try {
                    if (err) {
                        console.log("Dynamo Error: " + err)
                        throw httpError.ServiceUnavailable("DynamoDB error: " + error)
                    } else {
                        console.log('Success', storeInfo)
                        res.send(storeInfo)
                    }

                } catch (error) {
                    next(error)
                }
            })

        } catch (error) {
            next(error)
        }
    },

    stores: async (req, res, next) => {
        try {

            const fetchStoresSQL = ''
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
    }
}