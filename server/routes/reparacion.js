var express = require('express');
var router = express.Router();
var app = express();
const reparacionController = require('../controller/reparacion');

router.get('/reparacion', reparacionController.getReparacion);
router.get('/reparacion/:id_reparacion', reparacionController.getIdReparacion);
router.put('/reparacion/:id_reparacion', reparacionController.updateReparacion);


const cors = require('cors');
app.use(cors());

module.exports = router;
