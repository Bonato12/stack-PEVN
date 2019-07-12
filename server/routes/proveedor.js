var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');
const {check, validationResult} = require('express-validator');
const proveedorController = require('../controller/proveedor');

router.get('/proveedor', proveedorController.getProveedor);
router.post('/proveedor',[
check('dni').not().isEmpty().withMessage('El Dni no puede ser vacio'),
check('dni').isInt().withMessage('El Dni debe ser un numero entero'),
check('dni').isLength({ max: 9 }).withMessage('El Dni no puede tener mas de 9 digitos'),
check('nombre').not().isEmpty().withMessage('El Nombre no puede ser vacio'),
check('apellido').not().isEmpty().withMessage('El Apellido no puede ser vacio'),
check('direccion').not().isEmpty().withMessage('La Direccion no puede ser vacio'),
check('descripcion').not().isEmpty().withMessage('La Descripcion no puede ser vacio'),
check('telefono').not().isEmpty().withMessage('La Direccion no puede ser vacio'),
check('mail').not().isEmpty().withMessage('El Mail no puede ser vacio'),
],
proveedorController.postProveedor);
router.get('/proveedor/:id_proveedor',proveedorController.getIdProveedor);
router.delete('/proveedor/:id_proveedor',proveedorController.deleteProveedor);
router.put('/proveedor/:id_proveedor',[
check('dni').not().isEmpty().withMessage('El Dni no puede ser vacio'),
check('dni').isInt().withMessage('El Dni debe ser un numero entero'),
check('dni').isLength({ max: 9 }).withMessage('El Dni no puede tener mas de 9 digitos'),
check('nombre').not().isEmpty().withMessage('El Nombre no puede ser vacio'),
check('apellido').not().isEmpty().withMessage('El Apellido no puede ser vacio'),
check('direccion').not().isEmpty().withMessage('La Direccion no puede ser vacio'),
check('descripcion').not().isEmpty().withMessage('La Descripcion no puede ser vacio'),
check('telefono').not().isEmpty().withMessage('La Direccion no puede ser vacio'),
check('mail').not().isEmpty().withMessage('El Mail no puede ser vacio'),
],
proveedorController.updateProveedor);

const cors = require('cors');
app.use(cors());

module.exports = router;
