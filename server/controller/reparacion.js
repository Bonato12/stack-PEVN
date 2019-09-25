var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var config = require('../database');


  module.exports = {
          getReparacion(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query("SELECT id_reparacion, STRING_AGG ( producto.marca || ' ' || producto.modelo,',' ) as producto, producto.id_producto, presupuesto.observacion,presupuesto.precio_total, cliente.dni, to_char( fecha_ini, 'DD-MM-YYYY') as fecha_ini,to_char( fecha_fin, 'DD-MM-YYYY') as fecha_fin FROM reparacion,producto, arreglo, presupuesto,cliente where (arreglo.id_arreglo=presupuesto.arreglo)and(presupuesto.id_presupuesto=reparacion.id_presupuesto)and(arreglo.cliente=cliente.id_cliente)and(arreglo.producto=producto.id_producto) GROUP BY id_reparacion,producto.id_producto,presupuesto.observacion,presupuesto.precio_total, cliente.dni, fecha_ini, fecha_fin ")
                  .then(response => {
                    pool.end();
                    res.json(response.rows);
                  })
                  .catch(error => {
                    pool.end();
                    console.log(error.stack);
                  })
                done()
              })
          },
          getIdReparacion(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query("SELECT id_reparacion, producto.id_producto, producto.modelo , presupuesto.observacion,presupuesto.precio_total, cliente.dni,cliente.mail, fecha_ini, fecha_fin FROM reparacion,producto, arreglo, presupuesto,cliente where (arreglo.id_arreglo=presupuesto.arreglo)and(presupuesto.id_presupuesto=reparacion.id_presupuesto)and(arreglo.cliente=cliente.id_cliente)and(arreglo.producto=producto.id_producto) AND id_reparacion=($1)", [req.params.id_reparacion])
                  .then(response => {
                    pool.end();
                    res.json(response.rows);
                  })
                  .catch(error => {
                    pool.end();
                    console.log(error.stack);
                  })
                done()
              })
            },
            updateReparacion(req, res){
                  var pool = new pg.Pool(config)
                  pool.connect(function(err, client, done) {
                    client.query("UPDATE reparacion SET  fecha_ini = ($1), fecha_fin = ($2) WHERE id_reparacion = ($3)",[req.body.fecha_ini,req.body.fecha_fin,req.params.id_reparacion])
                      .then(response => {
                        pool.end();
                        res.json(response.rows);
                      })
                      .catch(error => {
                        pool.end();
                        console.log(error.stack);
                      })
                    done()
                  })
            },

       }
