var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');
const adminController = require('../controller/admin');

router.get('/usuario', adminController.getUsuario);
router.get('/usuario/:uuid', adminController.getIdUsuario);
router.post('/usuario',adminController.postUsuario);


const cors = require('cors');
app.use(cors());


module.exports = router;
