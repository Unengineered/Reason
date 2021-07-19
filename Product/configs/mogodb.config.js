const mongoose = require('mongoose');
require('dotenv').config()

var mongoConnect = mongoose
  .connect(process.env.MONGO_REMOTE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },() => {
    console.log(`Product-Service DB Connected`);
})
  

  mongoose.connection.on('connected', (err) => {
    if(err){
      console.log(err);
    }
    console.log('Mongoose connected to db');
  })
  
  mongoose.connection.on('error', (err) => {
    console.log(err.message)
  })
  
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.')
  })
  
  process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
  })

module.exports = mongoConnect;