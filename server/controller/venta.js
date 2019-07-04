var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var db = require('../database');
var id;
  module.exports = {

          getVenta(req,res){
              db.query("SELECT cl.nombre, cl.apellido,to_char( vt.fecha, 'DD-MM-YYYY') as fecha, vt.total, vt.id_venta FROM cliente cl,  venta vt WHERE cl.id_cliente = vt.id_cliente").then(response=> {
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
              db.query("INSERT INTO venta(id_cliente,fecha,total) VALUES($1,$2,$3) RETURNING id_venta",[req.body.venta.cliente.id_cliente,req.body.venta.fecha,req.body.venta.total]).then(response=> {
                  id = parseInt(response.rows[0].id_venta);
                  console.log("EL ID INSERTADO ES:"+id);
                        for (var i=0 ; i < req.body.lista.length ; i++) {
                            db.query("INSERT INTO ventaProducto(id_venta,id_producto,cantidad,precio) VALUES($1,$2,$3,$4) RETURNING id_venta",[id,req.body.lista[i].producto.id_producto,req.body.lista[i].cantidad,req.body.lista[i].precio]).then(response=> {
                                console.log(response);
                            }).then(
                              db.query("UPDATE producto SET stock = stock - $1 WHERE id_producto=($2)",[req.body.lista[i].cantidad,req.body.lista[i].producto.id_producto]).then(response =>{
                                   console.log(response);
                                 })
                            ).catch((error) =>{
                                console.log(error);
                            });
                        }
              }).catch((error) =>{
                  console.log(error);
              });

        },
        deleteVenta(req,res){
                console.log("Peticion DELETE");
                db.query("DELETE FROM venta WHERE id_venta=($1)",[req.params.id_venta]).then(response=> {
                    console.log(response.rows)
                    res.json(response.rows);
                }).catch(error =>{
                    console.log(error);
                })
        },
        /*
        getIdVenta(req,res){
             db.query('SELECT VP.id_ventaproducto,P.marca, P.modelo,VP.cantidad, VP.precio  FROM producto P,ventaProducto VP, venta V WHERE V.id_venta=($1) AND ($1) = VP.id_venta AND VP.id_producto = P.id_producto ', [req.params.id_venta])
            .then(response=> {
              res.json(response.rows);
            }).catch(error =>{
              console.log(error);
            });
          },
          */
          getIdVenta(req,res){
               db.query('SELECT V.id_venta,V.id_cliente, V.fecha ,V.total  FROM venta V WHERE V.id_venta=($1)', [req.params.id_venta])
              .then(response=> {
                res.json(response.rows);
              }).catch(error =>{
                console.log(error);
              });
            },
          updateVenta(req, res){
                console.log(req.body);
                db.query("UPDATE venta SET fecha = ($1) WHERE id_venta = ($2)",[req.body.fecha,req.params.id_venta]).then(response=> {
                  res.json({
                      mensaje: "Editado Correctamente"
                  })
                }).catch((error) =>{
                    console.log(error);
                });
          },


       }
