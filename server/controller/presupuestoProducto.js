var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var db = require('../database');


  module.exports = {

          getPresupuestoProducto(req,res){
              db.query("SELECT * FROM presupuestoProducto").then(response=> {
                console.log(response.rows)
                //Muestra los resultados en forma de JSON en nuestro HTML
                res.json(response.rows);
              }).catch(error =>{
                console.log(error);
              })
          },
          /*
          getIdPresupuestoProducto(req,res){
               db.query('SELECT V.fecha, VP.id_ventaProducto, V.id_venta,PR.marca, PR.modelo,VP.cantidad, VP.precio FROM ventaProducto VP, venta V, producto PR WHERE VP.id_venta = ($1) AND VP.id_venta = V.id_venta AND VP.id_producto = PR.id_producto', [req.params.id_venta])
              .then(response=> {
                res.json(response.rows);
                console.log(response.rows);
              }).catch(error =>{
                console.log(error);
              });
            },
            */
       }
