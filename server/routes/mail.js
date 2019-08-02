var express = require('express');
var router = express.Router();
var app = express();
const cors = require('cors');
const mailController = require('../controller/mail');

router.post('/email', mailController.enviarMail);


app.use(cors());


module.exports = router;
