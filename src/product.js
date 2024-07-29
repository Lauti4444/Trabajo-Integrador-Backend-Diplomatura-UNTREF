const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    codigo: Number,
    nombre: String,
    precio: Number,
    categoria: String,
  }, {
    versionKey: false 
});

  const Product = mongoose.model('productos', productSchema)
  
  module.exports = Product