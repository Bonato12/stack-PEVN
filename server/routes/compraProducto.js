var express = require('express');
var router = express.Router();
var app = express();
const cors = require('cors');
const compraController = require('../controller/compraProducto');

router.get('/compraProducto', compraController.getCompraProducto);
router.get('/compraProducto/:id_compra',compraController.getIdCompraProducto);


app.use(cors());
module.exports = router;
