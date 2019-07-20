var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var config = require('../database');


module.exports = {
          getCompraProducto(req,res){
            var pool = new pg.Pool(config)
            pool.connect(function(err, client, done) {
              client.query("SELECT * FROM compraProducto")
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
                client.query('SELECT C.fecha, CP.id_compraProducto, C.id_compra, PR.marca, PR.modelo,CP.cantidad, CP.precioUnitario, CP.precioTotal FROM compraProducto CP, compra C, producto PR WHERE CP.id_compra = ($1) AND CP.id_compra = C.id_compra AND CP.id_producto = PR.id_producto', [req.params.id_compra])
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
