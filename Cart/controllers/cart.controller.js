const httpError = require('http-errors')
const { db, admin } = require('../configs/firebase.config')
const firestore = db.firestore()


module.exports = {
    addToCart: async (req, res, next) => {
        try {
            const data = req.body
            if (!data.user_id)
                throw httpError.BadRequest('user_id is required')
            if (data.product && data.store_name) {
                var userRef = await firestore.collection('users').doc(data.user_id)

                if(userRef){
                    await userRef.update({
                        cart: admin.firestore.FieldValue.arrayUnion({ product: data.product, store_name: data.store_name })
                    });
                    res.send("Added to cart")
                } 
                
            } else {
                throw httpError.BadRequest('product info undefined')
            }

        } catch (error) {
            next(error)
        }

    }
}