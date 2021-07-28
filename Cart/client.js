const io = require('socket.io-client');

const ioOptions = {
    transports: ['websocket']
    , forceNew: true
    , reconnection: false,
    // query: {
    //     fromId: '284979374681227781',
    // }
}
var socketConnection;

// connect two io clients
socketConnection = io('http://localhost:8080/', ioOptions)

// console.log('here')
addToCartData = {
    "user_id": "mk4ZxbhAV6Whmse2ExngWeO2dNh2",
    "product": {
        "background": "green",
        "name": "AmongUs merch",
        "picture": "https://something",
        "product_id": "sdanjdfn12",
        "color": "000000",
        "size" : "L"
    },
    "quantity": 12,
    "store_name": "unengineered"
}

socketConnection.emit('addToCart', addToCartData)
socketConnection.on('response', (res) => {
    console.log(res)
})