var express = require('express');
var router = express.Router();
var app = express();
const arregloController = require('../controller/arreglo');

router.get('/arreglo', arregloController.getArreglo);
router.post('/arreglo',arregloController.postArreglo);


const cors = require('cors');
app.use(cors());


module.exports = router;
