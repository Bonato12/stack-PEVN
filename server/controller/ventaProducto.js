var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var pool = require('../database');


  module.exports = {

          getVentaProducto(req,res){
              pool.query("SELECT * FROM ventaProducto").then(response=> {
                console.log(response.rows)
                //Muestra los resultados en forma de JSON en nuestro HTML
                res.json(response.rows);
              }).catch(error =>{
                console.log(error);
              })
          },
          getIdVentaProducto(req,res){
               pool.query('SELECT V.fecha, VP.id_ventaProducto, V.id_venta,PR.modelo,VP.cantidad, VP.precio FROM ventaProducto VP, venta V, producto PR WHERE VP.id_venta = ($1) AND VP.id_venta = V.id_venta AND VP.id_producto = PR.id_producto', [req.params.id_venta])
              .then(response=> {
                res.json(response.rows);
                console.log(response.rows);
              }).catch(error =>{
                console.log(error);
              });
            },

            /*
        postVenta(req, res){
              console.log(req.body);
              pool.query("INSERT INTO ventaProducto(id_venta,id_producto,cantidad,precio) VALUES($1,$2,$3,$4) RETURNING id_venta",[req.body.venta,req.body.producto.id_producto,req.body.cantidad,req.body.precio]).then(response=> {
                console.log(response);
              }).catch((error) =>{
                console.log(error);
              });
        },

        /*
        deleteVenta(req,res){
                console.log("Peticion DELETE");
                pool.query("DELETE FROM venta WHERE id_venta=($1)",[req.params.id_venta]).then(response=> {
                console.log(response.rows)
                res.json(response.rows);
                }).catch(error =>{
                  console.log(error);
                })
        }
*/

       }
