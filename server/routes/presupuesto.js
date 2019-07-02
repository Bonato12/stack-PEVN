var express = require('express');
var router = express.Router();
var app = express();
const presupuestoController = require('../controller/presupuesto');

router.get('/presupuesto', presupuestoController.getPresupuesto);
router.get('/presupuesto/:id_presupuesto', presupuestoController.getIdPresupuesto);
router.post('/presupuesto',presupuestoController.postPresupuesto);


const cors = require('cors');
app.use(cors());

module.exports = router;
