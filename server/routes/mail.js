var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');

  /*
  router.route('/email').post((req,res)=>{
    console.log(req.body);
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
        auth: {
            user: 'sebabonato12@gmail.com',
            pass: 'BONATO1296'
        }
    });
    */
    router.route('/emailConfirmar').post((req,res)=>{
      console.log(req.body);
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
          auth: {
              user: 'sebabonato12@gmail.com',
              pass: 'BONATO1296'
          }
      });
// Definimos el email
    var mailOptions = {
        from: '"Sebastian Bonato sebabonato12@gmail.com>',
        to: req.body.destinatario,
        subject: 'Telnovo',
        text: req.body.mensaje
    };
// Enviamos el email
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
      return console.log(error);
  }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
    });

const cors = require('cors');
app.use(cors());

module.exports = router;
