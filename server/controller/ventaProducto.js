var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var config = require('../database');


  module.exports = {

          getVentaProducto(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query("SELECT * FROM venta_producto")
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
                client.query('SELECT V.fecha, VP.id_venta_producto, V.id_venta,PR.marca, PR.modelo,VP.cantidad, VP.precio FROM venta_producto VP, venta V, producto PR WHERE VP.id_venta = ($1) AND VP.id_venta = V.id_venta AND VP.id_producto = PR.id_producto', [req.params.id_venta])
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
          }
       }
