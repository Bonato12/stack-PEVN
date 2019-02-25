var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');
const adminController = require('../controller/admin');


router.post('/cliente',clienteController.addusuario);


const cors = require('cors');
app.use(cors());


module.exports = router;
