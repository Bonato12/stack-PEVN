var express = require('express');
var router = express.Router();
var app = express();
const adminController = require('../controller/admin');

router.get('/usuario', adminController.getUsuario);
router.get('/usuario/:uuid', adminController.getIdUsuario);
router.post('/usuario',adminController.postUsuario);
router.get('/usuario/:uuid', adminController.deleteUsuario);


const cors = require('cors');
app.use(cors());


module.exports = router;
