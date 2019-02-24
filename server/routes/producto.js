var express = require('express');
var router = express.Router();
var app = express();
const productoController = require('../controller/producto');

router.get('/producto', productoController.listarproductos);
router.post('/producto',productoController.addproductos);
router.get('/producto/:id_producto',productoController.getidproducto);
router.delete('/producto/:id_producto',productoController.deleteproducto);
router.put('/producto/:id_producto',productoController.updateproducto);


//Importamos CORS para poder utilizar Axios en Vue js
const cors = require('cors');
app.use(cors());



module.exports = router;
