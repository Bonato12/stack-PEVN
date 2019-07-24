var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var config = require('../database');


module.exports = {

  getUsuario(req,res){
     var pool = new pg.Pool(config);
     pool.connect(function(err, client, done) {
       client.query("SELECT US.id_usuario,US.uuid, US.mail, RO.perfil FROM usuario US, rol RO WHERE US.rol = RO.id_rol")
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

  postUsuario(req, res){
        console.log("Peticion POST");
        console.log(req.body);
        var pool = new pg.Pool(config)
        pool.connect(function(err, client, done) {
          client.query("INSERT INTO usuario(uuid,mail,contraseña,rol) VALUES($1,$2,$3,$4)",[req.body.uuid,req.body.usuario,req.body.contraseña,req.body.perfil])
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
  },

}
