var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var db = require('../database');


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
               db.query('SELECT V.fecha, VP.id_compraProducto, V.id_compra,PR.marca, PR.modelo,VP.cantidad, VP.precio FROM compraProducto VP, compra V, producto PR WHERE VP.id_compra = ($1) AND VP.id_compra = V.id_compra AND VP.id_producto = PR.id_producto', [req.params.id_compra])
              .then(response=> {
                res.json(response.rows);
                console.log(response.rows);
              }).catch(error =>{
                console.log(error);
              });
            },



       }
