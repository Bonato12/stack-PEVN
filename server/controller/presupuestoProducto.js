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
          getIdPresupuestoProducto(req,res){
               db.query('SELECT  PP.id_presupuesto, PP.presupuesto, PP.producto, PP.cantidad, PP.precio  FROM presupuesto P, presupuestoProducto PP WHERE PP.presupuesto =($1)', [req.params.id_venta])
              .then(response=> {
                res.json(response.rows);
                console.log(response.rows);
              }).catch(error =>{
                console.log(error);
              });
            },

       }
