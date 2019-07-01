var express = require('express');
var router = express.Router();
var app = express();
const cors = require('cors');
const presupuestoProductoController = require('../controller/presupuestoProducto');

router.get('/presupuestoProducto', presupuestoProductoControllerget.getPresupuestoProducto);
//router.get('/presupuestoProducto/:id',presupuestoProductoController.getIdPresupuestoProducto);


app.use(cors());
module.exports = router;
