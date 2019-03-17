var express = require('express');
var router = express.Router();
var app = express();
const cors = require('cors');
const ventaController = require('../controller/ventaProducto');

router.get('/ventaProducto', ventaController.getVentaProducto);
router.get('/ventaProducto/:id_venta',ventaController.getIdVentaProducto);
router.post('/ventaProducto',ventaController.postVenta);


app.use(cors());
module.exports = router;
