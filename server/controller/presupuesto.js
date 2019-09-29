var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var config = require('../database');


module.exports = {
          getPresupuesto(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query("SELECT cl.nombre, cl.apellido,to_char( vt.fecha, 'DD-MM-YYYY') as fecha, vt.total, vt.id_venta FROM cliente cl,  venta vt WHERE cl.id_cliente = vt.id_cliente")
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

          getIdPresupuesto(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query('SELECT * FROM presupuesto WHERE id_presupuesto=($1)', [req.params.id_presupuesto])
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

              postPresupuesto(req, res){
                      var pool = new pg.Pool(config)
                      pool.query("INSERT INTO presupuesto(arreglo,observacion,estado,precio_mano_obra,precio_total) VALUES($1,$2,$3,$4,$5) RETURNING id_presupuesto",[req.body.presupuesto.arreglo,req.body.presupuesto.observacion,req.body.presupuesto.estado,req.body.presupuesto.precioManoObra,req.body.presupuesto.precioTotal]).then(response=> {
                          pool.end();
                          res.json(response.rows);
                      }).catch((error) =>{
                          pool.end();
                          console.log(error);
                      });
                },

                postPresupuestoProducto(req,res){
                  console.log(req.body);
                  for (var i=0 ; i < req.body.presupuesto.length ; i++) {
                      var pool = new pg.Pool(config)
                      pool.query("INSERT INTO presupuesto_producto(presupuesto,producto,cantidad,precio) VALUES($1,$2,$3,$4)",[req.body.id_presupuesto,req.body.presupuesto[i].producto.id_producto,req.body.presupuesto[i].cantidad,req.body.presupuesto[i].precio]).then(response=> {
                            pool.end();
                            res.sendStatus(200);
                      }).catch((error) =>{
                            pool.end();
                            console.log(error);
                      });
                  }
                },

              deletePresupuesto(req,res){
                      console.log("HOLA");
                      var pool = new pg.Pool(config)
                      pool.connect(function(err, client, done) {
                        client.query("DELETE FROM presupuesto WHERE id_presupuesto=($1)",[req.params.id_presupuesto])
                          .then(response => {
                            pool.end();
                            res.sendStatus(200);
                          })
                          .catch(error => {
                            console.log(error);
                            pool.end();
                            res.json(error);
                          })
                        done()
                      })
              },
              updatePresupuesto(req,res){
                    var pool = new pg.Pool(config)
                    pool.connect(function(err, client, done) {
                      client.query("UPDATE presupuesto SET estado=($1) WHERE id_presupuesto=($2)", [req.body.estado,req.params.id_presupuesto])
                        .then(response => {
                          pool.end()
                          res.sendStatus(200);
                        })
                        .catch(error => {
                          pool.end();
                          res.json(error);
                        })
                      done()
                    })
                  }

}
