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
     var client = new pg.Client(config);
     client.connect();
       client.query("SELECT US.id_usuario,US.uuid, US.mail, RO.perfil FROM usuario US, rol RO WHERE US.rol = RO.id_rol")
         .then(response => {
          client.end()
          res.json(response.rows)
         })
         .catch(error => {
          client.end();
           console.log(error.stack)
         })
    
},

getIdUsuario(req,res){
    var client = new pg.Client(config);
    client.connect();
     client.query("SELECT US.id_usuario,US.uuid, US.mail, RO.perfil FROM usuario US, rol RO WHERE US.rol = RO.id_rol AND US.uuid = ($1)",[req.params.uuid])
       .then(response => {
        client.end();
         console.log(response.rows);
         res.json(response.rows);
       })
       .catch(error => {
         client.end();
         console.log(error.stack)
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
          var client = new pg.Client(config)
          client.connect();
            client.query("INSERT INTO usuario(uuid,mail,contraseña,rol) VALUES($1,$2,$3,$4)",[userRecord.uid,req.body.mail,req.body.password,req.body.rol])
              .then(response => {
                client.end()
                res.sendStatus(200);
              })
              .catch(error => {
                client.end()
                console.log(error)
                res.send({ msg: 'Error del Servidor No se pudieron guardar los datos!' });
              })
          
        })
        .catch(function(error) {
          console.log('Error creating new user:', error);
        });
  },

  deleteUser(req,res){
    admin.auth().deleteUser(uid)
          .then(function() {
            console.log('Successfully deleted user');
          })
          .catch(function(error) {
            console.log('Error deleting user:', error);
          });
  }

}
