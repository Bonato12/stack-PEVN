var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');


config= {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
}


  module.exports = {

          getPresupuestoProducto(req,res){
            var pool = new pg.Pool(config)
            pool.connect(function(err, client, done) {
              client.query("SELECT PP.id_presupuestoproducto,PR.modelo FROM presupuestoProducto PP, producto PR WHERE PP.producto = PR.id_producto")
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
          getIdPresupuestoProducto(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query('SELECT PP.id_presupuestoproducto,PR.modelo,PP.cantidad,PP.precio FROM presupuestoProducto PP, producto PR WHERE PP.producto = PR.id_producto AND PP.presupuesto =($1)', [req.params.id_presupuesto])
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
       }
