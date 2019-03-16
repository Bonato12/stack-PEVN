var express = require('express');
var router = express.Router();
var app = express();
const ventaController = require('../controller/ventaProducto');

router.get('/ventaProducto', ventaController.getVentaProducto);
router.get('/ventaProducto/:id_venta',ventaController.getIdVentaProducto);


const cors = require('cors');
app.use(cors());
module.exports = router;
