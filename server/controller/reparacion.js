var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var config = require('../database');


  module.exports = {
          getReparacion(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query("SELECT * FROM reparacion")
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
          getIdReparacion(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query('SELECT * FROM reparacion WHERE id_reparacion=($1)', [req.params.id_reparacion])
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
            updateReparacion(req, res){
                  var pool = new pg.Pool(config)
                  pool.connect(function(err, client, done) {
                    client.query("UPDATE reparacion SET  fecha_ini = ($1), fecha_fin = ($2) WHERE id_reparacion = ($3)",[req.body.fecha_ini,req.body.fecha_fin,req.params.id_reparacion])
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

       }
