var express = require('express');
var router = express.Router();
var app = express();
const compraController = require('../controller/compra');

router.get('/compra', compraController.getCompra);
router.post('/compra',compraController.postCompra);
//router.post('/ventaProducto',ventaController.postVentaProducto);
router.delete('/compra/:id_compra',compraController.deleteCompra);
router.get('/compra/:id_compra', compraController.getIdCompra);
router.put('/compra/:id_compra', compraController.updateCompra);


const cors = require('cors');
app.use(cors());

module.exports = router;
