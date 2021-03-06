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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.json(errors.array());
            } else {
                  const pool = new pg.Pool(config)
                  pool.connect((err, client, done) => {
                  const shouldAbort = err => {
                  if (err) {
                    res.sendStatus(500);
                    console.error('ERROR EN LA TRANSACCION', err.stack)
                    client.query('ROLLBACK', err => {
                      if (err) {
                        console.error('ERROR EN ROLLBACK TRANSACCION', err.stack)
                      }
                      done()
                    })
                  }
                  return !!err
                  }
                  client.query('BEGIN', err => {
                  if (shouldAbort(err)) return
                  client.query("INSERT INTO venta(id_cliente,fecha,total) VALUES($1,$2,$3) RETURNING id_venta",[req.body.venta.cliente,req.body.venta.fecha,req.body.venta.total], (err, response) => {
                    if (shouldAbort(err)) return
                      for (var i=0 ; i < req.body.carritoVenta.length ; i++) {
                        client.query("INSERT INTO venta_producto(id_venta,id_producto,cantidad,precio) VALUES($1,$2,$3,$4)",[response.rows[0].id_venta,req.body.carritoVenta[i].producto.id_producto,req.body.carritoVenta[i].cantidad,req.body.carritoVenta[i].precio], (err, response) => {
                          if (shouldAbort(err)) return
                          client.query('COMMIT') .then(response=>{
                            res.sendStatus(200);
                          }).catch(error=>{
                            console.log(error);
                          })
                            done();
                          })
                      }
                    })
                  })
                })
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

            getFechaVenta(req,res){
              var client = new pg.Client(config);
              client.connect();
              client.query('SELECT  V.fecha FROM venta V WHERE V.id_venta=($1)', [req.params.id_venta])
                .then(response => {
                  client.end()
                  res.json(response.rows)
                })
                .catch(error => {
                  client.end()
                  console.log(error.stack)
                })
               
            },  

          updateVenta(req, res){
                var client = new pg.Client(config)
                client.connect();
                  client.query("UPDATE venta SET fecha = ($1) WHERE id_venta = ($2)",[req.body.fecha,req.params.id_venta])
                    .then(response => {
                      client.end();
                      res.sendStatus(200);
                    })
                    .catch(error => {
                      client.end()
                      console.log(error.stack)
                    })
              
          },


       }
