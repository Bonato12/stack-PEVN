var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var nodemailer = require('nodemailer');
const clienteController = require('./controller/cliente');



router.get('/cliente', clienteController.listaclientes);
router.post('/cliente',clienteController.addcliente);



  router.route('/cliente/:id_cliente').get((req,res)=>{
       pool.query('SELECT * FROM cliente WHERE id_cliente=($1)', [req.params.id_cliente])
      .then(response=> {
        res.json(response.rows);
      }).catch(error =>{
        console.log(error);
      });
  }).delete((req,res)=> {
        console.log("Peticion DELETE");
        pool.query("DELETE FROM cliente WHERE id_cliente=($1)",[req.params.id_cliente]).then(response=> {
        console.log(response.rows)
        res.json(response.rows);
        }).catch(error =>{
          console.log(error);
        })
  }).put((req,res)=>{
        console.log("Peticion UPDATE");
        pool.query("UPDATE cliente SET dni=($1), nombre=($2), apellido=($3), ciudad=($4), direccion=($5), telefono=($6), mail=($7) WHERE id_cliente=($8)", [req.body.dni, req.body.nombre, req.body.apellido,req.body.ciudad,req.body.direccion,req.body.telefono,req.body.mail,req.params.id_cliente]).then(response=> {
        console.log(response.rows)
        res.json(response.rows);
        }).catch(error =>{
          console.log(error);
        })

  });

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
// Definimos el email
    var mailOptions = {
        from: '"Sebastian Bonato sebabonato12@gmail.com>',
        to: req.body.mail,
        subject: 'Telnovo',
        text: 'Estimado '+ req.body.nombre+' '+req.body.apellido +', la reparacion de su equipo a sido completada con exito!!'
    };
// Enviamos el email
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
      return console.log(error);
  }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {msg:'Email has been sent'});
      });
    });


  //Importamos CORS para poder utilizar Axios en Vue js
  const cors = require('cors');
  app.use(cors());



module.exports = router;
