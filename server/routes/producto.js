var express = require('express');
var router = express.Router();
var app = express();
const {check, validationResult} = require('express-validator');
const productoController = require('../controller/producto');

router.get('/producto', productoController.getProducto);
router.get('/productoRepuesto', productoController.getProductoRepuesto);
router.get('/productoStock', productoController.getProductoStock);
router.post('/producto',[
check('modelo').not().isEmpty().withMessage('El Modelo no puede ser vacio'),
check('marca').not().isEmpty().withMessage('La Marca no puede ser vacio'),
check('descripcion').not().isEmpty().withMessage('La Descripcion no puede ser vacio'),
check('tipoProducto').not().isEmpty().withMessage('El TipoProducto no puede ser vacio'),
check('stock').not().isEmpty().withMessage('El Stock no puede ser vacio'),
check('stock').isInt().withMessage('El Stock debe ser un numero entero'),
check('stock').isLength({ max: 10 }).withMessage('El Stock no puede tener mas de 10 digitos'),
check('precio').not().isEmpty().withMessage('El Precio no puede ser vacio'),
check('precio').isInt().withMessage('El Precio debe ser un numero entero'),
check('precio').isLength({ max: 10 }).withMessage('El Precio no puede tener mas de 10 digitos'),
],
productoController.postProducto);
router.get('/producto/:id_producto',productoController.getIdProducto);
router.delete('/producto/:id_producto',productoController.deleteProducto);
router.put('/producto/:id_producto',[
check('modelo').not().isEmpty().withMessage('El Modelo no puede ser vacio'),
check('marca').not().isEmpty().withMessage('La Marca no puede ser vacio'),
check('descripcion').not().isEmpty().withMessage('La Descripcion no puede ser vacio'),
check('tipoProducto').not().isEmpty().withMessage('El TipoProducto no puede ser vacio'),
check('stock').not().isEmpty().withMessage('El Stock no puede ser vacio'),
check('stock').isInt().withMessage('El Stock debe ser un numero entero'),
check('stock').isLength({ max: 10 }).withMessage('El Stock no puede tener mas de 10 digitos'),
check('precio').not().isEmpty().withMessage('El Precio no puede ser vacio'),
check('precio').isInt().withMessage('El Precio debe ser un numero entero'),
check('precio').isLength({ max: 10 }).withMessage('El Precio no puede tener mas de 10 digitos'),
],
productoController.updateProducto);
router.put('/productoStock/:id_producto',productoController.updateProductoStock);


const cors = require('cors');
app.use(cors());

module.exports = router;
