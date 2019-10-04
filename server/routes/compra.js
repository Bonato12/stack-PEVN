var express = require('express');
var router = express.Router();
var app = express();
const compraController = require('../controller/compra');

router.get('/compra', compraController.getCompra);
router.post('/compra',compraController.postCompra);
/*
router.post('/compraProducto',compraController.postCompraProducto);
*/
router.delete('/compra/:id_compra',compraController.deleteCompra);
router.get('/compra/:id_compra', compraController.getIdCompra);
router.get('/compraFecha/:id_compra', compraController.getFechaCompra);
router.put('/compra/:id_compra', compraController.updateCompra);


const cors = require('cors');
app.use(cors());

module.exports = router;
