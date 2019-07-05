var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');


  module.exports = {

          getCompraProducto(req,res){
              db.query("SELECT * FROM compraProducto").then(response=> {
                console.log(response.rows)
                //Muestra los resultados en forma de JSON en nuestro HTML
                res.json(response.rows);
              }).catch(error =>{
                console.log(error);
              })
          },
          getIdCompraProducto(req,res){
               db.query('SELECT C.fecha, CP.id_compraProducto, C.id_compra, PR.marca, PR.modelo,CP.cantidad, CP.precio FROM compraProducto CP, compra C, producto PR WHERE CP.id_compra = ($1) AND CP.id_compra = C.id_compra AND CP.id_producto = PR.id_producto', [req.params.id_compra])
              .then(response=> {
                res.json(response.rows);
                console.log(response.rows);
              }).catch(error =>{
                console.log(error);
              });
            },



       }
