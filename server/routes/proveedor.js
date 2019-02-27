var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');
const proveedorController = require('../controller/proveedores');

router.get('/proveedor', proveedorController.listaproveedores);
router.post('/proveedor',proveedorController.addproveedor);
router.get('/proveedor/:id_proveedor',proveedorController.getidproveedor);
router.delete('/proveedor/:id_proveedor',proveedorController.deleteproveedor);
router.put('/proveedor/:id_proveedor',proveedorController.updateproveedor);

const cors = require('cors');
app.use(cors());

module.exports = router;
