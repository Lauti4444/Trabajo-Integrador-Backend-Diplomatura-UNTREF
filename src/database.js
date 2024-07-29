const mongoose = require('mongoose')
process.loadEnvFile()

const URI = process.env.MONGODB_URLSTRING
const DATABASE_NAME = process.env.DATABASE_NAME

const connectDB = () => {
    return mongoose
      .connect(URI + DATABASE_NAME)
      .then(() => console.log('Conectado a MongoDB'))
      .catch((err) => console.log('Error al conectarse : ', err))
  }
  
  module.exports = connectDB