var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var config = require('../database');
var admin = require('firebase-admin');
serviceAccount = require('./adminSDK.json')


administrador = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ionic-3e984.firebaseio.com"
})



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

getIdUsuario(req,res){
    var pool = new pg.Pool(config);
    pool.connect(function(err, client, done) {
     client.query("SELECT US.id_usuario,US.uuid, US.mail, RO.perfil FROM usuario US, rol RO WHERE US.rol = RO.id_rol AND US.uuid = ($1)",[req.params.uuid])
       .then(response => {
         pool.end()
         console.log(response.rows);
         res.json(response.rows);
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
        administrador.auth().createUser({
            email: req.body.mail,
            emailVerified: false,
            password: req.body.password,
            displayName: 'null',
            photoURL:  'http://www.example.com/12345678/photo.png',
            disabled: false
        })
        .then(function(userRecord) {
          console.log(userRecord);
          var pool = new pg.Pool(config)
          pool.connect(function(err, client, done) {
            client.query("INSERT INTO usuario(uuid,mail,contraseña,rol) VALUES($1,$2,$3,$4)",[userRecord.uid,req.body.mail,req.body.password,req.body.rol])
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
        })
        .catch(function(error) {
          console.log('Error creating new user:', error);
        });
  }

}
