var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var pool = require('../database');
var id;
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
              console.log("Peticion POST");
              console.log(req.body);
              for (var i=0; i < req.body.lista.length; i++){
                  console.log(req.body.lista[i]);
              }
              pool.query("INSERT INTO venta(id_cliente,fecha,total) VALUES($1,$2,$3) RETURNING id_venta",[req.body.venta.cliente.id_cliente,req.body.venta.fecha,req.body.venta.total]).then(response=> {
                  id = parseInt(response.rows[0].id_venta);
                  console.log("EL ID INSERTADO ES:"+id);
                        for (var i=0 ; i < req.body.lista.length ; i++) {
                            pool.query("INSERT INTO ventaProducto(id_venta,id_producto,cantidad,precio) VALUES($1,$2,$3,$4) RETURNING id_venta",[id,req.body.lista[i].producto.id_producto,req.body.lista[i].cantidad,req.body.lista[i].precio]).then(response=> {
                                console.log(response);
                            }).catch((error) =>{
                                console.log(error);
                            });
                        }
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
