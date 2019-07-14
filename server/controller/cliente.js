var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
const {check, validationResult} = require('express-validator');


config= {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
}

  module.exports = {

          getCliente(req,res){
             var pool = new pg.Pool(config)
             pool.connect(function(err, client, done) {
               client.query("SELECT * FROM cliente")
                 .then(response => {
                   pool.end()
                   res.json(response.rows)
                 })
                 .catch(error => {
                   pool.end()
                   console.log(error.stack)
                 })
               done()
             })
        },

        postCliente(req, res){
              const cliente = {
                dni: req.body.dni,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                mail: req.body.mail
              }
               const errors = validationResult(req);
               if (!errors.isEmpty()) {
                     return res.json(errors.array());
                   } else {
                     var pool = new pg.Pool(config)
                     pool.connect(function(err, client, done) {
                       client.query("INSERT INTO cliente(dni,nombre,apellido,direccion,telefono,mail) VALUES($1,$2,$3,$4,$5,$6) RETURNING id_cliente",[cliente.dni,cliente.nombre,cliente.apellido,
                       cliente.direccion,cliente.telefono,cliente.mail])
                         .then(response => {
                           pool.end()
                           res.sendStatus(200);
                         })
                         .catch(error => {
                           pool.end()
                           console.log(error)
                           res.send({ msg: 'Error del Servidor No se pudieron guardar los datos!' });
                         })
                       done()
                     })
                   }

        },
        getIdCliente(req,res){
           var pool = new pg.Pool(config)
           pool.connect(function(err, client, done) {
             client.query('SELECT * FROM cliente WHERE id_cliente=($1)',[req.params.id_cliente])
               .then(response => {
                 pool.end()
                 res.json(response.rows)
               })
               .catch(error => {
                 pool.end()
                 console.log(error)

               })
             done()
           })

          },
        deleteCliente(req,res){
               var pool = new pg.Pool(config)
               pool.connect(function(err, client, done) {
                 client.query("DELETE FROM cliente WHERE id_cliente=($1)",[req.params.id_cliente])
                   .then(response => {
                     pool.end()
                     res.sendStatus(200);
                   })
                   .catch(error => {
                     pool.end()
                     console.log(error)
                     res.json(error.code);
                   })
                 done()
               })
        },
        updateCliente(req,res){
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                    return res.json(errors.array());
             } else {
                 var pool = new pg.Pool(config)
                 pool.connect(function(err, client, done) {
                   client.query("UPDATE cliente SET dni=($1), nombre=($2), apellido=($3), direccion=($4), telefono=($5), mail=($6) WHERE id_cliente=($7)", [req.body.dni, req.body.nombre, req.body.apellido,req.body.direccion,req.body.telefono,req.body.mail,req.params.id_cliente])
                     .then(response => {
                       pool.end();
                       res.sendStatus(200);
                     })
                     .catch(error => {
                       pool.end();
                       console.log(error);
                       res.send({ msg: 'Error del Servidor No se pudieron guardar los datos!' });
                     })
                   done()
                 })
              }
            }

}
