var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
const Pool = require('pg').Pool;




const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
})


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
