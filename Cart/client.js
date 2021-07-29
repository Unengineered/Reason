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
    "product_id": "61026e0941e3ac31ac94eb1e",
    "size": "L",
    "quantity": 12,
    "color": "blue",
    "delivery": 50
}

updateCartData = {
    "cart_id": 4,
    "size": "M",
    "quantity": 12,
    "color": "blue",
}

deleteCart = {
    "cart_id": 4,
}

// socketConnection.emit('cart-add', addToCartData)
// socketConnection.emit('cart-update', updateCartData)
// socketConnection.emit('cart-delete', deleteCart)
socketConnection.emit('cart')

socketConnection.on('cart', (res) => {
    console.log(res)
})