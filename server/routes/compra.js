var express = require('express');
var router = express.Router();
var app = express();
const {check} = require('express-validator');
const compraController = require('../controller/compra');

router.get('/compra', compraController.getCompra);
router.post('/compra',[  check('carritoCompra.*.precioUnitario').isLength({ max: 9 }).withMessage('El Precio Unitario no puede tener mas de 9 digitos'),
check('carritoCompra.*.precioUnitario').isInt().withMessage('El Precio Unitario debe ser un numero entero'),
check('carritoCompra.*.precioTotal').isLength({ max: 9 }).withMessage('El Precio Total no puede tener mas de 9 digitos'),
check('carritoCompra.*.precioTotal').isInt().withMessage('El Precio Total debe ser un numero entero'),
check('carritoCompra.*.cantidad').isInt().withMessage('La Cantidad debe ser un numero entero'),
check('carritoCompra.*.cantidad').not().isEmpty().withMessage('La Cantidad no puede ser vacio'),
],compraController.postCompra);
router.delete('/compra/:id_compra',compraController.deleteCompra);
router.get('/compra/:id_compra', compraController.getIdCompra);
router.get('/compraFecha/:id_compra', compraController.getFechaCompra);
router.put('/compra/:id_compra', compraController.updateCompra);


const cors = require('cors');
app.use(cors());

module.exports = router;
