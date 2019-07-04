var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var db = require('../database');

  module.exports = {
          getReparacion(req,res){
              db.query("SELECT * FROM reparacion").then(response=> {
                  console.log(response.rows)
                  res.json(response.rows);
              }).catch(error =>{
                  console.log(error);
              })
          },
          getIdReparacion(req,res){
               db.query('SELECT * FROM reparacion WHERE id_reparacion=($1)', [req.params.id_reparacion])
              .then(response=> {
                res.json(response.rows);
              }).catch(error =>{
                console.log(error);
              });
            },
            updateReparacion(req, res){
                  db.query("UPDATE reparacion SET  fecha_ini = ($1), fecha_fin = ($2) WHERE id_reparacion = ($3)",[req.body.fecha_ini,req.body.fecha_fin,req.params.id_reparacion]).then(response=> {
                    res.json({
                        mensaje: "Editado Correctamente"
                    })
                  }).catch((error) =>{
                      console.log(error);
                  });
            },

       }
