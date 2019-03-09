var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var pool = require('../database');


//Realizamos peticiones GET POST DELETE PUT

  module.exports = {

          getVenta(req,res){
          pool.query("SELECT cl.nombre, cl.apellido, pr.modelo, pr.precio, vt.fecha, vt.id_venta FROM cliente cl, producto pr, venta vt WHERE cl.id_cliente = vt.id_cliente AND pr.id_producto= vt.id_producto").then(response=> {
            console.log(response.rows)
            //Muestra los resultados en forma de JSON en nuestro HTML
            res.json(response.rows);
          }).catch(error =>{
            console.log(error);
          })
        },

        postVenta(req, res){
              console.log("Peticion POST");
              pool.query("INSERT INTO venta(id_cliente,id_producto,fecha,cantidad,precio) VALUES($1,$2,$3,$4,$5)",[req.body.id_cliente.id_cliente,req.body.id_producto.id_producto,req.body.fecha,
              req.body.cantidad ,req.body.precio]).then(response=> {
                console.log(response);
              }).catch((error) =>{
                console.log(error);
              });
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
