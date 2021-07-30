// Setup basic express server
var express = require('express');
require('dotenv').config();
const cors = require('cors')
const fs = require('fs')
const morgan = require('morgan')
const sqlClient = require('./configs/mysql.config')
const httpError = require('http-errors')

var app = express();
const https = require('https').createServer({
    key: fs.readFileSync('./certificates/server.key'),
    cert: fs.readFileSync('./certificates/server.cert')
}, app)

const http = require('http').createServer(app)
var port = process.env.PORT || 8080;

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

server = http
server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

//socket.io requirements
var io = require('socket.io')(server);

var users = new Map();
io.on('connection', function (socket) {
    console.log('connected to socket')
    var user_id = socket.handshake.query.user_id
    users.set(user_id, socket.id);
    console.log(users)


    emitCart()

    function emitCart() {
        try {
            cartSQL = `SELECT * FROM carts LEFT JOIN products ON carts.product_id=products.product_id WHERE user_id='${socket.handshake.query.user_id}' ORDER BY store ASC`

            unqieStoreSQL = `SELECT store FROM carts LEFT JOIN products ON carts.product_id=products.product_id GROUP BY store`
            sqlClient.query(unqieStoreSQL, (err, results, fields) => {
                var cart = []

                var data;
                console.log(results)
                results.forEach(store => {
                    data = {
                        store_name: store.store,
                        products: []
                    }
                    console.log(data)
                    cart.push(data)
                })


                sqlClient.query(cartSQL, (error, results, fields) => {

                    results.forEach(cartItem => {
                        product = {
                            delivery: cartItem.delivery,
                            cart_id: cartItem.cart_id,
                            color: cartItem.color,
                            size: cartItem.size,
                            quantity: cartItem.quantity,
                            product: {
                                name: cartItem.name,
                                backgroundColor: cartItem.background,
                                thumbnial: cartItem.thumbnail,
                                price: cartItem.price,
                                product_id: cartItem.product_id
                            }
                        }

                        cart.forEach(item => {
                            if (item.store_name == cartItem.store) {
                                item.products.push(product)
                            }
                        })

                    })

                    console.log(cart)
                    socket.emit('cart', cart)

                    if (error) {
                        throw new Error(error)
                    }
                })

            })
        } catch (error) {
            console.log(error.message)
            socket.emit('error', error.message)
        }

    }
    //when client sends a requestś
    socket.on('cart-add', function (data, acknowledgment) {
        console.log(data)


        var addToCartSQL = `INSERT INTO carts(product_id, user_id, quantity, color, size, delivery) VALUES('${data.product_id}', '${user_id}', ${parseInt(data.quantity)}, '${data.color}', '${data.size}', ${parseInt(data.delivery)})`
        // save to mysql
        sqlClient.query(addToCartSQL, function (error, results, fields) {

            try {
                if (error) {
                    throw new Error(error)
                }
                console.log(results)
                emitCart()

            } catch (error) {
                console.log(error.message)
                socket.emit('error', error.message)
            }

        })


    })

    socket.on('cart-update', function (data, acknowledgment) {
        try {
            console.log(data)

            var setQuery = '';
            if (data.size)
                setQuery += `size = '${data.size}', `
            if (data.quantity)
                setQuery += `quantity = '${data.quantity}', `
            if (data.color)
                setQuery += `color = '${data.color}', `

            setQuery = setQuery.slice(0, -2)
            const updateProductSQL = `UPDATE carts SET ${setQuery} WHERE cart_id = ${data.cart_id};`
            console.log(updateProductSQL)
            // save to mysql
            sqlClient.query(updateProductSQL, function (error, results, fields) {

                try {
                    if (error) {
                        throw new Error(error)
                    }

                    console.log(results)
                    emitCart()

                } catch (error) {
                    console.log(error.message)
                    socket.emit('error', error.message)
                }

            })

        } catch (error) {
            console.log(error.message)
            socket.emit('error', error.message)
        }


    })

    socket.on('cart-delete', function (data, acknowledgment) {

        const deleteCartSQL = `DELETE FROM carts WHERE cart_id=${parseInt(data.cart_id)};`
        // save to mysql
        sqlClient.query(deleteCartSQL, function (error, results, fields) {

            try {
                if (error)
                    throw new Error(error)

                console.log(results)
                emitCart()

            } catch (error) {
                console.log(error.message)
                socket.emit('error', error.message)
            }

        })

    })

    socket.on('cart', (data, acknowledgment) => {
        emitCart()
    })

    // when the user disconnects
    socket.on('disconnect', function () {

    });

});