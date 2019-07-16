var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');


config= {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
}

module.exports = {

  getUsuario(req,res){
     var pool = new pg.Pool(config)
     pool.connect(function(err, client, done) {
       client.query("SELECT US.id_usuario, US.mail, RO.perfil FROM usuario US, rol RO WHERE US.rol = RO.id_rol")
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
        var pool = new pg.Pool(config)
        pool.connect(function(err, client, done) {
          client.query("INSERT INTO usuario(mail,contraseña,rol) VALUES($1,$2, '2')",[req.body.usuario,req.body.contraseña])
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
