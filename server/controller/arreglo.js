var express = require('express');
var app = express();
var pg = require('pg');
var config = require('../database');


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
                  pool.end();
                  console.log(error.stack);
                })
              done();
            })
          },

          getIdArreglo(req,res){
             var pool = new pg.Pool(config)
             pool.connect(function(err, client, done) {
               client.query("SELECT p.id_presupuesto FROM presupuesto p  WHERE p.arreglo=($1)", [req.params.id_arreglo])
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
              const arreglo = {
                cliente: req.body.arreglo.cliente,
                producto: req.body.arreglo.producto,
                fecha: new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear(),
                observacion: req.body.arreglo.observacion,
                condicion: 'EN ESPERA DE PRESUPUESTO'
              }
              var pool = new pg.Pool(config);
              pool.connect(function(err, client, done) {
                client.query('INSERT INTO arreglo(cliente,producto,fecha,observacion,condicion) VALUES($1,$2,$3,$4,$5)',[arreglo.cliente,arreglo.producto,arreglo.fecha,arreglo.observacion,arreglo.condicion])
                  .then(response => {
                    pool.end()
                    res.sendStatus(200);
                  })
                  .catch(error => {
                    pool.end()
                    console.log(error)
                    res.send({ msg: 'Error del Servidor No se pudieron guardar los datos!' });
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
                     res.sendStatus(200);
                   })
                   .catch(error => {
                     pool.end();
                     console.log(error);
                     res.json(error);
                   })
                 done()
               })
        }
 }
