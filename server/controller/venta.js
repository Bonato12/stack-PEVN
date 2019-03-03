var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var pool = require('../database');


//Realizamos peticiones GET POST DELETE PUT

  module.exports = {

          listaventas(req,res){
          pool.query("SELECT * FROM venta").then(response=> {
            console.log(response.rows)
            //Muestra los resultados en forma de JSON en nuestro HTML
            res.json(response.rows);
          }).catch(error =>{
            console.log(error);
          })
        },

        addventas(req, res){
              console.log("Peticion POST");
              pool.query("INSERT INTO cliente(id_cliente,id_producto,fecha,precio) VALUES($1,$2,$3,$4)",[req.body.id_cliente,req.body.id_producto,req.body.fecha,
              req.body.precio]).then(response=> {
                console.log(response);
              }).catch((error) =>{
                console.log(error);
              });
        },
        /*
        getidcliente(req,res){
             pool.query('SELECT * FROM cliente WHERE id_cliente=($1)', [req.params.id_cliente])
            .then(response=> {
              res.json(response.rows);
            }).catch(error =>{
              console.log(error);
            });
          },


        deletecliente(req,res){
                console.log("Peticion DELETE");
                pool.query("DELETE FROM cliente WHERE id_cliente=($1)",[req.params.id_cliente]).then(response=> {
                console.log(response.rows)
                res.json(response.rows);
                }).catch(error =>{
                  console.log(error);
                })
        },
        updatecliente(req,res){
              console.log("Peticion UPDATE");
              pool.query("UPDATE cliente SET dni=($1), nombre=($2), apellido=($3), ciudad=($4), direccion=($5), telefono=($6), mail=($7) WHERE id_cliente=($8)", [req.body.dni, req.body.nombre, req.body.apellido,req.body.ciudad,req.body.direccion,req.body.telefono,req.body.mail,req.params.id_cliente]).then(response=> {
              console.log(response.rows)
              res.json(response.rows);
              }).catch(error =>{
                console.log(error);
              });
            }
              */
}
