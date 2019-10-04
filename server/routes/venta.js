var express = require('express');
var router = express.Router();
var app = express();
const cors = require('cors');
const {check, validationResult} = require('express-validator');
const ventaController = require('../controller/venta');

router.get('/venta', ventaController.getVenta);
router.post('/venta',[  check('carritoVenta.*.precio').isLength({ max: 9 }).withMessage('El Precio no puede tener mas de 9 digitos'),
check('carritoVenta.*.precio').isInt().withMessage('El Precio debe ser un numero entero'),
check('carritoVenta.*.cantidad').isInt().withMessage('La Cantidad debe ser un numero entero'),
check('carritoVenta.*.cantidad').not().isEmpty().withMessage('La Cantidad no puede ser vacio'),
],ventaController.postVenta);
router.delete('/venta/:id_venta',ventaController.deleteVenta);
router.get('/venta/:id_venta', ventaController.getIdVenta);
router.get('/ventaFecha/:id_venta', ventaController.getFechaVenta);
router.put('/venta/:id_venta', ventaController.updateVenta);
/*
 [   check('venta.*.precio').isLength({ max: 9 }).withMessage('El Precio no puede tener mas de 9 digitos'),
    check('venta.*.precio').isInt().withMessage('El Precio debe ser un numero entero'),
    check('venta.*.cantidad').isInt().withMessage('La Cantidad debe ser un numero entero'),
    check('venta.*.cantidad').not().isEmpty().withMessage('La Cantidad no puede ser vacio'),
    ]
*/

app.use(cors());

module.exports = router;


