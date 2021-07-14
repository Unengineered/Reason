const express = require('express');
const morgan = require('morgan')
const httpError = require('http-errors');
require('dotenv').config();
const cors = require('cors')
const fs = require('fs')

const featuredRoute = require('./routes/featured.route')

const port = process.env.PORT || 8080

const app = express()
const httpServer = require('https').createServer({
    key: fs.readFileSync('./certificates/server.key'),
    cert: fs.readFileSync('./certificates/server.cert')
}, app)

//miiddlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//Routes
app.get('/',(req,res)=>{
    res.send('featured')
})
app.use('/featured', featuredRoute)

//Invalid route
app.use(async (req, res, next) => {
    next(httpError.NotFound('This route does not exist'))
})

//error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

//Start listening
httpServer.listen(port, () => {
    console.log(`Server running at port ` + port);
});

module.exports = { app };
