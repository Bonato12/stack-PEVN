var express = require('express');
var router = express.Router();
var app = express();
const {check, validationResult} = require('express-validator');
const productoController = require('../controller/producto');

router.get('/producto', productoController.getProducto);
router.get('/productoRepuesto', productoController.getProductoRepuesto);
router.get('/productoStock', productoController.getProductoStock);
router.post('/producto',productoController.postProducto);
router.get('/producto/:id_producto',productoController.getIdProducto);
router.delete('/producto/:id_producto',productoController.deleteProducto);
router.put('/producto/:id_producto',productoController.updateProducto);

const cors = require('cors');
app.use(cors());

module.exports = router;
