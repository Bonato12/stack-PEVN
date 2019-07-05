var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');


module.exports = {
  postUsuario(req, res){
        console.log("Peticion POST");
        db.query("INSERT INTO usuario(mail,contraseña) VALUES($1,$2)",[req.body.usuario,req.body.contraseña]).then(response=>{
          console.log(response);
        }).catch((error) =>{
          console.log(error);
        });
  },

}
