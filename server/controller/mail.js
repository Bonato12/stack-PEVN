var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');

module.exports = {
          enviarMail(req,res){
            var transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
                auth: {
                    user: 'sebabonato12@gmail.com',
                    pass: 'BONATO1296'
                  }
            })
            var mailOptions = {
                  from: '"Sebastian Bonato sebabonato12@gmail.com>',
                  to: req.body.destinatario,
                  subject: 'Telnovo',
                  text: req.body.mensaje
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });

      }

}