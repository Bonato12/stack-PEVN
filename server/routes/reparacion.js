var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');
const reparacionController = require('../controller/reparacion');

router.get('/reparacion', reparacionController.getReparacion);
router.get('/reparacion/:id_reparacion', reparacionController.getIdReparacion);


const cors = require('cors');
app.use(cors());

module.exports = router;
