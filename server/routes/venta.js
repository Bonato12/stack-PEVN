var express = require('express');
var router = express.Router();
var app = express();
const {check, validationResult} = require('express-validator');
const ventaController = require('../controller/venta');

router.get('/venta', ventaController.getVenta);
router.post('/venta',ventaController.postVenta);
router.delete('/venta/:id_venta',ventaController.deleteVenta);
router.get('/venta/:id_venta', ventaController.getIdVenta);
router.put('/venta/:id_venta', ventaController.updateVenta);
/*
 [   check('venta.*.precio').isLength({ max: 9 }).withMessage('El Precio no puede tener mas de 9 digitos'),
    check('venta.*.precio').isInt().withMessage('El Precio debe ser un numero entero'),
    check('venta.*.cantidad').isInt().withMessage('La Cantidad debe ser un numero entero'),
    check('venta.*.cantidad').not().isEmpty().withMessage('La Cantidad no puede ser vacio'),
    ]
*/

const cors = require('cors');
app.use(cors());

module.exports = router;


