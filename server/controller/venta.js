var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var pool = require('../database');


  module.exports = {

          getVenta(req,res){
              pool.query("SELECT cl.nombre, cl.apellido, vt.fecha, vt.total, vt.id_venta FROM cliente cl,  venta vt WHERE cl.id_cliente = vt.id_cliente").then(response=> {
                console.log(response.rows)
                //Muestra los resultados en forma de JSON en nuestro HTML
                res.json(response.rows);
              }).catch(error =>{
                console.log(error);
              })
          },

        postVenta(req, res){
              console.log("Peticion POST PUTO!!");
              console.log(req.body);
              pool.query("INSERT INTO venta(id_cliente,fecha,total) VALUES($1,$2,$3) RETURNING id_venta",[req.body.cliente.id_cliente,req.body.fecha,req.body.total]).then(response=> {
                console.log(response);
              }).catch((error) =>{
                console.log(error);
              });
        },

        lastVenta(req, res){
            pool.query("SELECT id_venta FROM venta ORDER BY id_venta DESC LIMIT 1").then(response=> {
              console.log(response.rows)
              //Muestra los resultados en forma de JSON en nuestro HTML
              res.json(response.rows);
            }).catch(error =>{
              console.log(error);
            })
        },

        deleteVenta(req,res){
                console.log("Peticion DELETE");
                pool.query("DELETE FROM venta WHERE id_venta=($1)",[req.params.id_venta]).then(response=> {
                console.log(response.rows)
                res.json(response.rows);
                }).catch(error =>{
                  console.log(error);
                })
        },

       }
