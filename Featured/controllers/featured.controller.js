const httpError = require('http-errors')
const sqlClient = require('../configs/mysql.config')

module.exports = {
    features: async (req, res, next) => {
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