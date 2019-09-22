var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var config = require('../database');


module.exports = {
          getCompraProducto(req,res){
            var pool = new pg.Pool(config)
            pool.connect(function(err, client, done) {
              client.query("SELECT * FROM compra_producto")
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
          getIdCompraProducto(req,res){
              var pool = new pg.Pool(config);
              pool.connect(function(err, client, done) {
                client.query('SELECT C.fecha, CP.id_compra_producto, C.id_compra, PR.marca, PR.modelo,CP.cantidad, CP.precio_unitario, CP.precio_total FROM compra_producto CP, compra C, producto PR WHERE CP.id_compra = ($1) AND CP.id_compra = C.id_compra AND CP.id_producto = PR.id_producto', [req.params.id_compra])
                  .then(response => {
                    pool.end();
                    res.json(response.rows)
                  })
                  .catch(error => {
                    pool.end();
                    console.log(error)
                  })
                done()
              })

            }
  }
