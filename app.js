const express = require('express')
const app = express()

process.loadEnvFile()
const port = 3000
const connectDB = require('./src/database')
const productos = require('./src/product')

connectDB()

app.use(express.json())



app.get('/', (req, res) => {
  res.send('Bienvenido a la API de mi granja!')
})

app.get('/productos', (req, res) => {
  productos.find({})
    .then((productos) => {
      res.json(productos)
    })
    .catch((error) => {
      console.error('Error al obtener los productos: ', error)
      res.status(500).send('Error al obtener los productos')
    })
})

app.get('/productos/:id', (req, res) => {
  const { id } = req.params
  productos.findById(id)
    .then((producto) => {
      if (producto) {
        res.json(producto)
      } else {
        res.status(404).json({ message: 'Producto no encontrada' })
      }
    })
    .catch((error) => {
      console.error('Error al obtener el producto: ', error)
      res.status(500).send('Error al obtener el producto')
    })
})

app.get('/productos/nombre/:nombre', (req, res) => {
  const { nombre } = req.params
  productos.find({ "nombre": { "$regex": nombre, "$options": "i" } })
    .then((producto) => {
      if (producto) {
        res.json(producto)
      } else {
        res.status(404).json({ message: 'Producto no encontrada' })
      }
    })
    .catch((error) => {
      console.error('Error al obtener el producto: ', error)
      res.status(500).send('Error al obtener el producto')
    })
})

app.post('/productos', (req, res) => {
  const nuevoProducto = new productos(req.body)
  nuevoProducto
    .save()
    .then((prdocutoGuardado) => {
      res.status(201).json(prdocutoGuardado)
    })
    .catch((error) => {
      console.error('Error al agregar el producto: ', error)
      res.status(500).send('Error al agregar el producto')
    })
})

app.patch('/productos/:id', (req, res) => {
  const { id } = req.params

  productos.findByIdAndUpdate(id, req.body, {
    new: false,
  })
    .then((productoActualizado) => {
      if (productoActualizado) {
        res.json({ message: 'Precio actualizado con exito', productoActualizado })
      } else {
        res.status(404).json({ message: 'Producto no encontrado para actualizar el precio' })
      }
    })
    .catch((error) => {
      console.error('Error al actualizar el precio del producto: ', error)
      res.status(500).send('Error al actualizar el precio del producto')
    })
})

app.delete('/productos/:id', (req, res) => {
  const { id } = req.params

  productos.findByIdAndDelete(id)
    .then((resultado) => {
      if (resultado) {
        res.json({ message: 'Producto borrado con exito' })
      } else {
        res.status(404).json({ message: 'Producto no encontrado' })
      }
    })
    .catch((error) => {
      console.error('Error al borrar el producto: ', error)
      res.status(500).send('Error al borrar el producto')
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})