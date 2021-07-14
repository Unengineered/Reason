const httpError = require('http-errors')
var dynamoClient = require('../config/dynamodb.config')

module.exports = {
    profile: async (req, res, next) => {
        try {

            const uid = req.body.uid
            const params = {
                TableName: 'users',
                Key: {
                    'uid': uid
                }
            }
            // get user profile
            dynamoClient.get(params, async (err, userInfo) => {
                try {
                    if (err) {
                        console.log("Dynamo Error: " + err)
                        throw httpError.ServiceUnavailable("DynamoDB error")
                    } else {
                        console.log('Success', userInfo)
    
                        const profile = {
                            name: userInfo.name,
                            imageUrl: userInfo.imageUrl
                        }
    
                        res.send(profile)
                    }

                } catch (error) {
                    next(error)
                }
               
            })

        } catch (error) {
            next(error)
        }


    }
}