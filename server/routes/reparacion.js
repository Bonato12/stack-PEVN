var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');
const reparacionController = require('../controller/reparacion');

router.get('/proveedor', proveedorController.getReparacion);


const cors = require('cors');
app.use(cors());

module.exports = router;
