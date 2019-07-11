var express = require('express');
var router = express.Router();
var app = express();
const {check, validationResult} = require('express-validator');
const clienteController = require('../controller/cliente');

router.get('/cliente', clienteController.getCliente);
router.post('/cliente',[
check('dni').not().isEmpty().withMessage('El Dni no puede ser vacio'),
check('dni').isInt().withMessage('El Dni debe ser un numero entero'),
//check('dni').isLength({ max: 9 }).withMessage('El Dni no puede tener mas de 9 digitos'),
check('nombre').not().isEmpty().withMessage('El Nombre no puede ser vacio'),
check('apellido').not().isEmpty().withMessage('El Apellido no puede ser vacio'),
check('direccion').not().isEmpty().withMessage('La Direccion no puede ser vacio'),
check('telefono').not().isEmpty().withMessage('La Direccion no puede ser vacio'),
check('mail').not().isEmpty().withMessage('El Mail no puede ser vacio'),
],
clienteController.postCliente);
router.get('/cliente/:id_cliente',clienteController.getIdCliente);
router.delete('/cliente/:id_cliente',clienteController.deleteCliente);
router.put('/cliente/:id_cliente',[
check('dni').not().isEmpty().withMessage('El Dni no puede ser vacio'),
check('dni').isInt().withMessage('El Dni debe ser un numero entero'),
check('dni').isLength({ max: 9 }).withMessage('El Dni no puede tener mas de 9 digitos'),
check('nombre').not().isEmpty().withMessage('El Nombre no puede ser vacio'),
check('apellido').not().isEmpty().withMessage('El Apellido no puede ser vacio'),
check('direccion').not().isEmpty().withMessage('La Direccion no puede ser vacio'),
check('telefono').not().isEmpty().withMessage('La Direccion no puede ser vacio'),
check('mail').not().isEmpty().withMessage('El Mail no puede ser vacio'),
],
clienteController.updateCliente);

const cors = require('cors');
app.use(cors());


module.exports = router;
