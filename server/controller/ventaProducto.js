var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var config = require('../database');


  module.exports = {

          getVentaProducto(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query("SELECT * FROM ventaProducto")
                  .then(response => {
                    pool.end()
                    res.json(response.rows)
                  })
                  .catch(error => {
                    pool.end()
                    console.log(error.stack)
                  })
                done()
              })
          },
          getIdVentaProducto(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query('SELECT V.fecha, VP.id_ventaProducto, V.id_venta,PR.marca, PR.modelo,VP.cantidad, VP.precio FROM ventaProducto VP, venta V, producto PR WHERE VP.id_venta = ($1) AND VP.id_venta = V.id_venta AND VP.id_producto = PR.id_producto', [req.params.id_venta])
                  .then(response => {
                    pool.end()
                    res.json(response.rows)
                  })
                  .catch(error => {
                    pool.end()
                    console.log(error.stack)
                  })
                done()
              })
            },

            /*
        postVenta(req, res){
              console.log(req.body);
              pool.query("INSERT INTO ventaProducto(id_venta,id_producto,cantidad,precio) VALUES($1,$2,$3,$4) RETURNING id_venta",[req.body.venta,req.body.producto.id_producto,req.body.cantidad,req.body.precio]).then(response=> {
                console.log(response);
              }).catch((error) =>{
                console.log(error);
              });
        }
        */

       }
