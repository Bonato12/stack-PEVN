var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');
const clienteController = require('../controller/cliente');

router.get('/cliente', clienteController.listaclientes);
router.post('/cliente',clienteController.addcliente);
router.post('/pdf',clienteController.listapdf);
router.get('/cliente/:id_cliente',clienteController.getidcliente);
router.delete('/cliente/:id_cliente',clienteController.deletecliente);
router.put('/cliente/:id_cliente',clienteController.updatecliente);

const cors = require('cors');
app.use(cors());


module.exports = router;
