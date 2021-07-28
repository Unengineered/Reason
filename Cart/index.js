// Setup basic express server
var express = require('express');
require('dotenv').config();
const cors = require('cors')
const fs = require('fs')
const morgan = require('morgan')

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
// var redis = require('socket.io-redis');
// io.adapter(redis({ host: 'redis', port: 6379 }));


io.on('connection', function (socket) {
    console.log('connected to socket')

    //when client sends a requestś
    socket.on('addToCart', function (requestData, acknowledgment) {
        console.log(requestData)
        socket.emit('response', requestData)

    })
    socket.on('updateCart', function (requestData, acknowledgment) {
        console.log(requestData)
        socket.emit('response', requestData)

    })
    socket.on('deleteFromCart', function (requestData, acknowledgment) {
        console.log(requestData)
        socket.emit('response', requestData)

    })

    // when the user disconnects
    socket.on('disconnect', function () {

    });

});