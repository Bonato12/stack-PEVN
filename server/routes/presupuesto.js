var express = require('express');
var router = express.Router();
var app = express();
const presupuestoController = require('../controller/presupuesto');

router.get('/presupuesto', ventaController.getPresupuesto);
router.post('/presupuesto',ventaController.postPresupuesto);


const cors = require('cors');
app.use(cors());

module.exports = router;
