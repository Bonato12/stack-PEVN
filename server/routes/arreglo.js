var express = require('express');
var router = express.Router();
var app = express();
const {check, validationResult} = require('express-validator');
const arregloController = require('../controller/arreglo');

router.get('/arreglo', arregloController.getArreglo);
router.get('/arreglo/:id_arreglo',arregloController.getIdArreglo);
router.get('/arregloP/:id_arreglo',arregloController.getArregloPresupuesto);
router.post('/arreglo',arregloController.postArreglo);
router.delete('/arreglo/:id_arreglo',arregloController.deleteArreglo);


const cors = require('cors');
app.use(cors());


module.exports = router;
