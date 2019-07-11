var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var id;



config= {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
}



  module.exports = {

          getArreglo(req,res){
            var pool = new pg.Pool(config)
            pool.connect(function(err, client, done) {
              client.query("SELECT * FROM arreglo")
                .then(response => {
                  pool.end()
                  res.json(response.rows);
                })
                .catch(error => {
                  pool.end()
                  console.log(error.stack)
                })
              done()
            })
          },

          getIdArreglo(req,res){
             var pool = new pg.Pool(config)
             pool.connect(function(err, client, done) {
               client.query("SELECT p.id_presupuesto FROM presupuesto p  WHERE p.arreglo=($1)", [req.params.id_arreglo])
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

          getArregloPresupuesto(){
            pool.connect()
            .then(client => {
             return client.query('SELECT * FROM presupuesto p  WHERE p.arreglo=($1)', [req.params.ida])
               .then(response => {
                 client.release()
                 res.json(response.rows)
               })
               .catch(error => {
                 client.release()
                 console.log(error.stack)
               })
           })
          },

        postArreglo(req, res){
             var pool = new pg.Pool(config)
             pool.connect(function(err, client, done) {
               client.query('INSERT INTO arreglo(cliente,producto,fecha,observacion,condicion) VALUES($1,$2,$3,$4,$5)',[req.body.arreglo.cliente.id_cliente,req.body.arreglo.producto.id_producto,req.body.arreglo.fecha,req.body.arreglo.observacion,req.body.arreglo.condicion])
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

        deleteArreglo(req,res){
               var pool = new pg.Pool(config)
               pool.connect(function(err, client, done) {
                 client.query("DELETE FROM arreglo WHERE id_arreglo=($1)",[req.params.id_arreglo])
                   .then(response => {
                     pool.end();
                   })
                   .catch(error => {
                     pool.end()
                     console.log(error)
                   })
                 done()
               })
        }
 }
