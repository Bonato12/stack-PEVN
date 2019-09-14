var express = require('express');
var router = express.Router();
var app = express();
const {check, validationResult} = require('express-validator');
const clienteController = require('../controller/cliente');

router.get('/cliente', clienteController.getCliente);
router.post('/cliente',clienteController.postCliente);
router.get('/cliente/:id_cliente',clienteController.getIdCliente);
router.delete('/cliente/:id_cliente',clienteController.deleteCliente);
router.put('/cliente/:id_cliente', clienteController.updateCliente);

const cors = require('cors');
app.use(cors());


module.exports = router;
