const io = require('socket.io-client');

const ioOptions = {
    transports: ['websocket']
    , forceNew: true
    , reconnection: false,
    query: {
        user_id: '284979374681227781',
    }
}
var socketConnection;

// connect two io clients
socketConnection = io('http://localhost:8080/', ioOptions)

// console.log('here')
addToCartData = {
    "product_id": "61039a387b22ab2d6858e086",
    "size": "L",
    "quantity": 12,
    "color": "blue",
    "delivery": 50
}

updateCartData = {
    "cart_id": 3,
    "size": "M",
    "quantity": 12,
    "color": "blue",
}

deleteCart = {
    "cart_id": 3,
}

socketConnection.emit('cart-add', addToCartData)
// socketConnection.emit('cart-update', updateCartData)
// socketConnection.emit('cart-delete', deleteCart)
socketConnection.emit('cart')

socketConnection.on('cart', (res) => {
    console.log(res)
})

socketConnection.on('error', (res) => {
    console.log(res)
})