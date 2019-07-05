var express = require('express');
var router = express.Router();
var app = express();
const ventaController = require('../controller/venta');

router.get('/venta', ventaController.getVenta);
router.post('/venta',ventaController.postVenta);
//router.post('/ventaProducto',ventaController.postVentaProducto);
router.delete('/venta/:id_venta',ventaController.deleteVenta);
router.get('/venta/:id_venta', ventaController.getIdVenta);
router.put('/venta/:id_venta', ventaController.updateVenta);


const cors = require('cors');
app.use(cors());

module.exports = router;
