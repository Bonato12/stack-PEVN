var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var db = require('../database');
var id;
  module.exports = {

          getPresupuesto(req,res){
              db.query("SELECT cl.nombre, cl.apellido,to_char( vt.fecha, 'DD-MM-YYYY') as fecha, vt.total, vt.id_venta FROM cliente cl,  venta vt WHERE cl.id_cliente = vt.id_cliente").then(response=> {
                  console.log(response.rows)
                //Muestra los resultados en forma de JSON en nuestro HTML
                  res.json(response.rows);
              }).catch(error =>{
                  console.log(error);
              })
          },

          getIdPresupuesto(req,res){
               db.query('SELECT * FROM presupuesto WHERE id_presupuesto=($1)', [req.params.id_presupuesto])
              .then(response=> {
                res.json(response.rows);
              }).catch(error =>{
                console.log(error);
              });
            },

        postPresupuesto(req, res){
              console.log("Peticion POST");
              console.log(req.body.presupuesto);
              for (var i=0; i < req.body.lista.length; i++){
                  console.log(req.body.lista[i]);
              }
              db.query("INSERT INTO presupuesto(arreglo,observacion,estado,precioTotal) VALUES($1,$2,$3,$4) RETURNING id_presupuesto",[req.body.presupuesto.arreglo,req.body.presupuesto.observacion,req.body.presupuesto.estado,req.body.presupuesto.precioTotal]).then(response=> {
                  id = parseInt(response.rows[0].id_presupuesto);
                  console.log("EL ID INSERTADO ES:"+id);
                        for (var i=0 ; i < req.body.lista.length ; i++) {
                            db.query("INSERT INTO presupuestoProducto(presupuesto,producto,cantidad,precio) VALUES($1,$2,$3,$4)",[id,req.body.lista[i].producto.id_producto,req.body.lista[i].cantidad,req.body.lista[i].precio]).then(response=> {
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
              updatePresupuesto(req,res){
                    console.log("Peticion UPDATE Presupuesto");
                    db.query("UPDATE presupuesto SET estado=($1) WHERE id_presupuesto=($2)", [req.body.estado,req.params.id_presupuesto]).then(response=> {
                    res.json({
                      mensaje: "Editado Correctamente"
                    })
                    }).catch(error =>{
                      console.log(error);
                    });
                  }

       }
