var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var pool = require('../database');


module.exports = {
  addusuario(req, res){
        console.log("Peticion POST");
        pool.query("INSERT INTO usuario(mail,contraseña) VALUES($1,$2)",[req.body.usuario,req.body.contraseña]).then(response=>{
          console.log(response);
        }).catch((error) =>{
          console.log(error);
        });
  },

}
