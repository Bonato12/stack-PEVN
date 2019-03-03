var express = require('express');
var router = express.Router();
var app = express();
var pool = require('../database');


  module.exports = {
          getProveedor(req,res){
          pool.query("SELECT * FROM proveedor").then(response=> {
            console.log(response.rows)
            //Muestra los resultados en forma de JSON en nuestro HTML
            res.json(response.rows);
          }).catch(error =>{
            console.log(error);
          })
        },
        postProveedor(req, res){
              console.log("Peticion POST");
              pool.query("INSERT INTO proveedor (dni,nombre,apellido,direccion,telefono,mail,descripcion) VALUES($1,$2,$3,$4,$5,$6,$7)",[req.body.dni,req.body.nombre,req.body.apellido,
              req.body.direccion,req.body.telefono,req.body.mail,req.body.descripcion]).then(response=> {
                console.log(response);
              }).catch((error) =>{
                console.log(error);
              });
        },
        getIdProveedor(req,res){
             pool.query('SELECT * FROM proveedor WHERE id_proveedor=($1)', [req.params.id_proveedor])
            .then(response=> {
              res.json(response.rows);
            }).catch(error =>{
              console.log(error);
            });
          },
        deleteProveedor(req,res){
                console.log("Peticion DELETE");
                pool.query("DELETE FROM proveedor WHERE id_proveedor=($1)",[req.params.id_proveedor]).then(response=> {
                console.log(response.rows)
                res.json(response.rows);
                }).catch(error =>{
                  console.log(error);
                })
        },
        updateProveedor(req,res){
              console.log("Peticion UPDATE");
              pool.query("UPDATE proveedor SET dni=($1), nombre=($2), apellido=($3), direccion=($4), telefono=($5), mail=($6), descripcion=($7) WHERE id_proveedor=($8)", [req.body.dni, req.body.nombre, req.body.apellido,req.body.direccion,req.body.telefono,req.body.mail,req.body.descripcion,req.params.id_proveedor]).then(response=> {
              console.log(response.rows)
              res.json(response.rows);
              }).catch(error =>{
                console.log(error);
              });
            }

}
