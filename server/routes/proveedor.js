var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');
const proveedorController = require('../controller/proveedor');

router.get('/proveedor', proveedorController.getProveedor);
router.post('/proveedor',proveedorController.postProveedor);
router.get('/proveedor/:id_proveedor',proveedorController.getIdProveedor);
router.delete('/proveedor/:id_proveedor',proveedorController.deleteProveedor);
router.put('/proveedor/:id_proveedor',proveedorController.updateProveedor);

const cors = require('cors');
app.use(cors());

module.exports = router;
