var express = require('express');
var app = express();
const {check, validationResult} = require('express-validator');
var pg = require('pg');
var config = require('../database');


module.exports = {
          getVenta(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query("SELECT cl.nombre, cl.apellido,to_char( vt.fecha, 'DD-MM-YYYY') as fecha, vt.total, vt.id_venta FROM cliente cl,  venta vt WHERE cl.id_cliente = vt.id_cliente")
                  .then(response => {
                    pool.end();
                    res.json(response.rows)
                  })
                  .catch(error => {
                    pool.end();
                    console.log(error.stack)
                  })
                done()
              })
          },

          postVenta(req, res){
                  console.log(req.body)
                  var pool = new pg.Pool(config)
                  pool.query("INSERT INTO venta(id_cliente,fecha,total) VALUES($1,$2,$3) RETURNING id_venta",[req.body.venta.cliente,req.body.venta.fecha,req.body.venta.total]).then(response=> {
                      pool.end();
                      res.json(response.rows);
                  }).catch((error) =>{
                      pool.end();
                      console.log(error);
                  });
            },

            postVentaProducto(req,res){
                        for (var i=0 ; i < req.body.venta.length ; i++) {
                            var pool = new pg.Pool(config)
                            pool.query("INSERT INTO venta_producto(id_venta,id_producto,cantidad,precio) VALUES($1,$2,$3,$4)",[req.body.id_venta,req.body.venta[i].producto.id_producto,req.body.venta[i].cantidad,req.body.venta[i].precio]).then(response=> {
                                  pool.end();
                                  res.sendStatus(200);
                            }).catch((error) =>{
                                  pool.end();
                                  console.log(error);
                            });
                        }
            },

        deleteVenta(req,res){
                console.log("Peticion DELETE");
                var pool = new pg.Pool(config)
                pool.connect(function(err, client, done) {
                  client.query("DELETE FROM venta WHERE id_venta=($1)",[req.params.id_venta])
                    .then(response => {
                      pool.end()
                      res.sendStatus(200);
                    })
                    .catch(error => {
                      pool.end();
                      console.log(error);
                    })
                  done()
                })
        },
          getIdVenta(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query('SELECT V.id_venta,V.id_cliente, V.fecha ,V.total  FROM venta V WHERE V.id_venta=($1)', [req.params.id_venta])
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
          updateVenta(req, res){
                var pool = new pg.Pool(config)
                pool.connect(function(err, client, done) {
                  client.query("UPDATE venta SET fecha = ($1) WHERE id_venta = ($2)",[req.body.fecha,req.params.id_venta])
                    .then(response => {
                      pool.end()
                      //res.json(response.rows)
                    })
                    .catch(error => {
                      pool.end()
                      console.log(error.stack)
                    })
                  done()
                })
          },


       }
