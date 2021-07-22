const httpError = require('http-errors')
const { db, admin } = require('../configs/firebase.config')
const firestore = db.firestore()


module.exports = {
    addToCart: async (req, res, next) => {
        try {
            const data = req.body
            if (!data.user_id)
                throw httpError.BadRequest('user_id is required')

            productRefId = data.product.product_id + data.product.color + data.product.size

            if (data.product && data.store_name) {
                var productRef = await firestore.collection('users').doc(data.user_id).collection('cart').doc(productRefId)

                if (productRef) {
                    await productRef.set({ product: data.product, store_name: data.store_name, quantity: data.quantity })
                    res.send(productRef)
                }

            } else {
                throw httpError.BadRequest('product info undefined')
            }

        } catch (error) {
            next(error)
        }

    },

    updateCart: async (req, res, next) => {
        try {

            const data = req.body

            if (!data.user_id)
                throw httpError.BadRequest('user_id is required')

            productRefId = data.product.product_id + data.product.color + data.product.size

            if (data.product && data.store_name) {
                var productRef = await firestore.collection('users').doc(data.user_id).collection('cart').doc(productRefId)

                if (productRef) {
                    await productRef.update({ product: data.product, store_name: data.store_name, quantity: data.quantity })
                    res.send(productRef)
                }

            } else {
                throw httpError.BadRequest('product info undefined')
            }

        } catch (error) {
            next(error)
        }

    },

    deleteFromCart: async (req, res, next) => {
        try {

            const data = req.body

            if (!data.user_id)
                throw httpError.BadRequest('user_id is required')

            productRefId = data.product.product_id + data.product.color + data.product.size

            if (data.product && data.store_name) {
                var productRef = await firestore.collection('users').doc(data.user_id).collection('cart').doc(productRefId)

                if (productRef) {
                    await productRef.delete({ product: data.product, store_name: data.store_name, quantity: data.quantity })
                    res.send(productRef)
                }

            } else {
                throw httpError.BadRequest('product info undefined')
            }

        } catch (error) {
            next(error)
        }
    }
}