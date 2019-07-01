var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var db = require('../database');
var id;
  module.exports = {

          getArreglo(req,res){
              db.query("SELECT * FROM arreglo").then(response=> {
                  console.log(response.rows)
                //Muestra los resultados en forma de JSON en nuestro HTML
                  res.json(response.rows);
              }).catch(error =>{
                  console.log(error);
              })
          },

          getIdArreglo(req,res){
              db.query("SELECT a.id_arreglo, a.fecha, c.dni,c.nombre,c.apellido, p.modelo FROM cliente c, producto p, arreglo a  WHERE id_arreglo=($1) AND a.cliente = c.id_cliente AND a.producto = p.id_producto", [req.params.id_arreglo]).then(response=> {
                  console.log(response.rows)
                //Muestra los resultados en forma de JSON en nuestro HTML
                  res.json(response.rows);
              }).catch(error =>{
                  console.log(error);
              })
          },

          getArregloPresupuesto(){
            db.query("SELECT p.id_presupuesto FROM presupuesto p  WHERE p.arreglo = ($1) ", [req.params.id_arreglo]).then(response=> {
                console.log(response.rows)
              //Muestra los resultados en forma de JSON en nuestro HTML
                res.json(response.rows);
            }).catch(error =>{
                console.log(error);
            })
          },

        postArreglo(req, res){
              console.log("Peticion POST");
              console.log(req.body);
              db.query("INSERT INTO arreglo(cliente,producto,fecha,observacion,condicion) VALUES($1,$2,$3,$4,$5)",[req.body.arreglo.cliente.id_cliente,req.body.arreglo.producto.id_producto,req.body.arreglo.fecha,req.body.arreglo.observacion,req.body.arreglo.condicion]).then(response=> {
                console.log(response);
              }).catch((error) =>{
                  console.log(error);
              });

        },
        deleteArreglo(req,res){
                console.log("Peticion DELETE");
                db.query("DELETE FROM arreglo WHERE id_arreglo=($1)",[req.params.id_arreglo]).then(response=> {
                    console.log(response.rows)
                    res.json(response.rows);
                }).catch(error =>{
                    console.log(error);
                })
        },
       }
